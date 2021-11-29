import axios from 'axios';
import {Redirect} from 'react-router-dom';
import React, { useState } from 'react';
import '../css/SignUp.css';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import validation from "./SignUpValidation"

import UserDataService from '../services/user.service';

const SignUpPage = (props) => {
    //Assigning initial values of each variable
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const HandleChange = (event) => {
        //Sets the value for each input field
        //First take the initial values of each field
        //Then assign the value given by users based on the names
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    const HandleFormSubmit = (event) => {
        event.preventDefault();
        //Validating user input
        const errors = validation(values)
        setErrors(errors);
        if(Object.entries(errors).length === 0) { // if no errors are generated, then execute sign up

             // Submit the request to the backend
            UserDataService.postSignup(values).then(
                (response) => {
                    props.history.push("/sign-in");
                    alert(response.data);
                }
            ).catch(
                (error) => {
                    alert(error.response.data);
                }
            );
            /**
             * Example from the authentication branch
             * axios.post('http://localhost:8080/api/auth/signup', values)
             * .then(res => console.log(res))
             * .catch(err => console.log(err));
             * */
        }
    };

    const returnHome = () => {
        props.history.push("/");
   };

    if(localStorage.getItem("jwt") === null) {
        return (
            <div className="background">
                <Card className="loginCard my-5" style={{ width: "50%" }}>
                    <Card.Body>
                        <Card.Title><h1 class="text-center ff-font">Sign Up</h1></Card.Title>
                        <Card.Text>
                            <Form style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}>
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        placeholder="John"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={HandleChange} />
                                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        placeholder="Doe"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={HandleChange} />
                                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="123abc@example.com"
                                        name="email"
                                        value={values.email}
                                        onChange={HandleChange} />
                                    {errors.email && <p className="error">{errors.email}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        placeholder="Username"
                                        name="username"
                                        value={values.username}
                                        onChange={HandleChange} />
                                    {errors.username && <p className="error">{errors.username}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={HandleChange} />
                                    {errors.password && <p className="error">{errors.password}</p>}
                                </Form.Group>

                                <Form.Label>Diet</Form.Label>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Pescatarian"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            inline
                                            label="Vegetarian"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                        <Form.Check
                                            inline
                                            label="Vegan"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                    </div>
                                ))}
                                <Row>
                                    <Col>
                                        <div className="text-center">
                                            <Button variant="success" type="submit" onClick={HandleFormSubmit} >
                                                Sign Up
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="text-center">
                                            <Button className="returnButton" onClick={returnHome}>Return</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        ) 
    } else {
        return <Redirect to="/"/>
    }

}

export default SignUpPage
