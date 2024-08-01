// src/components/Register.jsx
import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Form, Button, Container } from 'react-bootstrap';


// Register component
// component for registering a new user
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/auth/register', formData)
            .then((response) => {
                setMessage('User registered successfully');
                console.log(response);
            })
            .catch((error) => {
                setMessage('Error registering user');
                console.error(error);
            });
    };

    return (
        <Container>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
