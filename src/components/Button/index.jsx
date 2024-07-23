import styles from './style.module.css'

function Button({func, text}){
    return(
        <button className={styles.btn} onClick={func}><h1>{text}</h1></button>
    )
}

export default Button