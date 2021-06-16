import React from "react";
import s from './Dialog.module.css';
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    return (
        <div className={s.dialog}>
            <img className={s.img} src={props.avatar}/>
            <NavLink className={s.navLink} to={'/dialogs/' + props.id}><b>{props.name}</b></NavLink>
        </div>
    );
}

export default Dialog;