import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

// Write a review for a dorm
// TODO: Add validation
const WriteReview = ({ dormId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [room_rating, setRoomRating] = useState(0);
    const [location_rating, setLocationRating] = useState(0);
    const [bathroom_rating, setBathroomRating] = useState(0);
    const [comment, setComment] = useState();

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log('New rating:', newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/reviews', {
                dorm_id: dormId,
                rating: rating,
                room_rating: room_rating,
                location_rating: location_rating,
                bathroom_rating: bathroom_rating,
                comment: comment,
            });
            
            onClose();
        } catch (error) {
            console.error('Error submitting review', error);
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Write a Review</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <StarRating label='Rating' rating={rating} onRatingChange={handleRatingChange} />
                    <StarRating label='Room Rating' rating={room_rating} onRatingChange={setRoomRating} />
                    <StarRating label='Location Rating' rating={location_rating} onRatingChange={setLocationRating} />
                    <StarRating label='Bathroom Rating' rating={bathroom_rating} onRatingChange={setBathroomRating} />
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
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    );
};

WriteReview.propTypes = {
    dormId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default WriteReview;
