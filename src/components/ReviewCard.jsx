// src/components/ReviewCard.jsx
import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Stars from './Stars';
import EditReview from './EditReview';

// ReviewCard component
// review: the review object
// userName: the user name
// userRole: the user role
// onDelete: function to delete the review
// onEdit: function callback to edit the review
const ReviewCard = ({ review, userName, userRole, onDelete, onEdit }) => {
    const [editingId, setEditingId] = useState(null);

    // function to handle edit review
    const handleEdit = (reviewId) => {
        setEditingId(reviewId);
        onEdit(reviewId);
    };

    return (
        <Card className="mb-1">
            <Card.Body className='text-left'>
                <p>{review.comment}</p>
                <small>{review.username} - {review.fullName}</small>
                <Container className="d-flex flex-wrap  justify-content-between">
                    <Stars rating={review.rating} label='Rating' />
                    <Stars rating={review.room_rating} label='Room rating' />
                    <Stars rating={review.location_rating} label='Location rating' />
                    <Stars rating={review.bathroom_rating} label='Bathroom rating' />
                </Container>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
                {(userName === review.username || userRole === 'admin') && // only show delete and edit button for the user who wrote the review or admin
                        <Button variant="danger" onClick={onDelete}>
                            Delete
                        </Button>
                }
                {userName === review.username &&  // only show edit button for the user who wrote the review
                        <Button variant="primary" className="ms-1" onClick={() => handleEdit(review.id)}>
                            Edit
                        </Button>
                }
            </Card.Footer>
            {editingId &&  // only show edit review component when editing the review
                <EditReview reviewId={editingId} onClose={() => setEditingId(null)} />
            }
        </Card>
    );
};

// ReviewCard component props
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
