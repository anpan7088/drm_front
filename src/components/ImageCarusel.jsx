// src/components/ImageCarusel.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';


// component for the image carusel
const ImageCarusel = ({ images }) => {

    return (
        <Carousel className="small-dorm-card-img" variant="top" alt="Dorm Image" >
            {images.map((photo, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 carousel-image"
                        src={photo.url}
                        alt={`Dorm photo ${index + 1}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

// prop types for the component
ImageCarusel.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired, // URL of the image
        })
    ).isRequired,
};

export default ImageCarusel;
