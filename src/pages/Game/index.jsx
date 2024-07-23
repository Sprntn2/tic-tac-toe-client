import { useEffect, useState } from 'react'
import GameSquare from '../../components/GameSquare'
import Oshape from '../../components/Oshape'
import Wrapper from '../../components/Wrapper'
import Xshape from '../../components/Xshape'
import styles from './style.module.css'
import useDataContext from '../../context/DataContext'
import Button from '../../components/Button'
import Menu from '../Menu'
import WaitingOpponent from '../WaitingOpponent'
import PlayersBar from '../../components/PlayersBar'

function Game({isSolo}){

    const {userSign, userDetails, setOpponentDetails, opponentDetails, socketIO, setShowComp } = useDataContext()
    console.log("user sign is: ", userSign, "\nuser details: ", userDetails, "\nopponent details:", opponentDetails);
    // const demoGame = new Array(9).fill(2)
    const [board, setBoard] = useState(new Array(9).fill(0))
    const [victory, setVictory] = useState()
    const [wins, setWins] = useState({1: 5, 2: 7})//for example need to be {1:0, 2:0}
    console.log("board:", board)
    
    //let isYourTurn;// = userSign == 1//x is the first
    //let isYourTurn = userSign == 1

    const [isYourTurn, setIsYourTurn] = useState(userSign == 1)// x is first
    console.log("test is your turn:", isYourTurn)
    
    // const [turnOf, setTurnOf] = useState(1)//1 for x 2 for o

    // console.log("is your turn is:", isYourTurn);
    //console.log("apply move, borad:", board)

    const backToMain = () => {
        isSolo? socketIO.emit('leave-solo-game') : socketIO.emit('leave-game')
        setShowComp(<Menu/>)
    }



    const reset = () => {
        socketIO.emit('restart-game')
        // setBoard([0,0,0,0,0,0,0,0,0])
        // setIsYourTurn(userSign == 1)
        // setVictory()

    }

    const markSquare = (i) => {
        if(isYourTurn && !victory){
            // if(isSolo){
            //     socketIO.emit('solo-move', i)
            // }
            // else{
            //     socketIO.emit('move', i)
            // }
            socketIO.emit('move', i)
            setIsYourTurn(false)
        }
        else{
            //console.log("wait to your turn")
            console.log(victory? "The game is over" : "wait to your turn")
        }
        //isYourTurn = false;
        // if(turnOf == userSign){    
        //     console.log(i)
        //     //isYourTurn = false
        //     socketIO.emit('move', i)
        // }
        // else{
        //     console.log("wait to your turn")
        // }
        //setBoard([...board.slice(0,i), userSign, ...board.slice(i + 1)])
    }

    // useEffect(() => {
        //setIsYourTurn(()=>{console.log("updating isyourturn");return userSign == 1})
        //isYourTurn = userSign == 1
        //console.log(`your turn is ${userSign}`)

        // socketIO.on('illegal-move', () => {
        //     console.log("illegal move")
        //     //isYourTurn = true;
        // })

        // socketIO.on('victory', (data) => {
        //     console.log("victory, data:", data)
        //     setBoard([...board.slice(0,data.index), data.sign, ...board.slice(data.index + 1)])
        // })

        // socketIO.on('apply-move', (data) => {
        //     console.log("apply move, data:", data)
        //     //updateBoard(data)
        //     setBoard([...board.slice(0,data.index), data.sign, ...board.slice(data.index + 1)])
        // })
    // },[board])

    useEffect(() => {

        if(isSolo){
            setOpponentDetails({name: "robot", avatar: "robot.png"})
            userSign == 2 && socketIO.emit('robot-first')

            socketIO.on('robot-first-move', (index) => {
                console.log("robot first move index:", index)
                setBoard(old => [...old.slice(0, index), userSign % 2 + 1, ...old.slice(index + 1)])
                setIsYourTurn(true)
            })
            socketIO.on('robot-move', (data) => {
                console.log('robot-move')
                setBoard(old => old.map((sign, index) => {
                    if(index == data.robotMove) return userSign % 2 + 1
                    if(index == data.playerMove) return userSign
                    return sign
                }))
                setIsYourTurn(true)
            })

            socketIO.on('two-moves-victory', (data) => {
                console.log('two-moves-victory');
                console.log("test board")
                setVictory(data.indexes)
                setBoard(old => {
                    const result = old.map((v,i) => {
                        if(data.indexes.includes(i)) return userSign % 2 + 1
                        if(i == data.userIndex) return userSign
                        return v
                    })
                    console.log("board result:", result)

                    return result
                    
                    // const finallBoard = [0,0,0,0,0,0,0,0,0]
                    // for(let i = 0; i < 9; i++){
                    //     if(i == data.userIndex){
                    //         finallBoard[i] = data.userSign
                    //         continue
                    //     }
                    //     if(data.indexes.includes(i)){
                    //         finallBoard[i] = data.winSign
                    //     }
                    //     else{
                    //         finallBoard[i] = old[i]
                    //     }
                    // }
                    // console.log(finallBoard)
                    // return finallBoard
                })
            })

            socketIO.on('two-moves-draw', (data) => {
                console.log("2 moves draw, data:", data)
                setVictory([])
                setBoard(old => old.map((v,i) => {
                    if(i == data.index1) return userSign;
                    if(i == data.index2) return userSign % 2 + 1;
                    return v
                }))
            })

            socketIO.on('restart-game-robot-first', (index) => {
                console.log('restart-game-robot-first, index: ', index)
                setBoard(() => {
                    const res = [0,0,0,0,0,0,0,0,0]
                    res[index] = 1
                    return res
                })
                setIsYourTurn(true)
                setVictory()
            })
        }
        else{
            socketIO.on('apply-move', (data) => {
                console.log("apply move, data:", data)
                if(data.sign != userSign) setIsYourTurn(true)
                setBoard(old => [...old.slice(0,data.index), data.sign, ...old.slice(data.index + 1)])
            }) 

            socketIO.on('opponent-leave', (code) => {
                setShowComp(<WaitingOpponent prevCode={code}/>)
            })
        }

        //shared events
        socketIO.on('victory', (data) => {
            console.log("victory, data:", data)
            setWins(old => {
                return {[data.sign]: old.wins[data.sign] + 1, [data.sign % 2 + 1]: old.wins[data.sign % 2 + 1]}
            })
            setVictory(data.indexes)
            setBoard(old => {
                const finallBoard = [0,0,0,0,0,0,0,0,0]
                for(let i = 0; i < 9; i++){
                    if(data.indexes.includes(i)){
                        finallBoard[i] = data.sign
                    }
                    else{
                        finallBoard[i] = old[i]
                    }
                }
                console.log(finallBoard)
                return finallBoard
            })
        })

        socketIO.on('illegal-move', () => {
            console.log("illegal move")
            !isSolo && setIsYourTurn(true)
        })

        socketIO.on('draw', (data) => {
            setBoard(old => [...old.slice(0,data.index), data.sign, ...old.slice(data.index + 1)])
            setVictory([])
        })

        socketIO.on('restart-game', () => {
            console.log("restart game");
            setBoard([0,0,0,0,0,0,0,0,0])
            setIsYourTurn(userSign == 1)
            setVictory()
        })
















        //isSolo && setOpponentDetails({name: "robot", avatar: "robot.png"})

        //isSolo && userSign == 2 && socketIO.emit('robot-first')

        // isSolo && socketIO.on('robot-first-move', (index) => {
        //     console.log("robot first move index:", index)
        //     setBoard(old => [...old.slice(0, index), userSign % 2 + 1, ...old.slice(index + 1)])
        //     setIsYourTurn(true)
        // })

        // isSolo && socketIO.on('robot-move', (data) => {
        //     console.log('robot-move')
        //     setBoard(old => old.map((sign, index) => {
        //         if(index == data.robotMove) return userSign % 2 + 1
        //         if(index == data.playerMove) return userSign
        //         return sign
        //     }))
        //     setIsYourTurn(true)
        // })

        // socketIO.on('draw', (data) => {
        //     setBoard(old => [...old.slice(0,data.index), data.sign, ...old.slice(data.index + 1)])
        //     setVictory([])
        // })

        // socketIO.on('opponent-leave', (code) => {
        //     setShowComp(<WaitingOpponent prevCode={code}/>)
        // })

        // socketIO.on('restart-game', () => {
        //     console.log("restart game");
        //     setBoard([0,0,0,0,0,0,0,0,0])
        //     setIsYourTurn(userSign == 1)
        //     setVictory()
        // })

        // socketIO.on('illegal-move', () => {
        //     console.log("illegal move")//צריך לוודא שרק השולח קיבל את האירוע אחרת שניהם יהפכו isyourturn true
        //     //isYourTurn = true;
        //     setIsYourTurn(true)
        // })
        // socketIO.on('victory', (data) => {
        //     console.log("victory, data:", data)
        //     setVictory(data.indexes)
        //     setBoard(old => {
        //         //console.log("indexes:", ...data.indexes);
        //         const finallBoard = [0,0,0,0,0,0,0,0,0]
        //         for(let i = 0; i < 9; i++){
        //             if(data.indexes.includes(i)){
        //                 finallBoard[i] = data.sign
        //             }
        //             else{
        //                 finallBoard[i] = old[i]
        //             }
        //         }
        //         // for(let i in finallBoard){
        //         //     console.log("i: ", i, "type:", typeof(i))
        //         //     if(data.indexes.includes(i)){
        //         //         console.log("found: " + i)
        //         //         finallBoard[i] = data.sign
        //         //     }
        //         //     else{
        //         //         finallBoard[i] = old[i]// + 2 ?
        //         //     }
        //         // }
        //         console.log(finallBoard)
        //         return finallBoard
        //     })
        //     //setBoard(old => [...old.slice(0,data.index), data.sign, ...old.slice(data.index + 1)])
        //     //setBoard([...board.slice(0,data.index), data.sign, ...board.slice(data.index + 1)])
        // })
        // socketIO.on('apply-move', (data) => {
        //     console.log("apply move, data:", data)
        //     if(data.sign != userSign) setIsYourTurn(true)
        //     setBoard(old => [...old.slice(0,data.index), data.sign, ...old.slice(data.index + 1)])
        // })
    },[])

    return(
        // <div className={`${styles.gamePage} page`}>
        <div className={styles.gamePage}>

            game page
            
            <PlayersBar victory={victory}/>

            <div className={styles.usersWrapper}>
                {!victory ?
                <div className={styles.users}>
                    <div className={styles.user}>
                        <div className={styles.imgContainer}>
                            <img className={`${styles.avatar} ${isYourTurn? styles.bigImg : ""}`} src={`/avatars/${userDetails?.avatar || 'anonymousavatar.avif'}`} alt="" />
                            <div className={styles.winsLine}>
                                <div className={styles.innerContainer}>
                                    <div className={styles.shape}>
                                        {userSign == 1? <Xshape/> :<Oshape/>}
                                    </div>
                                    {/* <div className={styles.wins}>wins: 0</div> */}
                                    <div className={styles.wins}>wins: {wins[userSign]}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userName}>{userDetails?.name || 'player'}</div>   
                    </div>
                    <div className={styles.user}>
                        <div className={styles.imgContainer}>
                            <img className={`${styles.avatar} ${isYourTurn? "" : styles.bigImg}`} src={`/avatars/${opponentDetails?.avatar || 'anonymous_opponent.webp'}`} alt="" />
                            <div className={styles.winsLine}>
                                <div className={styles.innerContainer}>
                                    <div className={styles.shape}>
                                        {userSign != 1? <Xshape/> :<Oshape/>}
                                    </div>
                                    {/* <div className={styles.wins}>wins: 0</div> */}
                                    <div className={styles.wins}>wins: {wins[userSign % 2 + 1]}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userName}>{opponentDetails?.name || 'opponent'}</div>
                    </div>
                </div> :
                victory.length == 3?
                <div className={styles.winner}>
                    {/* <div className={styles.user}> */}
                        <div className={styles.winnerImgContainer}>
                            {board[victory[0]] == userSign ? 
                            <>
                                <img className={styles.winnerAvatar} src={`/avatars/${userDetails?.avatar || 'anonymousavatar.avif'}`} alt="" />
                                <div className={styles.winnerShape}>
                                    {board[victory[0]] == 1 ? <Xshape/> :<Oshape/>}
                                </div>
                                {/* <div className={styles.winnerWins}>wins: 0</div> */}
                                <div className={styles.winnerWins}>wins: {wins[userSign]}</div>
                                <h3 className={styles.text}>{userDetails?.name || 'player'} win!!</h3>
                            </> : 
                            <>
                                <img className={styles.winnerAvatar} src={`/avatars/${opponentDetails?.avatar || 'anonymous_opponent.webp'}`} alt="" />
                                <div className={styles.winnerShape}>
                                    {board[victory[0]] == 1 ? <Xshape/> :<Oshape/>}
                                </div>
                                {/* <div className={styles.winnerShape}>wins: 0</div> */}
                                <div className={styles.winnerShape}>wins: {wins[userSign % 2 + 1]}</div>
                                <h3 className={styles.text}>{opponentDetails?.name || 'opponent'} win!!</h3>
                            </>
                            }
                        </div>
                    {/* </div> */}
                </div> : 
                <div className={styles.draw}>
                    <div className={styles.user}>
                        <div className={styles.imgContainer}>
                            <img className={styles.avatar} src={`/avatars/${userDetails?.avatar || 'anonymousavatar.avif'}`} alt="" />
                            <div className={styles.winsLine}>
                                <div className={styles.innerContainer}>
                                    <div className={styles.shape}>
                                        {userSign == 1? <Xshape/> :<Oshape/>}
                                    </div>
                                    {/* <div className={styles.wins}>wins: 0</div> */}
                                    <div className={styles.wins}>wins: {wins[userSign]}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userName}>{userDetails?.name || 'player'}</div>
                    </div>
                    <h3 className={styles.text}>
                        DRAW!
                    </h3>
                    <div className={styles.user}>
                        <div className={styles.imgContainer}>
                            <img className={styles.avatar} src={`/avatars/${opponentDetails?.avatar || 'anonymous_opponent.webp'}`} alt="" />
                                <div className={styles.winsLine}>
                                    <div className={styles.innerContainer}>
                                        <div className={styles.shape}>
                                            {userSign != 1? <Xshape/> :<Oshape/>}
                                        </div>
                                        {/* <div className={styles.wins}>wins: 0</div> */}
                                        <div className={styles.wins}>wins: {wins[userSign % 2 + 1]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.userName}>{opponentDetails?.name || 'opponent'}</div>
                    </div>
                    


                </div>
                }
                <div className={styles.rotateBG}></div>
            </div>
            <div className={styles.boardSection}>
                <Wrapper>
                    <div className={styles.boardContainer}>
                        {/* {demoGame.map(d => <GameSquare children={d}/>)} */}
                        {board.map((d,i) => {
                            if(d == 0)return <GameSquare index={i} key={i} func={markSquare} loss={victory && !victory.includes(i)}/>
                            if(d == 1) return <GameSquare loss={victory && !victory.includes(i)} key={i} children={<Xshape mode={victory && !victory.includes(i) ? "grey" : ""}/>}/>
                            return <GameSquare loss={victory && !victory.includes(i)} key={i} children={<Oshape mode={victory && !victory.includes(i) ? "grey" : ""}/>}/>
                        })}
                    </div>
                </Wrapper>
            </div>
            {victory? 
            <>
                <Button func={reset} text="play again"/>
                <Button func={backToMain} text="back to main"/>
            </>:<Button func={backToMain} text="back"/>}
        </div>
    )
}

export default Game