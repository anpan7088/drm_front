import { ListGroup, Button } from 'react-bootstrap';
import { useLoginContext } from '../context/loginContext';
import { useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import WriteReview from './WriteReview';
import PropTypes from 'prop-types';

const DormReviews = ({ dormID  }) => {
    const { userName, userRole } = useLoginContext();

    const [reviews, setReviews] = useState([]);

    useMemo(async () => {
        try {
            const reviewsResponse = await axiosInstance.get(`/dorms/${dormID}/reviews`);
            setReviews(reviewsResponse.data.list);
        } catch (error) {
            console.error('Error fetching dorm details:', error);
        }
    }, []);


    return (
        <ListGroup>
            {reviews.map((review, index) => (
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
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

DormReviews.propTypes = {
    dormID: PropTypes.number.isRequired
};
    
export default DormReviews;