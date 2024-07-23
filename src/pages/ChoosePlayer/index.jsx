import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import styles from './style.module.css'
import ChooseSquare from '../../components/ChooseSquare'
import Title from '../../components/Title'
import Button from '../../components/Button'
import useDataContext from '../../context/DataContext'
import Game from '../Game'
import BackBtn from '../../components/BackBtn'
import { io } from 'socket.io-client'

function ChoosePlayer({isSolo}){
    const {setShowComp, userSign, setUserSign, socketIO, setSocketIO} = useDataContext()
    // const [selected, setSelected] = useState(0)//0 for none selected
    const SOCKET_SERVER_URL = 'http://localhost:2500/';

    console.log("is solo: ", isSolo)
    const handleNext = () => {
        if(isSolo){
            //socketIO.emit('new-solo-game', {sign: userSign, name: userDetails.name, avatar: userDetails.avatar})
            socketIO.emit('new-solo-game', userSign)
        
            socketIO.on('solo-game-added', () => {
                setShowComp(<Game isSolo={true}/>)
            })
        }
        else{
            socketIO.emit('sign-selcted', userSign) //user sign is 1 for x or 2 for o
            //setShowComp(<Game/>)
            //socketIO.on('start-game', () => {})
            socketIO.on('sign-selected', (sign) => {
                setShowComp(<Game/>)
            })
        }
    }

    //useEffect(() => {if(userSign)setUserSign(0)},[])//reset sign when start again
    useEffect(() => {
        if(userSign)setUserSign(0)//reset sign when start again
        if(isSolo){
            console.log("connecting test")
            const soloSocket = io(`${SOCKET_SERVER_URL}playSolo`)

            soloSocket.on('connect', () => {
                console.log('Connected to play solo server!');
            });
    
            soloSocket.on('welcome', (data) => {
                console.log('welcome to chat, your socketId and rooms:', data);
            })
    
            setSocketIO(soloSocket)
        }
    },[])

    return(
        <div className={`${styles.choosePlayerPage} page`}>
            choose player page
            <div className={styles.backDiv}>
                <BackBtn/>
            </div>
            <Title text="choose player"/>
            <Wrapper>
                <div className={styles.squares}>
                    {/* 1 for x */}
                    {/* <ChooseSquare player={1} selected={selected} setSelected={setSelected}/> */}
                    <ChooseSquare player={1} selected={userSign} setSelected={setUserSign}/>
                    {/* 2 for o */}
                    {/* <ChooseSquare player={2} selected={selected} setSelected={setSelected}/> */}
                    <ChooseSquare player={2} selected={userSign} setSelected={setUserSign}/>
                </div>
            </Wrapper>
            {/* {selected != 0 && <Button func={handleNext} text="let's play"/>} */}
            {userSign != 0 && <Button func={handleNext} text="let's play"/>}
        </div>
    )
}

export default ChoosePlayer