const ADD_MESSAGE = 'my-app/dialogs/ADD-MESSAGE';

let initialState = {
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
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = (
                {
                    id: 6,
                    message: action.newMessage,
                }
            )
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        }
        default:
            return state;
    }
}

export const ADD_MESSAGE_ACTION_CREATOR = (newMessage) => ({ type: ADD_MESSAGE, newMessage })

export default dialogsReducer;