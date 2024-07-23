import { useEffect, useRef } from 'react';
import BackBtn from '../../components/BackBtn'
import Title from '../../components/Title'
import Wrapper from '../../components/Wrapper'
import styles from './style.module.css'
import Button from '../../components/Button';
import FullWidthBtn from '../../components/FullWidthBtn';
import useDataContext from '../../context/DataContext';
import WaitingJoin from '../WaitingJoin';
import WaitingOpponent from '../WaitingOpponent';
import { io } from 'socket.io-client'

function JoinGame(){
    const SOCKET_SERVER_URL = 'http://localhost:2500/';
    const inputRef = useRef(null);
    const {setShowComp, setSocketIO } = useDataContext()

    const handleJoin = () => {
        const value = inputRef.current.value;
        console.log('Input Value:', value);

        //setpage
        setShowComp(<WaitingJoin code={value}/>)
    }
    const handleCreate = () => {
        setShowComp(<WaitingOpponent/>)
    }

    useEffect(() => {
        const withFriendSocket = io(`${SOCKET_SERVER_URL}/playWithFriend`)

        withFriendSocket.on('connect', () => {
            console.log('Connected to server!');
        });

        withFriendSocket.on('welcome', (data) => {
            console.log('welcome to chat, your socketId and rooms:', data);
        })

        setSocketIO(withFriendSocket)
    },[])

    return(
        <div className={`${styles.joinGamePage} page`}>
            <div className={styles.backDiv}>
                <BackBtn/>
            </div>
            <div className={styles.wrapper}>
                <Title text="join to a game"/>
                <Wrapper>
                    <input className={styles.codeInput} ref={inputRef} type="text" placeholder='enter code game'/>
                </Wrapper>
                <Button func={handleJoin} text="join"/>
                <div className={styles.divideLine}>
                    <div className={styles.line}></div>
                    <h1>or</h1>
                    <div className={styles.line}></div>
                </div>
                <FullWidthBtn func={handleCreate} text="create a game"/>
            </div>
            
        </div>
    )
}

export default JoinGame