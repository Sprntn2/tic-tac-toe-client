import useDataContext from '../../context/DataContext';
import Settings from '../../pages/Settings';
import styles from './style.module.css'
import { IoSettingsOutline } from "react-icons/io5";

function SettingsBtn(){

    const {setShowComp} = useDataContext()
    

    return (
        <button onClick={() => setShowComp(<Settings/>)} className={styles.btn}>
            <IoSettingsOutline />
        </button>
    )
}

export default SettingsBtn