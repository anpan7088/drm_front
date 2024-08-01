// src/components/LoginPopUp.jsx 
import React from 'react';
import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Form, Button, Modal } from 'react-bootstrap';

import Alert from './Alert';   // Import the Alert component
import { useLoginContext } from '../context/loginContext'; // Import the login context

// LoginPopUp component, for login the user
// show is the flag for showing the modal
// handleClose is the function for closing the modal
const LoginPopUp = ({ show, handleClose }) => {
    const { login } = useLoginContext();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(null); // State to handle alert messages
    // const navigate = useNavigate(); // Get the history instance

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
        axiosInstance.post('/auth/login', formData)
            .then((response) => {
                const { token, fullName, role } = response.data;
                login(response.data.id, formData.username, fullName, role, token);
                setMessage(`Login successful: ` + response.data.fullName);
                setAlert({ message: 'Login successful', variant: 'success' });
                // Close modal and navigate after success
                setTimeout(() => {
                    handleClose();
                    // navigate('/');
                }, 2000);
            })
            .catch((error) => {
                setAlert({ message: error.response.data.error, variant: 'danger' });
                console.error(error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {message && <p>{message}</p>}
                    {alert && <Alert message={alert.message} variant={alert.variant} onClose={() => setAlert(null)} />}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

import PropTypes from 'prop-types';
//  prop types for the component
LoginPopUp.propTypes = {
    show: PropTypes.bool.isRequired,  // show flag
    handleClose: PropTypes.func.isRequired // function to close the modal
};

export default LoginPopUp;

