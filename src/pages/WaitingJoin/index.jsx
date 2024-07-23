import { useEffect } from 'react'
import BackBtn from '../../components/BackBtn'
import Spinner from '../../components/Spinner'
import useDataContext from '../../context/DataContext'
import styles from './style.module.css'
import JoinGame from '../JoinGame'
import Game from '../Game'


function WaitingJoin({code}){
    
    //console.log("code:", code)
    // const {setShowComp} = useDataContext()
    //const { setShowComp, socketIO, userDetails, setOpponentDetails, setUserSign} = useDataContext()
    const { setShowComp, setSocketIO, userDetails, setOpponentDetails, setUserSign} = useDataContext()
    const testMoveNext = () => {
        setShowComp()
    }

    useEffect(() => {
        
        console.log({code, ...userDetails});
        socketIO.emit('join-game', {code, ...userDetails})
        socketIO.on('game-not-found', (msg) => {
            console.log("error message: ", msg)
            //go back
            setShowComp(<JoinGame/>)
        })

        socketIO.on('join-successfully', (data) => {
            console.log('opponent-details, data:', data)
            setOpponentDetails(data)
        })

        socketIO.on('sign-selected', (sign) => {
            console.log("sign:", sign)
            setUserSign(sign)
            setShowComp(<Game/>)
        })
        // socketIO.on('joined', (code) => {
        //     console.log('joined to game, code:', code)
        // })

        //socketIO.on('start-game', () => {console.log("start game")})
        
    },[])


    return(
        <div className={`${styles.waitingJoinPage} page`}>
            waiting join page
            <div className={styles.backDiv}>
                <BackBtn/>
            </div>
            <Spinner/>
            <h3 className={styles.text}>waiting...<br/>join to the game</h3>

            <button onClick={testMoveNext}>test move next</button>
        </div>
    )
}

export default WaitingJoin