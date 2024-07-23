import styles from './style.module.css'

function ConfirmBtn({func}){
    return (
        <button className={styles.btn} onClick={func}>
            <svg width="1.2rem" height="1.2rem" viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeDasharray={24} strokeDashoffset={24} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11L11 17L21 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"></animate></path></svg>
        </button>
    )
}

export default ConfirmBtn