import { useState, useMemo } from 'react';
import { Card, Carousel, ListGroup, Button } from 'react-bootstrap';
import axiosInstance from '../axiosConfig';
import WriteReview from './WriteReview';
import PropTypes from 'prop-types';
import DormReviews from './DormReviews';

import '../scss/DormCard.scss';

const DormCard = ({ dormID }) => {
    const [dorm, setDorm] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [photosBaseUrl, setPhotosBaseUrl] = useState('');

    useMemo(async () => {
        try {
            const dormResponse = await axiosInstance.get(`/dorms/${dormID}`);
            setDorm(dormResponse.data);

            const photosResponse = await axiosInstance.get(`/dorms/${dormID}/images`);
            setPhotos(photosResponse.data.data);
            setPhotosBaseUrl(photosResponse.data.baseUrl);

        } catch (error) {
            console.error('Error fetching dorm details:', error);
        }
    }, [dormID]);


    const handleWriteReview = () => {
        setShowReviewForm(true);
    };

    const handleCloseReviewForm = () => {
        setShowReviewForm(false);
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
                        {/* <ReactJson src={reviews} /> */}
                        <DormReviews dormID={dormID} />
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={handleWriteReview}>
                            Write a Review
                        </Button>
                    </Card.Footer>
                </>
            )}
            {showReviewForm && (
                <WriteReview dormId={dormID} onClose={handleCloseReviewForm} />
            )}
        </Card>
    );
};

DormCard.propTypes = {
    dormID: PropTypes.number,
};
export default DormCard;
