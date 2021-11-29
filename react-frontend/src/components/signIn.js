import axios from 'axios';
import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Card, Button, Row, Col } from 'react-bootstrap'
import '../css/signIn.css';
import validationSignIn from "./signInValidation"

const SignIn = (props) => {
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const HandleChange = (event) => {
        // Sets the value for each input field
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    const HandleFormSubmit = (event) => {
        event.preventDefault();
        // Validate user input
        setErrors(validationSignIn(values));

        axios.post('http://localhost:8080/api/auth/signin', values)
        // If promise is fullfilled (status code 200), redirect to profile page and output data on console
        .then(res => { 
            window.localStorage.setItem("jwt", res.data.jwt);
            window.localStorage.setItem("username", res.data.username);
            props.history.push("/profile");
            console.log(res)
        })
        // If promise is rejected, output error message on console and have an alert pop-up
        .catch(err => {
            console.log(err)
            alert("Incorrect username or password!");
        });

    };

    const returnHome = () => {
         props.history.push("/");
    };

    if(localStorage.getItem("jwt") === null) {
        return (
            <div className="outer-container-signIn">
                <Card style={{ width: "45%" }}>
                    <Card.Body>
                        <Card.Title><h1 className="text-center ff-font">Sign In</h1></Card.Title>
                        <Form className="formStyling-signIn">
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name = "username"
                                    placeholder="Enter username"
                                    value={values.username}
                                    onChange={HandleChange} 
                                />
                                {errors.username && <p className="error">{errors.username}</p>}
                            </Form.Group>

                            <Form.Group controlId="password" style={{ paddingTop: '20px' }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name = "password"
                                    placeholder="Enter password" 
                                    value={values.password}
                                    onChange={HandleChange}
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </Form.Group>
                            <Row>
                                <Col>
                            <div className="signIn-button-formatting">
                                <Button className="signIn-button-styling" variant="success" type="submit" onClick={HandleFormSubmit}>Sign In </Button>
                            </div></Col>
                            <Col>
                            <div className="signIn-button-formatting">
                                <Button className="signIn-button-styling" onClick={returnHome}>Return</Button>
                            </div>
                            </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    } else {
        return <Redirect to="/"/>
    }
}
export default SignIn