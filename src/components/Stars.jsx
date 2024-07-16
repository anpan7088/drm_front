import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Stars = ({ totalStars = 5, rating = 0, label = '' }) => {

    return (
        <div className="stars-container">
            {label && <label className="stars-rating-label">{label}</label>}
            <div className="stars-array">
                {Array.from({ length: totalStars }, (_, index) => (
                    <Star
                        key={index}
                        filled={index < rating}
                    />
                ))}
            </div>
        </div>
    );
};

// character for a star and othe symbols can be findet here:
// https://www.w3schools.com/charsets/ref_html_symbols.asp
const Star = ({ filled, onClick }) => (
    <span className={`stars ${filled ? 'filled' : ''}`} >
        &#9733;
    </span>
);

Stars.propTypes = {
    totalStars: PropTypes.number,
    rating: PropTypes.number,
    label: PropTypes.string,
};


export default Stars;
