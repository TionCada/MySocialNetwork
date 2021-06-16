import React from "react";
import s from "../ProfileImage/ProfileImage.module.css";
import userPhoto from "../../../assets/images/ProfileIcon.png";
import plus from "../../../assets/images/plus.png";
import {connect} from "react-redux";
import {updateProfilePictureThunkCreator} from "../../../redux/profile-reducer";

const profileImage = ({profile, isOwner, updateProfilePictureThunkCreator}) => {

    const onProfilePhotoSelected = (e) => {
        debugger
        if (e.target.files.length) {
            updateProfilePictureThunkCreator(e.target.files[0]);
        }
    }

    return <div className={s.profileImgParent}>
        <img className={s.profileImg} src={profile.photos.large || userPhoto}/>
        <div className={s.uploadButtonWrapper}>
            <img className={isOwner ? s.plusIcon : s.hideImage} src={plus}/>
            <input type={"file"} onChange={onProfilePhotoSelected}/>
        </div>
    </div>
}

let mapStateToProps = (state) => ({

})

const ProfileImageContainer = connect(mapStateToProps, {updateProfilePictureThunkCreator})(profileImage)

export default ProfileImageContainer;