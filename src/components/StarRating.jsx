import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ totalStars = 5, initialRating = 0 , onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (index) => {
        setRating(index + 1);
        if (onRatingChange) {
            onRatingChange(index + 1);
        }
    };

    return (
        <div className="star-rating">
            {Array.from({ length: totalStars }, (_, index) => (
                <Star 
                    key={index}
                    filled={index < rating}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

const Star = ({ filled, onClick }) => (
    <span className={`star ${filled ? 'filled' : ''}`} onClick={onClick}>
        &#9733;
    </span>
);

StarRating.propTypes = {
    totalStars: PropTypes.number,
    initialRating: PropTypes.number,
    onRatingChange: PropTypes.func,
};

Star.propTypes = {
    filled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default StarRating;
