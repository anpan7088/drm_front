// src/components/DormReviews.
import { ListGroup, Button } from 'react-bootstrap';
import { useLoginContext } from '../context/loginContext';
import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';

// component for the dorm reviews list
// dormID is the dorm id
// refresh is the refresh flag, for refreshing the reviews
const DormReviews = ({ dormID, refresh  }) => {
    const { userName, userRole } = useLoginContext();
    const [reviews, setReviews] = useState([]);

    // useEffect hook to fetch reviews from the api
    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const reviewsResponse = await axiosInstance.get(`/dorms/${dormID}/reviews`);
                setReviews(reviewsResponse.data.list);
                
            } catch (error) {
                console.error('Error fetching dorm details:', error);
            }
        };

        fetchReviews();
    }, [refresh, dormID]);

    // function to handle delete review
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

// prop types for the component
DormReviews.propTypes = {
    dormID: PropTypes.number.isRequired,    // dorm id
    refresh: PropTypes.bool.isRequired      // refresh flag
};
    
export default DormReviews;