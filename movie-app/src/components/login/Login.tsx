import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './logins.scss'
import { Link, useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';



const Login = () => {
    
    const [state, setState] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event: any) =>{
        const {name, value} = event.target;
        setState(({
            ...state,
            [name]: value
        }));
    }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        console.log('state', state)
        sendDataToServer();
    }

    const sendDataToServer = (): void =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: state.username, password: state.password })
        };
        fetch('http://localhost:8080/auth/login', requestOptions)
            .then(async response => {
                const data = await response.json();
                console.log('User successfully created', data);
                setState({
                    username: '',
                    password: '',
                });
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
    <div className="login">
        <h2 className="heading">Log In</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" name="username" value={state.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" name="password" value={state.password} onChange={handleChange} />
            </Form.Group>
            <div className="submit-section">
                <Button variant="dark" type="submit">Login</Button>
            </div>
            <div className="mt-4">
                Don't have an account? <Link className="link" to={"/register"}>Register here</Link>!
            </div>
        </Form>
    </div>
    );
};

export default Login