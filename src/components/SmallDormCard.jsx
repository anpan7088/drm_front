import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MapsButton from './MapsButton';


const SmallDormCard = ({ dorm }) => {
    // hook from react router v6
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dorm/${dorm.id}`);
    };

    return (
        <Card className="small-dorm-card">
            <Card.Img className="small-dorm-card-img" style={{height: '300px'}} variant="top" src={dorm.images[0].url} alt="Dorm Image" onClick={handleClick}/>
            {/* <ReactJson src={dorm} /> */}
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

SmallDormCard.propTypes = {
    dorm: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        review_count: PropTypes.number.isRequired,
        avg_score: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
                title: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default SmallDormCard;
