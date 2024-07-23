import { useState } from 'react';
import styles from './style.module.css'
import Xshape from '../Xshape';
import Oshape from '../Oshape';

function ChooseSquare({player, selected, setSelected}){

    const handleClick = () => {
        console.log("square click");
        // if(func)func()
        //if(player)
        setSelected(player)
    }

    const notSelected = selected != 0 && selected != player;
    console.log(`select = ${selected}, for square ${player} notSelected is ${notSelected}`);

    return (
        <div 
            // style={{width: "calc(100% / 2 - 10px)"}} 
            className={`${styles.square} ${notSelected ? styles.notSelected : ""}`} 
            onClick={handleClick}>
            {player == 1 ? <Xshape mode={notSelected ? "grey" : selected == player ? "big" : ""}/> : 
            <Oshape mode={notSelected ? "grey" : selected == player ? "big" : ""}/>}
        </div>
    )
}

export default ChooseSquare