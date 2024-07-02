import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from 'react-bootstrap';
// import ReactJson from 'react-json-view'


const SmallDormCard = ({ dorm }) => {
    return (
        <Card className="small-dorm-card">
            <Card.Img variant="top" src={dorm.images[0].url} alt="Dorm Image" />
            {/* <ReactJson src={dorm} /> */}
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
        avg_rating: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default SmallDormCard;
