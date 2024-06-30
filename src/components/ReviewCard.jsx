// ReviewCard.js
import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import WriteReview from './WriteReview';

const ReviewCard = ({ review, userName, userRole, onDelete, onEdit }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleWriteReview = () => {
        setShowReviewForm(true);
    };

    const handleCloseReviewForm = () => {
        setShowReviewForm(false);
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>
                <p>{review.comment}</p>
                <small>{review.username} - {review.fullName}</small>
            </div>
            <div className="ml-auto">
                {(userName === review.username || userRole === 'admin') && (
                    <Button variant="danger" className="mr-2" onClick={onDelete}>
                        Delete
                    </Button>
                )}
                {userName === review.username && (
                    <Button variant="primary" onClick={handleWriteReview}>
                        Edit
                    </Button>
                )}
            </div>
            {showReviewForm && (
                <WriteReview reviewId={review.id} onClose={handleCloseReviewForm} />
            )}
        </ListGroup.Item>
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
