import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import s from './NewPostForm.module.css';

const maxLength10 = maxLengthCreator(10)

const NewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={s.textarea}>
            <Field component={Textarea} name={"postText"} validate={[requiredField, maxLength10]} placeholder={"Enter message"}/>
        </div>
        <div className={s.button}>
            <button>Publish</button>
        </div>
    </form>
}

const NewPostReduxForm = reduxForm({
    form: 'newPost'
})(NewPostForm)

export default NewPostReduxForm;