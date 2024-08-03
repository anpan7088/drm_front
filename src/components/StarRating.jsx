// src/components/ReviewCard.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const totalStars = 5;

// Star rating component
// props: totalStars - number of stars, initialRating - initial rating, onRatingChange - callback function to handle rating change, label - label for the rating
const StarRating = ({ label = '', initialRating = 0 , onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);

    // update rating when initialRating changes, litle bit hacky but it works
    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

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
