import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import useTimeoutState from '../hooks/useTimeoutState';

const UserProfile = () => {
    // defined in src/hooks/useTimeoutState.jsx
    const [showPassword, setShowPassword] = useTimeoutState(false, 3000);
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: '',
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        address: '',
        city: '',
        country: ''
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get('/user/profile');
            setProfile(response.data);
            setFormData({
                username: response.data.username,
                password: response.data.password,
                role: response.data.role || 'user',
                firstName: response.data.firstName || '',
                lastName: response.data.lastName || '',
                email: response.data.email,
                age: response.data.age || '',
                address: response.data.address || '',
                city: response.data.city || '',
                country: response.data.country || ''
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            await axiosInstance.patch('/user/profile', formData);
            setProfile(formData);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: profile.username,
            password: profile.password,
            role: profile.role,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            age: profile.age,
            address: profile.address,
            city: profile.city,
            country: profile.country
        });
        setEditMode(false);
    };

    return (
        <Container>
            <h2>User Profile</h2>
            {profile ? (
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        readOnly={!editMode}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            readOnly={!editMode}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    readOnly={true}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            readOnly={!editMode}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    {editMode ? (
                        <div className="mt-3">
                            <Button variant="primary" onClick={handleSave}>
                                Save
                            </Button>{' '}
                            <Button variant="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button variant="warning" className="mt-3" onClick={() => setEditMode(true)}>
                            Edit
                        </Button>
                    )}
                </Form>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default UserProfile;
