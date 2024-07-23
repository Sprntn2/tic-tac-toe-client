import styles from './style.module.css'

function GameSquare({func, children, index, loss}){
    const handleClick = () => {if(func)func(index)}
    return(
        <div className={`${styles.gameSquare} ${loss ? styles.loss: ""}`} onClick={handleClick}>{children}</div>
    )
}

export default GameSquare