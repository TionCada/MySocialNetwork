import React from "react";
import s from './Settings.module.css';
import construction from '../../assets/images/construction.png';

const Settings = (props) => {
    return (
        <div className={s.container}>
            <div className={s.image}>
                <img src={construction}/>
            </div>
        </div>
    );
}

export default Settings;