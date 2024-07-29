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
                pointerEvents: 'none' // Makes the card non-interactive
            }}
        >
            <Card.Img className="card-img"
                variant="top"
                src={`${dorm.images[0]}`}
                alt="Dorm Image"
            />
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
