import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
// import ReactJson from 'react-json-view'


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


ImageCarusel.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ImageCarusel;
