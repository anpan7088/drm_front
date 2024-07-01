import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const WriteReview = ({ dormId, onClose }) => {
    const [rating, setRating] = useState(0);
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
                    <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </Form.Group>   
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
