// ReviewCard.js
import React, { useState } from 'react';
import { ListGroup, Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axiosInstance from '../axiosConfig';

const ReviewCard = ({ review, userName, userRole, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(review.comment);

    const handlePatchReview = async () => {
        try {
            await axiosInstance.patch(`/reviews/${review.id}`, { comment: editedComment });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    return (
        <Card className=" justify-content-between align-items-center">
            <Card.Body>
                {isEditing ? (
                    <Form>
                        <Form.Group controlId="formComment">
                            <Form.Control
                                type="text"
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                ) : (
                    <>
                        <p>{review.comment}</p>
                        <small>{review.username} - {review.fullName}</small>
                    </>
                )}
            </Card.Body>
            <Card.Footer className='d-flex justify-content-between align-items-end'>
                {(userName === review.username || userRole === 'admin') && (
                    <Button variant="danger" className="mr-2" onClick={onDelete}>
                        Delete
                    </Button>
                )}
                {userName === review.username && (
                    <>
                        {isEditing ? (
                            <>
                                <Button variant="success" className="mr-2" onClick={handlePatchReview}>
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                        )}
                    </>
                )}
            </Card.Footer>
        </Card>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.shape({
        comment: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
    }).isRequired,
    userName: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ReviewCard;

