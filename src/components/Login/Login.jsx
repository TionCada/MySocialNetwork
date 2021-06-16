import React, {useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {getCaptchaThunkCreator, LoginThunkCreator} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "../Login/Login.module.css"
import style from "./../Common/FormsControls/FormsControls.module.css"

const Login = (props) => {

    useEffect(()=> {
        if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.alert("Please, login via PC! Website is under development and may not properly work on mobile devices right now")
        }
    }, [])

    const onSubmit = (formData) => {
        props.LoginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuthorized) {
        return <Redirect to={"/profile"}/>
    }

    return <div className={s.formOuter}>
        <div className={s.form} >
            <h1 className={s.login}>Login</h1>
            <LoginReduxForm captchaURL={props.captchaURL} onSubmit={onSubmit}/>
        </div>
    </div>
}

const LoginForm = ({handleSubmit, error, captchaURL}) => {
    return <div className={s.container}>
        <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.item}>
                {createField("Email", "email", requiredField, Input)}
            </div>
            <div className={s.item}>
                {createField("Password", "password", requiredField, Input, {type: "password"})}
            </div>
            <div className={s.item}>
                {createField(null, "rememberMe", [], Input, {type: "checkbox"})}
                <label>remember me</label>
            </div>
            {captchaURL ?
                <div>
                    <div className={s.item}>
                        {captchaURL && <img src={captchaURL}/>}
                    </div>
                    <div className={s.item}>
                        {captchaURL && createField("Captcha text", "captcha", requiredField, Input)}
                    </div>
                </div>
                :
                null}
            <div className={s.item}>
                {error && <div className={style.formSummaryError}>{error}</div>}
            </div>
            <div className={s.item}>
                <button className={s.button}>Submit</button>
            </div>
        </form>
        <div className={s.helper}>
            <p className={s.loggedOut}><b>Logged out?</b></p>
            <p>Just click on the buttons below! </p>
            <button className={s.firstButton} onClick={() => {window.prompt("Copy email to the clipboard?", "novak.anton.mailbox@gmail.com")}}>Get Email</button><br/>
            <button className={s.secondButton} onClick={() => {window.prompt("Copy password to the clipboard?", "qwerty123")}}>Get Password</button>
        </div>
    </div>
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, {LoginThunkCreator, getCaptchaThunkCreator})(Login);