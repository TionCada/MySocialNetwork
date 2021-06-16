import React from "react";
import s from './News.module.css';
import construction from "../../assets/images/construction.png";

const News = (props) => {
    return (
        <div className={s.container}>
            <div className={s.image}>
                <img src={construction}/>
            </div>
        </div>
    );
}

export default News;