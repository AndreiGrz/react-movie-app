import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './register.scss'
import { Link, useNavigate } from "react-router-dom";

type RegistrationForm = {
    username: string;
    password: string;
    passwordConfirmation: string;
}
interface ErrorsModel {
    username?: string;
    password?: string;
    passwordConfirmation?: string;
}
const initialFormState: RegistrationForm = {
    username: '',
    password: '',
    passwordConfirmation: ''
};

const Register = () => {
    const [form, setForm] = useState<RegistrationForm>(initialFormState);
    const [errors, setErrors] = useState<ErrorsModel>({});
    const navigate = useNavigate();
    
    const setField = (field: keyof RegistrationForm, value: any) =>{
        setForm({
            ...form,
            [field]: value
        })
        
        if(!!errors[field]){
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

    const validateForm = () =>{
        const newErrors: any = {};

        if(!form.username || form.username === ''){
            newErrors.username = 'Please fill in a username!'
        } else if(form.username && form.username.length < 4){
            newErrors.username = 'Username must have at least 4 characters'
        }

        if(!form.password || form.password === ''){
            newErrors.password = 'Please fill in a password!'
        } else{
            const passRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).+$/;
            if (!passRegex.test(form.password)) {
                newErrors.password = 'Password must contain at least one number, one capital letter, and one symbol!';
            }
        }

        if(form.password && (!form.passwordConfirmation || form.passwordConfirmation === '')){
            newErrors.passwordConfirmation = 'Please confirm your password!'
        } 
        
        if (form.password !== form.passwordConfirmation) {
            newErrors.passwordConfirmation = 'Your passwords don\'t match. Please try again.';
        }

        return newErrors;

    }

    const handleSubmit = (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        const formErrors = validateForm();
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors);
        }else{
            console.log("Form submitted!");
            console.log(form);
            sendDataToServer();

        }
    }
    
    const sendDataToServer = (): void => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: form.username, password: form.password })
        };
        fetch('http://localhost:8080/auth/signup', requestOptions)
            .then(async response => {
                const data = await response.json();
                console.log('User successfully created', data);
                setForm({
                    username: '',
                    password: '',
                    passwordConfirmation: ''
                });
                navigate('/login');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
    <div className="register">
        <h2 className="heading">Create an Account</h2>
        <Form>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                 type="text"
                 placeholder="Enter your username" 
                 name='username'
                 value={form.username}
                 onChange={(e) => setField('username', e.target.value)}
                 isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                 type="password" 
                 placeholder="Enter your password" 
                 name='password'
                 value={form.password}
                 onChange={(e) => setField('password', e.target.value)}
                 isInvalid={!!errors.password}
                />
            <Form.Control.Feedback type="invalid">
                {errors.password}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                 type="password" 
                 placeholder="Confirm your password" 
                 name='passwordConfirmation'
                 value={form.passwordConfirmation}
                 onChange={(e) => setField('passwordConfirmation', e.target.value)}
                 isInvalid={!!errors.passwordConfirmation}
                />
            <Form.Control.Feedback type="invalid">
                {errors.passwordConfirmation}
            </Form.Control.Feedback>
            </Form.Group>
            <div className="submit-section">
                <Button variant="dark" type="submit" onClick={handleSubmit}>Register</Button>
            </div>
            <div className="mt-4">
                Already have an account? <Link className="link" to={"/login"}>Login here</Link>!
            </div>
        </Form>
    </div>
    );
};

export default Register