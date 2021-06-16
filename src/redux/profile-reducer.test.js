import profileReducer, {ADD_POST_ACTION_CREATOR, DELETE_POST_ACTION_CREATOR} from "./profile-reducer";

const state = {
    postsData: [
        {id: 1, text: "Hello! How are you doing? This is my first post", like_count: 5},
        {id: 2, text: "It is my first post", like_count: 9}
    ],
    profile: null,
    status: ""
};

it('new post should be added', () => {

    let action = ADD_POST_ACTION_CREATOR('Hello')

    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(3);
})

it('new post text should be correct', () => {

    let action = ADD_POST_ACTION_CREATOR('Hello')

    let newState = profileReducer(state, action);

    expect(newState.postsData[2].text).toBe('Hello');
})

it('amount of posts after deleting should be decremented', () => {

    let action = DELETE_POST_ACTION_CREATOR(2)

    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(1);
})
