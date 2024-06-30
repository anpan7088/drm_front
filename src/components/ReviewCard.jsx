// ReviewCard.js
import React, { useState } from 'react';
import { ListGroup, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ReviewCard = ({ review, userName, userRole, onDelete }) => {

    const handleEditReview = () => {
        // implement edit hear
    };

    return (
            <Card className=" justify-content-between align-items-center">
                <Card.Body>
                    <p>{review.comment}</p>
                    <small>{review.username} - {review.fullName}</small>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between align-items-end'>
                    {(userName === review.username || userRole === 'admin') && (
                        <Button variant="danger" className="mr-2" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                    {userName === review.username && (
                        <Button variant="primary" onClick={handleEditReview}>
                            Edit
                        </Button>
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

