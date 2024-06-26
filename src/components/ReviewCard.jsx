// ReviewCard.js
import React, { useState } from 'react';
import { ListGroup, Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axiosInstance from '../axiosConfig';

const ReviewCard = ({ review, userName, userRole, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(review.comment);

    const handlePatchReview = async () => {
        try {
            await axiosInstance.patch(`/reviews/${review.id}`, { comment: editedComment });
            setIsEditing(false);
            onEdit();
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    return (
        <Card className="mb-1">
            <Card.Body className='text-left'>   
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
            <Card.Footer className="d-flex justify-content-end">
                {( (userName === review.username || userRole === 'admin') && !isEditing ) && (
                    <Button variant="danger"  onClick={onDelete}>
                        Delete
                    </Button>
                )}
                {userName === review.username && (
                    <>
                        {isEditing ? (
                            <>
                                <Button variant="success" className="ms-1" onClick={handlePatchReview}>
                                    Save
                                </Button>
                                <Button variant="secondary" className="ms-1"  onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" className="ms-1"  onClick={() => setIsEditing(true)}>
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
    onEdit: PropTypes.func.isRequired,
};

export default ReviewCard;

