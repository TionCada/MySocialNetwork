import React, {useState} from 'react';
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from './ProfileDataForm.module.css';
import style from "../../Common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.formSummaryError}>{error}</div>}
        <div className={s.btnEditContainer}>
            <button className={s.btnEdit}>Save</button>
        </div>
        <div className={s.profileInfoContainer}>
            <div className={s.firstInfoBlock}>
                <div><b>Full Name: </b>{createField("Full Name", "fullName", [], Input)}</div>
                <div className={s.item}><b>About me: </b>
                    {createField("About Me", "aboutMe", [], Input)}</div>
                <div className={s.item}><b>Looking for a job: </b>
                    {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
                </div>
                <div className={s.item}><b>My professional skills: </b>
                    {createField("My professional skills", "lookingForAJobDescription", [], Input)}
                </div>
            </div>
            <div className={s.secondInfoBlock}>
                <div><b className={s.contacts}>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}>
                        <b>{key}: </b> {createField(key, "contacts." + key, [], Input)}
                    </div>
                })}</div>
            </div>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'profileData'})(ProfileDataForm)

export default ProfileDataFormReduxForm;