import {authAPI, securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';
const SET_CAPTCHA_DATA = 'my-app/auth/SET_CAPTCHA_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuthorized: false,
    captchaURL: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA_DATA:
            return {
                ...state,
                captchaURL: action.data.captchaData
            }
        default:
            return state;
    }
}

// Action Creators

export const setAuthUserData = (userId, email, login, isAuthorized) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuthorized}
});
export const setCaptchaData = (captchaData) => ({
    type: SET_CAPTCHA_DATA,
    data: {captchaData}
});

// Thunk Creators

export const AuthorizationThunkCreator = () =>
    async (dispatch) => {
        let data = await usersAPI.authorizationCheck();

        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }

export const LoginThunkCreator = (email, password, rememberMe, captcha) =>
    async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(AuthorizationThunkCreator())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaThunkCreator());
            }
            let Errormessage = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: Errormessage})); // action creator
        }
    }

export const LogoutThunkCreator = () =>
    async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }

export const getCaptchaThunkCreator = () =>
    async (dispatch) => {
        let data = await securityAPI.getCaptchaURL()
        let captchaURL = data.url;
        dispatch(setCaptchaData(captchaURL));
    }


export default authReducer;