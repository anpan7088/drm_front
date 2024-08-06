// src/pages/DormReviewManagement.jsx
import { useState, useEffect } from 'react';

// import Container, Button, Table, Form, Row, Col from react-bootstrap
import { Container, Button, Table, Form, Row, Col } from 'react-bootstrap'; 

// import axios instance
import axiosInstance from '../axiosConfig';

// import components
import EditReview from '../components/EditReview';
import Alert from '../components/Alert';

// Dorm Review Management Page
// This page is for managing dorm reviews, including adding, editing, and deleting reviews.
// This page is only accessible to Admin users.
const DormReviewManagement = () => {
    // const { userID, userRole } = useLoginContext();
    const [reviews, setReviews] = useState([]);
    const [alert, setAlert] = useState(null);

    // users and dorms are used to populate the dropdown menus
    const [users, setUsers] = useState([]);
    const [dorms, setDorms] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDorm, setSelectedDorm] = useState('');

    // if editingId is not null, then we are editing a review
    const [editingId, setEditingId] = useState(null);

    // useEffect to fetch reviews, users, and dorms
    useEffect(() => {
        fetchReviews();
        fetchUsers();
        fetchDorms();
    }, []);

    // Fetch reviews from the backend
    // this function is called in the useEffect hook, and it is called every time the component is rendered
    const fetchReviews = async () => {
        try {
            const response = await axiosInstance.get('/reviews'); // get all reviews for dom reviews
            setReviews(response.data);
        } catch (error) {
            setAlert({ message: 'Error fetching reviews', variant: 'danger' });
        }
    };

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/user/profilesAll');
            setUsers(response.data);
        } catch (error) {
            setAlert({ message: 'Error fetching users', variant: 'danger' });
        }
    };

    // Fetch dorms from the backend
    const fetchDorms = async () => {
        try {
            const response = await axiosInstance.get('/dorms');
            setDorms(response.data);
        } catch (error) {
            setAlert({ message: 'Error fetching dorms', variant: 'danger' });
        }
    };

    // Handle delete of review
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/reviews/${id}`);
            setAlert({ message: 'Review deleted successfully', variant: 'success' });
            fetchReviews();
        } catch (error) {
            setAlert({ message: 'Error deleting review: ' + error.response.data.error, variant: 'danger' });
        }
    };

    // Handle filter change
    const handleFilterChange = () => {
        fetchReviews(selectedUser, selectedDorm);
    };

    return (
        <Container>
            <h2>Reviews Management</h2>
            {alert && <Alert variant={alert.variant} onClose={() => setAlert(null)}>{alert.message}</Alert>}
            <Form className="mb-4">
                <Row>
                    <Form.Group as={Col} controlId="formGridUser">
                        <Form.Label>User</Form.Label>
                        <Form.Control as="select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value=''>All Users</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDorm">
                        <Form.Label>Dorm</Form.Label>
                        <Form.Control as="select" value={selectedDorm} onChange={(e) => setSelectedDorm(e.target.value)}>
                            <option value=''>All Dorms</option>
                            {dorms.map((dorm) => (
                                <option key={dorm.id} value={dorm.id}>{dorm.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridButton">
                        <Form.Label>&nbsp;</Form.Label>
                        <Button variant="primary" onClick={handleFilterChange} block>
                            Apply Filters
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Dorm ID</th>
                        <th>User</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td><a href={"/dorm/" + review.dorm_id}>{review.dorm_id}</a></td>
                            <td>{review.username}</td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(review.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {editingId && (
                <EditReview reviewId={editingId} onClose={() => setEditingId(null)} />
            )}
        </Container>
    );
};

export default DormReviewManagement;
