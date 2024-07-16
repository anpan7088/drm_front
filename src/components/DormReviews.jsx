// DormReviews.js
import { ListGroup, Button } from 'react-bootstrap';
import { useLoginContext } from '../context/loginContext';
import { useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';

const DormReviews = ({ dormID, refresh  }) => {
    const { userName, userRole } = useLoginContext();

    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const reviewsResponse = await axiosInstance.get(`/dorms/${dormID}/reviews`);
            setReviews(reviewsResponse.data.list);
            
        } catch (error) {
            console.error('Error fetching dorm details:', error);
        }
    };

    useMemo(() => {
        fetchReviews();
        console.log(`Fetch reviews for dorm ${dormID}`);
    }, [refresh, dormID]);

    const handleDelete = async (reviewId) => {
        try {
            axiosInstance.delete(`/reviews/${reviewId}`);
            setReviews(reviews.filter((review) => review.id!== reviewId));
            console.log(`Delete review ${reviewId}`);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <ListGroup>
            {reviews.map((review, index) => (
                <ReviewCard
                    key={index}
                    review={review}
                    userName={userName}
                    userRole={userRole}
                    onDelete={() => handleDelete(review.id)}
                    onEdit={() => fetchReviews()}
                />
            ))}
        </ListGroup>
    );
};

DormReviews.propTypes = {
    dormID: PropTypes.number.isRequired,
    refresh: PropTypes.bool.isRequired
};
    
export default DormReviews;