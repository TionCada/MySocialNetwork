import React from "react";
import loadImage from "../../../assets/images/load.svg";
import s from './Preloader.module.css'

let Preloader = (props) => {
    return <div className={s.preloader}>
        <img src={loadImage}/>
    </div>
}

export default Preloader;