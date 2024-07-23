import styles from './style.module.css'

function Wrapper({text, children}){
    return (
        <div className={styles.wrapper}>
            {text && <h3 className={styles.text}>{text}</h3>}
            {children}
        </div>
    )
}

export default Wrapper