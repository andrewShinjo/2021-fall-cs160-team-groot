import React from 'react'

const SignInValidation = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username="Username is required"
    }

    if (!values.password) {
        errors.password="Password is required"
    }
    return errors;
}

export default SignInValidation