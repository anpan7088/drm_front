import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge, Image, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SmallDormCardCarusel = ({ dorm }) => {
    // hook from react router v6
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dorm/${dorm.id}`);
    };

    return (
        <Card className="small-dorm-card-carusel">
            <Carousel>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Carousel className='small-dorm-card-carusel'>
                {dorm.images.map((image) => (
                    <Carousel.Item>
                        <Image src={image.url} alt="First slide" style={{height: '300px'}} />
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
                    {dorm.avg_rating} ★
                </Badge>
                <Button variant="primary" onClick={handleClick}>View</Button>
            </Card.Footer>
        </Card>
    );
};

SmallDormCardCarusel.propTypes = {
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

export default SmallDormCardCarusel;
