import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'my-app/profile/ADD-POST';
const DELETE_POST = 'my-app/profile/DELETE-POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-app/profile/SET_STATUS';
const UPDATE_PROFILE_PICTURE = 'my-app/profile/UPDATE_PROFILE_PICTURE';


let initialState = {
    postsData: [
        {id: 1, text: "Hello! How are you doing? This is my first post"},
        {id: 2, text: "The weather today is really nice. I think I'll go for a walk to the park"}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                text: action.postText,
                like_count: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: [state.postsData.slice(action.postId)],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case UPDATE_PROFILE_PICTURE: {
            return {
                ...state,
                profile: {...state.profile, photos: action.picture}
            };
        }
        default:
            return state;
    }
}

// Action Creators

export const ADD_POST_ACTION_CREATOR = (postText) => ({type: ADD_POST, postText})
export const DELETE_POST_ACTION_CREATOR = (postId) => ({type: DELETE_POST, postId})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const updateProfilePicture = (picture) => ({type: UPDATE_PROFILE_PICTURE, picture})

// Thunk Creators

export const saveProfile = (profile) =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let data = await profileAPI.saveProfile(profile)
        if (data.resultCode === 0) {
            dispatch(getMyProfileInfoThunkCreator(userId));
        } else {
            dispatch(stopSubmit("profileData", {_error: data.messages[0]}))
            return Promise.reject(data.messages[0]);
        }
    }

export const getMyProfileInfoThunkCreator = (userId) =>
    async (dispatch) => {
        let data = await usersAPI.getProfileInfo(userId)
        dispatch(setUserProfile(data));
    }

export const getStatusThunkCreator = (userId) =>
    async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(setStatus(data));
    }

export const updateStatusThunkCreator = (status) => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch(error) {
        alert("something is wrong!")
    }
}

export const updateProfilePictureThunkCreator = (picture) =>
    async (dispatch) => {
    debugger
        let data = await profileAPI.updateProfilePicture(picture)
        if (data.resultCode === 0) {
            dispatch(updateProfilePicture(data.data.photos));
        }
    }

export default profileReducer;