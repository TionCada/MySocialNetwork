import React from 'react';
import s from './Post.module.css';
import Preloader from "../../../Common/Preloader/Preloader";

const Post = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={s.post}>
            <img className={s.img} src={props.profile.photos.large}/>
            <div className={s.postText}>
                {props.message}
            </div>
        </div>
    );
}

export default Post;