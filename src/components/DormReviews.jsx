// DormReviews.js
import { ListGroup, Button } from 'react-bootstrap';
import { useLoginContext } from '../context/loginContext';
import { useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';

const DormReviews = ({ dormID  }) => {
    const { userName, userRole } = useLoginContext();

    const [reviews, setReviews] = useState([]);

    useMemo(async () => {
        try {
            const reviewsResponse = await axiosInstance.get(`/dorms/${dormID}/reviews`);
            setReviews(reviewsResponse.data.list);
        } catch (error) {
            console.error('Error fetching dorm revies list:', error);
        }
    }, []);

    const handleDelete = async (reviewId) => {
        try {
            axiosInstance.delete(`/reviews/${reviewId}`);
            setReviews(reviews.filter((review) => review.id!== reviewId));
            console.log(`Delete review ${reviewId}`);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleEdit = (reviewId) => {
        // Implement edit logic here
        console.log(`Edit review ${reviewId}`);
    };

    return (
        <ListGroup>
            <ListGroup>
            {reviews.map((review, index) => (
                <ReviewCard
                    key={index}
                    review={review}
                    userName={userName}
                    userRole={userRole}
                    onDelete={() => handleDelete(review.id)}
                    onEdit={() => handleEdit(review.id)}
                />
            ))}
            </ListGroup>
            {/* {reviews.map((review, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                    <div>
                        <p>{review.comment}</p>
                        <small>{review.username} - {review.fullName}</small>
                    </div>
                    <div className="ml-auto">
                        { (userName === review.username || userRole === 'admin') && (
                            <Button variant="danger" className="mr-2" onClick={() => {}}>
                                Delete
                            </Button>
                        )}
                        { (userName === review.username ) && (
                            <Button variant="primary" onClick={() => {}}>
                                Edit
                            </Button>
                        )}
                    </div>
                </ListGroup.Item> */}
        </ListGroup>
    );
};

DormReviews.propTypes = {
    dormID: PropTypes.number.isRequired
};
    
export default DormReviews;