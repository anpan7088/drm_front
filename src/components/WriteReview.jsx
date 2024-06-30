import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


const WriteReview = ({ dormId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

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
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

WriteReview.propTypes = {
    dormId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default WriteReview;
