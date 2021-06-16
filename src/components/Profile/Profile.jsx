import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileImageContainer from "./ProfileImage/ProfileImage";
import Preloader from "../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileInfo/ProfileStatusWithHooks";

const Profile = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <section>
            <div className={s.profileImage}>
                <ProfileImageContainer profile={props.profile} isOwner={props.isOwner}/>
            </div>
            <div className={s.profileStatus}>
                <ProfileStatusWithHooks isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
            </div>
            <div className={s.profileInfo}>
                <ProfileInfo isOwner={props.isOwner} status={props.status} profile={props.profile}
                             updateStatus={props.updateStatus} saveProfile={props.saveProfile}/>
            </div>
            {props.isOwner && <div className={s.myPosts}>
                <MyPostsContainer/>
            </div>}
        </section>
    );
}

export default Profile;