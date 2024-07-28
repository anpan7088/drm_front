import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge, Image, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useMousePosition from '../hooks/useMousePosition';


const DormCardHover = ({ dorm }) => {
    // starting position with negative values to avoid flickering at the start
    const mousePosition = useMousePosition({ x: -1000, y: -1000 });
    const navigate = useNavigate();

    return (
        <Card className="dorm-card-hover"
            style={{
                position: 'absolute',
                top: `${mousePosition.y}px`,
                left: `${mousePosition.x}px`,
                zIndex: 1000,
                width: '300px',
                pointerEvents: 'none' // Makes the card non-interactive
            }}
        >
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
        </Card>
    );
};


DormCardHover.propTypes = {
    dorm: PropTypes.object.isRequired
};

export default DormCardHover;
