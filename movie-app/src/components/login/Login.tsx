import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './logins.scss'
import { Link } from "react-router-dom";


const Login = () => {
    
    const [state, setState] = useState({
        username: '',
        password: ''
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
    <div className="login">
        <h2 className="heading">Login Page</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" name="username" value={state.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" name="password" value={state.password} onChange={handleChange} />
            </Form.Group>
            <Button variant="dark" type="submit">Login</Button>
            <div className="mt-2">
                Don't have an account? <Link to={"/register"}>Register here</Link>!
            </div>
        </Form>
    </div>
    );
};

export default Login