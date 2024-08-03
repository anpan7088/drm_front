// src/components/EditReview.jsx
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

// Edit a review for a dorm
// this could be a part of the WriteReview component, but for now it's separate component
// props: reviewId - id of the review to edit
// props: onClose - function to call when the review is submitted
const EditReview = ({ reviewId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [room_rating, setRoomRating] = useState(0);
    const [location_rating, setLocationRating] = useState(0);
    const [bathroom_rating, setBathroomRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        // Fetch the existing review data
        const fetchReview = async () => {
            try {
                const response = await axiosInstance.get(`/reviews/${reviewId}`);
                const review = response.data;
                setRating(review.rating);
                setRoomRating(review.room_rating);
                setLocationRating(review.location_rating);
                setBathroomRating(review.bathroom_rating);
                setComment(review.comment);
            } catch (error) {
                console.error('Error fetching review', error);
            }
        };

        fetchReview();
    }, [reviewId]);

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.patch(`/reviews/${reviewId}`, {
                rating: rating,
                room_rating: room_rating,
                location_rating: location_rating,
                bathroom_rating: bathroom_rating,
                comment: comment,
            });

            onClose();
        } catch (error) {
            console.error('Error updating review', error);
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Review</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <StarRating label='Rating' initialRating={rating} onRatingChange={setRating} />
                    <StarRating label='Room Rating' initialRating={room_rating} onRatingChange={setRoomRating} />
                    <StarRating label='Location Rating' initialRating={location_rating} onRatingChange={setLocationRating} />
                    <StarRating label='Bathroom Rating' initialRating={bathroom_rating} onRatingChange={setBathroomRating} />
                    <Form.Group controlId="formComment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='col'>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

// prop types for the component
EditReview.propTypes = {
    reviewId: PropTypes.number.isRequired, // id of the review to edit
    onClose: PropTypes.func.isRequired, // function to call when the review is submitted
};

export default EditReview;
