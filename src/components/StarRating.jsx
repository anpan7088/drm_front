// src/components/ReviewCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Star rating component
// props: totalStars - number of stars, initialRating - initial rating, onRatingChange - callback function to handle rating change, label - label for the rating
const StarRating = ({ totalStars = 5, initialRating = 0, onRatingChange, label = '' }) => {
    const [rating, setRating] = useState(initialRating);

    // handle click on star
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

// prop types for the component
StarRating.propTypes = {
    totalStars: PropTypes.number, // number of stars
    initialRating: PropTypes.number, // initial rating
    onRatingChange: PropTypes.func, // callback function to handle rating change
    label: PropTypes.string, // label for the rating
};

// prop types for the star component
Star.propTypes = {
    filled: PropTypes.bool.isRequired,  // is star filled
    onClick: PropTypes.func.isRequired, // click handler
};

export default StarRating;
