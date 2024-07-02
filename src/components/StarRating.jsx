import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ totalStars = 5, initialRating = 0, onRatingChange, label = '' }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (index) => {
        setRating(index + 1);
        if (onRatingChange) {
            onRatingChange(index + 1);
        }
    };

    return (
        <div className="star-rating">
            {label && <label className="star-rating-label">{label}</label>}
            <div className="stars-array">
                {Array.from({ length: totalStars }, (_, index) => (
                    <Star
                        key={index}
                        filled={index < rating}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

// character for a star and othe symbols can be findet here:
// https://www.w3schools.com/charsets/ref_html_symbols.asp
const Star = ({ filled, onClick }) => (
    <span className={`star ${filled ? 'filled' : ''}`} onClick={onClick}>
        &#9733;
    </span>
);

StarRating.propTypes = {
    totalStars: PropTypes.number,
    initialRating: PropTypes.number,
    onRatingChange: PropTypes.func,
    label: PropTypes.string,
};

Star.propTypes = {
    filled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default StarRating;
