// import { useEffect } from 'react'
import { useEffect } from 'react'
import FullWidthBtn from '../../components/FullWidthBtn'
import SettingsBtn from '../../components/SettingsBtn'
import useDataContext from '../../context/DataContext'
import ChoosePlayer from '../ChoosePlayer'
import JoinGame from '../JoinGame'
import styles from './style.module.css'
import { io } from 'socket.io-client'

function Menu(){

    const { setShowComp, socketIO, setSocketIO } = useDataContext()
    
    const handleSolo = () => {

        setShowComp(<ChoosePlayer isSolo={true}/>)
    }
    const handleFriend = () => {setShowComp(<JoinGame/>)}

    useEffect(() => {
        //reset socket when back to main page
        //setSocketIO(io())
        console.log("reset socket")
        socketIO.disconnect();
        //setSocketIO()
    },[])

    return(
        <div className={`${styles.menuPage} page`}>
            menu page
            <FullWidthBtn func={handleSolo} text={"play solo"}/>
            <FullWidthBtn func={handleFriend} text={"play with a friend"} />
            <div className={styles.settingsBtnDiv}>
                <SettingsBtn/>
            </div>
        </div>
    )
}

export default Menu