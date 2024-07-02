import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from 'react-bootstrap';


const SmallDormCard = ({ dorm }) => {
    return (
        <Card className="small-dorm-card">
            <Card.Img variant="top" src={dorm.photos[0]} alt="Dorm Image" />
            <Card.Body>
                <Card.Title>{dorm.name}</Card.Title>
                <Card.Text>
                    {dorm.address}, {dorm.city}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <Badge pill bg="primary">
                        {dorm.rating} ★
                    </Badge>
                    <Button variant="primary">View Details</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

SmallDormCard.propTypes = {
    dorm: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default SmallDormCard;
