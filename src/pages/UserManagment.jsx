// src/pages/UserManagment.jsx
//import React libraries
import { useState, useEffect } from 'react';
import { Container, Button, Table } from 'react-bootstrap';

// import axios instance, which is used to make api calls
import axiosInstance from '../axiosConfig';

// import components
import Alert from '../components/Alert';

const UserManagment = () => {
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState(null);

    // useEffect to fetch users from the backend
    useEffect(() => {
        fetchUsers();
    });

    // fetch users from the backend and set the users state
    const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/user/profilesAll');
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                setAlert({ message: 'Error fetching users', variant: 'danger' });
            }
    };

    // delete user from the backend and update the users state
    const deleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`/user/profile/${userId}`);
            setUsers(users.filter((user) => user.id !== userId));
            setAlert({ message: 'User deleted successfully', variant: 'success' });
        }
        catch (error) {
            setAlert({ message: 'Error deleting user', variant: 'danger' });
        }
    };

    // edit user 
    const editUser = async (userId) => {
        // navigate to the edit user page
        // 
    };

    return (
        <Container>
            <h1>User Managment</h1>
            {alert && <Alert variant={alert.variant} message={alert.message} />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button onClick={() => editUser(user.id)}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => deleteUser(user.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );

};


export default UserManagment;