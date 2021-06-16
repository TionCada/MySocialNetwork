import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state : {

        profilePage : {
            postsData : [
                {id: 1, text: "Hi, how are you?", like_count:5},
                {id: 2, text: "It is my first post", like_count:9}
            ],
            newPostText : ""
        },

        dialogsPage : {
            dialogsData : [
                {id: 1, name: "Ivan", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU"},
                {id: 2, name: "Artur", avatar: "https://www.w3schools.com/w3images/avatar2.png"},
                {id: 3, name: "Katya", avatar: "https://www.w3schools.com/w3css/img_avatar6.png"}
            ],

            messagesData : [
                {id: 1, message: "Hi"},
                {id: 2, message: "Yo"},
                {id: 3, message: "How are u doing? Haven't seen u in ages"},
                {id: 4, message: "Not bad, thanks. We should meet up"}
            ],
            newMessageText: "are u still here?"
        },

        sidebar : {
            sidebarData : [
                {id: 1, name: "Igor", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU"},
                {id: 2, name: "Ann", avatar: "https://www.w3schools.com/w3css/img_avatar6.png"},
                {id: 3, name: "Vlad", avatar: "https://www.w3schools.com/w3images/avatar2.png"}
            ]
        }
    },
    _callSubscriber() {
        console.log("something");
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;
