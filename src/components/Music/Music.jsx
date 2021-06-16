import React from "react";
import s from './Music.module.css';
import construction from "../../assets/images/construction.png";

const Music = (props) => {
    return (
        <div className={s.container}>
            <div className={s.image}>
                <img src={construction}/>
            </div>
        </div>
    );
}

export default Music;