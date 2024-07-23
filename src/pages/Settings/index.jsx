import { useRef, useState } from 'react';
import Wrapper from '../../components/Wrapper'
import useDataContext from '../../context/DataContext'
import styles from './style.module.css'
import BackBtn from '../../components/BackBtn';
import ConfirmBtn from '../../components/ConfirmBtn';
import Menu from '../Menu';

function Settings(){
    const {setShowComp, userDetails, setUserDetails} = useDataContext()
    const inputRef = useRef(null);
    const [avatarIndex, setAvatatrIndex] = useState(0)
    const avatars = [
        "avatar1.png",
        "avatar2.png",
        "avatar3.png",
        "avatar4.png",
        "avatar5.jpg",
        "avatar6.jpg"
    ]

    let touchStart = null; 
    let touchEnd = null;

    const handleConfirm = () => {
        const value = inputRef.current.value;
        setUserDetails({name: value, avatar: avatars[avatarIndex + 1]})
        setShowComp(<Menu/>)
    }

    const handleTouchStart = (e) => {
        touchStart = e.targetTouches[0].clientX
    };

    const handleTouchMove = (e) => {
        touchEnd = e.targetTouches[0].clientX
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        if (isLeftSwipe) {
            setAvatatrIndex((avatarIndex + 1) % avatars.length)
        }
        if (isRightSwipe) {
            setAvatatrIndex(avatarIndex != 0 ? avatarIndex - 1 : avatars.length - 1)
        }
        touchStart = null
        touchEnd = null
    }

    return(
        <div className={`${styles.settingsPage} page`}>
            <div>logo here</div>
            <Wrapper text="your name">
                <input defaultValue={userDetails?.name} className={styles.nameInput} ref={inputRef} type="text" />
            </Wrapper>
            <div className={styles.chooseAvatar}>
                <h3>choose avatar</h3>
                <div 
                    className={styles.avatars}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={styles.smallAvatar}>
                        <img src={`/avatars/${avatars[avatarIndex]}`} alt="" />
                    </div>
                    <div className={styles.largeAvatar}>
                        <img src={`/avatars/${avatars[(avatarIndex + 1) % avatars.length]}`} alt="" />
                    </div>
                    <div className={styles.smallAvatar}>
                        <img src={`/avatars/${avatars[(avatarIndex + 2) % avatars.length]}`} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.btns}>
                <BackBtn/>
                <ConfirmBtn func={handleConfirm}/>
            </div>
        </div>
    )
}

export default Settings