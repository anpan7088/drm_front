// src/components/DormCard.jsx
import React, { useState, useEffect } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import axiosInstance from '../axiosConfig';
import WriteReview from './WriteReview';
import PropTypes from 'prop-types';

import DormReviews from './DormReviews';
import LocationButton from './MapsButton';

// component for the dorm card, this is the maiin component for large dorm card
// with images carousel and dorm reviews
// dormID is the dorm id
const DormCard = ({ dormID }) => {
    const [dorm, setDorm] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [photosBaseUrl, setPhotosBaseUrl] = useState('');
    const [refresh, setRefresh] = useState(false);

    // useEffect hook to fetch dorm details and photos
    // this is called when the dormID changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dormResponse = await axiosInstance.get(`/dorms/${dormID}`);
                setDorm(dormResponse.data);

                const photosResponse = await axiosInstance.get(`/dorms/${dormID}/images`);
                setPhotos(photosResponse.data.data);
                setPhotosBaseUrl(photosResponse.data.baseUrl);
            } catch (error) {
                console.error('Error fetching dorm details:', error);
            }
        };

        fetchData();
    }, [dormID]);

    // function to handle writing review
    const handleWriteReview = () => {
        setShowReviewForm(true);
    };

    // function to handle closing review form
    const handleCloseReviewForm = () => {
        setShowReviewForm(false);
        setRefresh(!refresh);
    };

    return (
        <Card>
            {dorm && (
                <>
                    <Card.Header>
                        <Card.Title>{dormID} - {dorm.name}</Card.Title>
                        <Card.Subtitle>{dorm.city}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{dorm.address}</Card.Text>

                        {photos.length > 0 && (
                            <Carousel>
                                {photos.map((photo, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100 carousel-image"
                                            src={photosBaseUrl + photo.url}
                                            alt={`Dorm photo ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                        <DormReviews dormID={dormID} refresh={refresh} />
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={handleWriteReview}>
                            Write a Review
                        </Button>
                        {/* Show location button if lat and lng are present */}
                        { dorm.lat && dorm.lng && 
                            <LocationButton location={{ lat: dorm.lat, lng: dorm.lng }} title={"Location"} /> 
                        }
                    </Card.Footer>
                </>
            )}
            {showReviewForm && (
                <WriteReview dormId={dormID} onClose={handleCloseReviewForm} />
            )}
        </Card>
    );
};

// Prop types for the component
DormCard.propTypes = {
    dormID: PropTypes.number,  // Assuming dormID is a number
};
export default DormCard;
