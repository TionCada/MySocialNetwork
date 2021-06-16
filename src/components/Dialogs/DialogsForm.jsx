import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../utils/validators/validators";
import s from './DialogsForm.module.css'

const maxLength100 = maxLengthCreator(100)

const DialogsForm = (props) => {
    return <form className={s.dialogs} onSubmit={props.handleSubmit}>
        <Field component={Textarea} name={'message'}></Field>
        <button>Send</button>
    </form>
}

const DialogsReduxForm = reduxForm({
    form: 'dialogsForm'
})(DialogsForm)

export default DialogsReduxForm;