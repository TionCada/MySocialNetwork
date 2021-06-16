import {AuthorizationThunkCreator} from "./auth-reducer";

const SET_INITIALIZATION = 'SET_INITIALIZATION';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZATION:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

// Action Creators

export const setInitialization = () => ({type: SET_INITIALIZATION});

// Thunk Creators

export const InitializationThunkCreator = () => {
    return (dispatch) => {
        let promise = dispatch(AuthorizationThunkCreator());
        promise.then(() => {
            dispatch(setInitialization());
        })
    }
}

export default appReducer;