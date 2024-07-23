import styles from './style.module.css'

function Title({text}){
    return(
        <div className={styles.container}>
            <div className={styles.ellipsis}></div>
            <h3 className={styles.text}>{text}</h3>
        </div>
            
        
    )
}

export default Title