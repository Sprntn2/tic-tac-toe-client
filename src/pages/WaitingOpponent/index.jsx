import { useEffect, useState } from 'react'
import BackBtn from '../../components/BackBtn'
import styles from './style.module.css'
import Wrapper from '../../components/Wrapper'
import Spinner from '../../components/Spinner'
import useDataContext from '../../context/DataContext'
import ChoosePlayer from '../ChoosePlayer'


function WaitingOpponent({prevCode}){
    const [code, setCode] = useState("")
    const textContent = code.split("").map((n,i) => <h4 key={i}>{n}</h4>)

    //const { setShowComp, socketIO, userDetails, setOpponentDetails, setSocketIO } = useDataContext()
    const { setShowComp, socketIO, userDetails, setOpponentDetails } = useDataContext()
    //console.log("test user details: ", userDetails, "\ntest user sign", userSign)
    // const testMoveNext = () => {
    //     setShowComp(<ChoosePlayer/>)
    // }

    const opponentJoined = (data) => {
        console.log('opponent-joined, data:', data)
        setOpponentDetails(data)
        setShowComp(<ChoosePlayer/>)
    }

    useEffect(() => {
        
        if(prevCode){//opponent leave, socket connection and game room already exist
            setCode(prevCode)

            // socketIO.on('opponent-joined', (data) => opponentJoined(data))
        }
        else{//new socket connection and new game room required
            //const friendSocket = io(`${SOCKET_SERVER_URL}playWithFriend`)
            socketIO.emit('new-game', userDetails)
            socketIO.on('connect', () => {
                console.log('Connected to play solo server!');
            });
            socketIO.on('welcome', (data) => {
                console.log('welcome to chat, your socketId and rooms:', data);
            })
            //socketIO.on('opponent-joined', (data) => opponentJoined(data))

            socketIO.on('game-added', (code) => {
                console.log("code: ", code)
                setCode(code)
            })

            //setSocketIO(friendSocket)
        }
        socketIO.on('opponent-joined', (data) => opponentJoined(data))



        

        



        
        
        
        
        //emit new game and set code on return
        //socketIO.emit('new-game', {...userDetails, sign: userSign})
        
        // if(!prevCode){//when opponent leaving
        //     socketIO.emit('new-game', {...userDetails})
        // }else{
        //     setCode(prevCode)
        // }
        // socketIO.on('game-added', (code) => {
        //     console.log("code: ", code)
        //     setCode(code)
        // })

        // socketIO.on('opponent-joined', (data) => {
        //     console.log('opponent-joined, data:', data)
        //     setOpponentDetails(data)
        //     setShowComp(<ChoosePlayer/>)
        // })








        //socketIO.on('start-game', () => {console.log("start game")})

        //socketIO.on('second-player-joined', () => console.log('second player joined'))
        // socketIO.on('joined', () => {
        //     console.log("user joined")
        // })
    },[])

    return(
        <div className={`${styles.waitingOpponentPage} page`}>
            waiting opponent page
            <div className={styles.backDiv}>
                <BackBtn/>
            </div>
            <Wrapper text="your code">
                <div className={styles.contentDiv}>{code.split("").map((n,i) => <h3 key={i}>{n}</h3>)}</div>
            </Wrapper>
            <Spinner/>
            <h3 className={styles.text}>waiting for opponent</h3>

            {/* <button onClick={testMoveNext}>test move next</button> */}
        </div>
    )
}

export default WaitingOpponent