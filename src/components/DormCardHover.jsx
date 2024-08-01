// src/components/DormCardHover.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import useMousePosition from '../hooks/useMousePosition';
import useWindowSize from '../hooks/useWindowSize';

// this is a hovered dorm card for overlay on the map
// it is used to display the dorm info on the map when the user hovers over the marker
const DormCardHover = ({ dorm }) => {
    const cardRef = useRef(null);
    const [cardSize, setCardSize] = useState({ width: 300, height: 300 });
    // starting position with negative values to avoid flickering at the start
    const mouseCord = useMousePosition({ x: -1000, y: -1000 });
    const winSize = useWindowSize();  // window size used to avoid to card popup over the window
    const [ cordX, setCordX ] = useState( mouseCord.x);
    const [ cordY, setCordY ] = useState( mouseCord.y);

    // function to update the card size on window resize
    const updateSize = () => {
        if (cardRef.current) {
            // cardRef.current gives direct access to the underlying DOM node.
            setCardSize({
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight,
            });
        }
    }

    // useEffect to update the card size on window resize
    useEffect(() => {
        updateSize();
        // Update size on window resize
        window.addEventListener('resize', updateSize);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [cardSize]);

    // useMemo to update the card position on mouse move
    // this is used to avoid flickering at the start
    // this is called every time the mouse moves
    // useMemo bether than useEffect in this case, I supose is better :)
    useMemo(() => {
        setCordX(mouseCord.x);
        setCordY(mouseCord.y);
        if ((mouseCord.x + cardSize.width) > winSize.width) {
            setCordX( winSize.width - cardSize.width);
        };
        if ((mouseCord.y + cardSize.height) > winSize.height) {
            setCordY(winSize.height - cardSize.height);
        };
    }, [mouseCord]);


    return (
        <Card ref={cardRef} className="dorm-card-hover"
            style={{
                position: 'absolute',
                top: `${cordY}px`,
                left: `${cordX}px`,
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

// Prop types for the component
DormCardHover.propTypes = {
    dorm: PropTypes.object.isRequired
};

export default DormCardHover;
