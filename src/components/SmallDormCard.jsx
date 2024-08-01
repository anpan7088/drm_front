// src/components/SmallDormCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MapsButton from './MapsButton';

// SmallDormCard component
// dorm: the dorm object
// component for displaying a small dorm card
const SmallDormCard = ({ dorm }) => {
    // hook from react router v6
    const navigate = useNavigate();

    // handleClick function to navigate to the dorm page (large DormCard)
    const handleClick = () => {
        navigate(`/dorm/${dorm.id}`);
    };

    return (
        <Card className="small-dorm-card">
            { dorm.images[0] &&
                <Card.Img className="small-dorm-card-img" style={{height: '300px'}} variant="top" src={dorm.images[0].url} alt="Dorm Image" onClick={handleClick}/>
            }
            <Card.Body>
                <Card.Title>{dorm.name}</Card.Title>
                <Card.Text>
                    {dorm.address}
                    <br />
                    {dorm.city}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
                <Badge pill bg="primary">
                    {dorm.avg_rating} ★
                </Badge>
                <MapsButton location={{ lat: dorm.lat, lng: dorm.lng }} title={"OnMap"} />
                <Button variant="primary" onClick={handleClick}>View</Button>
            </Card.Footer>
        </Card>
    );
};

// propTypes for the SmallDormCard component
SmallDormCard.propTypes = {
    dorm: PropTypes.shape({ // dorm object
        id: PropTypes.number.isRequired, // id of the dorm
        name: PropTypes.string.isRequired, // name of the dorm
        address: PropTypes.string.isRequired,// address of the dorm
        city: PropTypes.string.isRequired, // city of the dorm
        review_count: PropTypes.number.isRequired, // number of reviews for the dorm
        avg_score: PropTypes.string.isRequired, // average score of the dorm
        images: PropTypes.arrayOf(              // array of images
            PropTypes.shape({                // image object
                id: PropTypes.number.isRequired, // id of the image
                url: PropTypes.string.isRequired, // url of the image
                title: PropTypes.string,            
            })
        ).isRequired,
    }).isRequired,
};

export default SmallDormCard;
