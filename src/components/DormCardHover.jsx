import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge, Image, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DormCardHover = ({ dorm }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dorm/${dorm.id}`);
    };

    return (
        <Card className="dorm-card-hover">
            <Carousel variant="top" className='small-dorm-card-carusel'>
                {dorm.images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <Image 
                            src={`${image}`} 
                            alt={`Dorm Image ${index + 1}`} 
                            fluid 
                            style={{ maxHeight: '160px', objectFit: 'cover' }} 
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
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
                    {dorm.avg_rating ? `${dorm.avg_rating} ★` : 'No Rating'}
                </Badge>
                <Button variant="primary" onClick={handleClick}>View</Button>
            </Card.Footer>
        </Card>
    );
};


DormCardHover.propTypes = {
    dorm: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired,
        lat: PropTypes.number,
        lng: PropTypes.number,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        is_deleted: PropTypes.number.isRequired,
        deleted_at: PropTypes.string,
        baseImageUrl: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
            })
        ).isRequired,
        avg_rating: PropTypes.string,
    }).isRequired,
};

export default DormCardHover;
