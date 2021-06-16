import React from "react";
import styles from "./Users.module.css";
import user_photo from "../../assets/images/ProfileIcon.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollowThunkCreator, followThunkCreator}) => {
    return (
        <div className={styles.users}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.large != null ? user.photos.large : user_photo}
                         className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div className={styles.userName}>{user.name}</div>
            <div>
                {user.followed
                    ? <button className={styles.FUbutton} disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollowThunkCreator(user.id);
                              }}>Unfollow</button>
                    : <button className={styles.FUbutton} disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  followThunkCreator(user.id);
                              }}>Follow</button>}
            </div>
        </div>)
}

export default User;