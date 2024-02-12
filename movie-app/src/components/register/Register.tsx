import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './register.scss'
import { Link } from "react-router-dom";

type RegistrationForm = {
    username: string;
    password: string;
    passwordConfirmation: string;
}

const Register = () => {
    const [state, setState] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    });

    const handleChange = (event: any) =>{
        const {name, value} = event.target;
        setState(({
            ...state,
            [name]: value
        }));
        // console.log({name, value});
    }

    const handleSubmit = (event: any) => {
        event?.preventDefault(); //prevent refreshing
        console.log('state', state)
    }


    return (
    <div className="register">
        <h2 className="heading">Register Page</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" name='username' value={state.username} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" name='password' value={state.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm your password" name='passwordConfirmation' value={state.passwordConfirmation} onChange={handleChange} />
            </Form.Group>
            <Button variant="dark" type="submit">Register</Button>
            <div className="mt-2">
                Already have an account? <Link to={"/login"}>Login here</Link>!
            </div>
        </Form>
    </div>
    );
};

export default Register