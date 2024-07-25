import Oshape from '../Oshape'
import Xshape from '../Xshape'
import styles from './style.module.css'

export default function PlayerBarImage({userSign, isYourTurn, image, wins, winner, name}){
    console.log(userSign)
    return (
        // <div className={styles.user}>
            <div className={winner? styles.winnerImgContainer : styles.imgContainer}>
                <img className={`${styles.avatar} ${isYourTurn ? styles.bigImg : ""}`} src={`/avatars/${image || 'anonymousavatar.avif'}`} alt="" />
                <div className={`${styles.winsLine}`}>
                    <div className={styles.innerContainer}>
                        <div className={winner ? styles.winnerShape : styles.shape}>
                            {userSign == 1? <Xshape/> :<Oshape/>}
                        </div>
                        <div className={winner? styles.winnerWins : styles.wins}>wins: {wins}</div>
                    </div>
                </div>
                {name && <div className={styles.userName}>{name}</div>}
            </div>
        // </div>
        
    )
}