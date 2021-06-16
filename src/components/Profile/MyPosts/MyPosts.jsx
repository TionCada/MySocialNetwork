import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import NewPostForm from "./NewPostForm";

const MyPosts = (props) => {

    let posts = props.postsData.map(
        p => <Post profile={props.profile} key={p.id} message={p.text}/>
    )

    let onPostAdd = (values) => {
        props.addPost(values.postText);
    }

    return (
        <div className={s.myPosts}><b className={s.name}>My posts</b>
            <div>
                <NewPostForm onSubmit={onPostAdd}/>
            </div>
            <div className={s.posts}>{posts}</div>
        </div>
    );
}

export default MyPosts;