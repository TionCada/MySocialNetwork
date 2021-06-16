import React from "react";
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import DialogsForm from "./DialogsForm";

const Dialogs = (props) => {

    let dialogs = props.dialogsData.map(
        d => <Dialog name={d.name} id={d.id} avatar={d.avatar}/>
    )

    let messages = props.messagesData.map(
        m => {
            if (m.id % 2 == 0) {
                return <Message text={m.message} id={m.id} style="right"/>
            }
            else {
                return <Message text={m.message} id={m.id} style="left"/>
            }
        }
    )

    let addNewMessage = (values) => {
        props.onMessageAdd(values.message);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogs}
            </div>
            <div className={s.messages}>
                <div>
                    {messages}
                </div>
            </div>
            <div className={s.sendMessage}>
                <DialogsForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;