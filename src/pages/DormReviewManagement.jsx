import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Form, Button, Table } from 'react-bootstrap';

import Alert from '../components/Alert';
import { useLoginContext } from '../context/loginContext';

const DormReviewManagement = () => {
    const { userID } = useLoginContext();
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        dorm_id: '',
        rating: '',
        comment: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axiosInstance.get('/reviews');
            setReviews(response.data);
        } catch (error) {
            setAlert({ message: 'Error fetching reviews', variant: 'danger' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axiosInstance.patch(`/reviews/${editingId}`, formData);
                setAlert({ message: 'Review updated successfully', variant: 'success' });
            } else {
                await axiosInstance.post('/reviews', { ...formData, user_id: userID });
                setAlert({ message: 'Review added successfully', variant: 'success' });
            }
            fetchReviews();
            setFormData({ dorm_id: '', rating: '', comment: '' });
            setEditingId(null);
        } catch (error) {
            setAlert({ message: 'Error saving review: ' + error.response.data.error, variant: 'danger' });
        }
    };

    const handleEdit = (review) => {
        setFormData({ dorm_id: review.dorm_id, rating: review.rating, comment: review.comment });
        setEditingId(review.id);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/reviews/${id}`);
            setAlert({ message: 'Review deleted successfully', variant: 'success' });
            fetchReviews();
        } catch (error) {
            setAlert({ message: 'Error deleting review: ' + error.response.data.error, variant: 'danger' });
        }
    };

    return (
        <Container>
            <h2>Reviews Management</h2>
            {alert && <Alert message={alert.message} variant={alert.variant} onClose={() => setAlert(null)} />}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDormId">
                    <Form.Label>Dorm ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="dorm_id"
                        value={formData.dorm_id}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formRating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formComment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {editingId ? 'Update Review' : 'Add Review'}
                </Button>
            </Form>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Dorm ID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td>{review.dorm_id}</td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(review)}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(review.id)}>
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

export default DormReviewManagement;
