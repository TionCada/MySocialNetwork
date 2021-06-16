import {usersAPI, usersAPI as UsersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'my-app/users/FOLLOW';
const UNFOLLOW = 'my-app/users/UNFOLLOW';
const SET_USERS = 'my-app/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'my-app/users/SET_USERS_TOTAL_COUNT';
const SHOW_LOADING_IMAGE = 'my-app/users/SHOW_LOADING_IMAGE';
const CONTROL_THE_BUTTON = 'my-app/users/CONTROL_THE_BUTTON';

let initialState = {
    users: [],
    pageSize: 9,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case SHOW_LOADING_IMAGE:
            return {...state, isLoading: action.isLoading}
        case CONTROL_THE_BUTTON:
            return {
                ...state,
                followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

// Action creators

export const follow = (userId) => ({type: FOLLOW, userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUserCount = (totalCount) => ({type: SET_USERS_TOTAL_COUNT, totalCount})
export const showLoadingImage = (isLoading) => ({type: SHOW_LOADING_IMAGE, isLoading})
export const controlTheButton = (isLoading, userId) => ({type: CONTROL_THE_BUTTON, isLoading, userId})


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(controlTheButton(true, userId));
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(controlTheButton(false, userId));
}

// Thunk creators

export const followThunkCreator = (userId) =>
    async (dispatch) => {
        let apiMethod = UsersAPI.addSubscription.bind(userId)
        let actionCreator = follow;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }

export const unfollowThunkCreator = (userId) =>
    async (dispatch) => {
        let apiMethod = UsersAPI.deleteSubscription.bind(userId)
        let actionCreator = unfollow;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }

export const getUsersOnLoadThunkCreator = (currentPage, pageSize) =>
    async (dispatch) => {
        dispatch(showLoadingImage(true));
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(showLoadingImage(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
    }

export const getUsersOnReloadThunkCreator = (pageNumber, pageSize) =>
    async (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(showLoadingImage(true));
        let data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(showLoadingImage(false));
        dispatch(setUsers(data.items));
    }


export default usersReducer;