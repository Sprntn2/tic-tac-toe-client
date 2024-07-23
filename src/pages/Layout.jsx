import { useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import Welcome from "./Welcome";
import { io } from 'socket.io-client'

function Layout(){

    // const SOCKET_SERVER_URL = 'http://localhost:2500/';
    const [socketIO, setSocketIO] = useState(io())

    const [showComp, setShowComp] = useState(<Welcome/>)
    const [userDetails, setUserDetails] = useState()
    const [opponentDetails, setOpponentDetails] = useState({name: "anonymous opponent", avatar: "anonymous_opponent.webp"})
    const [userSign, setUserSign] = useState(0)//1 for x, 2 for o, 0 for not selected

    // useEffect(() => {
    //     const socket = io(SOCKET_SERVER_URL)

    //     socket.on('connect', () => {
    //         console.log('Connected to server!');
    //     });

    //     socket.on('welcome', (data) => {
    //         console.log('welcome to chat, your socketId and rooms:', data);
    //         
    //         // setIsConnected(true)
    //     })
        
    //     setSocketIO(socket)

    //     return () => {
    //         socketIO.disconnect();
    //     };
    // },[])

    return (
        <DataContext.Provider value={{
            setShowComp, 
            userDetails, 
            setUserDetails, 
            userSign, 
            setUserSign, 
            socketIO,
            setSocketIO, 
            opponentDetails, 
            setOpponentDetails 
        }}>
            {showComp}
        </DataContext.Provider>
    )
}

export default Layout