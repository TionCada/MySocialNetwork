import React from "react";
import styles from "./FormsControls.module.css"
import {Field} from "redux-form";

const FormControl = ({input, meta: {error, touched}, ...props}) => {
    const hasError = error && touched;

    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {props.children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder, name, validators, component, props={}) => {
    return <div className={styles.field}>
        <Field component={component} name={name} placeholder={placeholder} validate={validators} {...props}/>
    </div>
}