import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileDataForm from "../ProfileInfo/ProfileDataForm";

const ProfileInfo = ({profile, isOwner, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

    return ( <div>
            {editMode ? <ProfileDataForm onSubmit={onSubmit} initialValues={profile} profile={profile}/> : <ProfileData
                activateEditMode={() => {
                    setEditMode(true)
                }} profile={profile} isOwner={isOwner}/>}
        </div>
    );
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.item2}><b>{contactTitle}: </b>{contactValue}</div>
}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
    return <div>
        {isOwner && <div className={s.btnEditContainer}>
            <button className={s.btnEdit} onClick={activateEditMode}>Edit</button>
        </div>}
        <div className={s.profileInfoContainer}>
            <div className={s.firstInfoBlock}>
                <div className={s.profileName}><b>{profile.fullName}</b></div>
                <div className={s.item}><b>About me: </b>{profile.aboutMe}</div>
                <div className={s.item}><b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}</div>
                {profile.lookingForAJob && <div className={s.item}><b>My professional skills: </b>{profile.lookingForAJobDescription}</div>}
            </div>
            <div className={s.secondInfoBlock}>
                <div><b className={s.contacts}>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}</div>
            </div>
        </div>
    </div>
}

export default ProfileInfo;