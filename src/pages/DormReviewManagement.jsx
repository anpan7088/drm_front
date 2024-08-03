// src/pages/DormReviewManagement.jsx
import { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

// import axios instance
import axiosInstance from '../axiosConfig';

// import components
import { useLoginContext } from '../context/loginContext';
import EditReview from '../components/EditReview';

// Dorm Review Management Page
// This page is for managing dorm reviews, including adding, editing, and deleting reviews.
// This page is only accessible to Admin users.
const DormReviewManagement = () => {
    const { userID } = useLoginContext();
    const [reviews, setReviews] = useState([]);
    // if editingId is not null, then we are editing a review
    const [editingId, setEditingId] = useState(null);

    // useEffect to fetch reviews from the backend
    useEffect(() => {
        fetchReviews();
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

    return (
        <Container>
            <h2>Reviews Management</h2>
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
                                <Button variant="warning" onClick={() => setEditingId(review.id)}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(review.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            { editingId && (
                <EditReview reviewId={editingId} onClose={() => setEditingId(null)} />
            )}
        </Container>
    );
};

export default DormReviewManagement;
