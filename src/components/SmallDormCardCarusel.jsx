// src/components/LoginPopUp.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge, Image, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// dorm card with carusel of images component
// props: dorm - dorm object
const SmallDormCardCarusel = ({ dorm }) => {
    // hook from react router v6
    const navigate = useNavigate();

    // handle click on button "view dorm"
    const handleClick = () => {
        navigate(`/dorm/${dorm.id}`);
    };

    return (
        <Card className="small-dorm-card-carusel">
            <Carousel>
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

// prop types for the component
SmallDormCardCarusel.propTypes = {
    dorm: PropTypes.shape({         // dorm object
        id: PropTypes.number.isRequired,  // dorm id
        name: PropTypes.string.isRequired, //   dorm name
        address: PropTypes.string.isRequired, // dorm address
        city: PropTypes.string.isRequired,      // dorm city
        review_count: PropTypes.number.isRequired, // review count
        avg_score: PropTypes.string.isRequired,   // average score
        images: PropTypes.arrayOf(          // dorm images
            PropTypes.shape({          // image object
                id: PropTypes.number.isRequired, // image id
                url: PropTypes.string.isRequired, // image url
                title: PropTypes.string, // image title
            })
        ).isRequired,  // dorm images array is required, as an array of image objects
    }).isRequired,  /// dorm object is required
};

export default SmallDormCardCarusel;
