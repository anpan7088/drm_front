import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card  } from 'react-bootstrap';
import useMousePosition from '../hooks/useMousePosition';
import ReactJson from 'react-json-view';
import useWindowSize from '../hooks/useWindowSize';

// this is a hovered dorm card for overlay on the map
// it is used to display the dorm info on the map when the user hovers over the marker

const DormCardHover = ({ dorm }) => {

    // starting position with negative values to avoid flickering at the start
    const mousePosition = useMousePosition({ x: -1000, y: -1000 });
    const cardSize = useWindowSize();  // window size for avoid to card popup over the window

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
                <ReactJson src={cardSize} />
            </Card.Body>
        </Card>
    );
};


DormCardHover.propTypes = {
    dorm: PropTypes.object.isRequired
};

export default DormCardHover;

// Here is some variat from ChatGPT code, with addition to avoidiing out of the screen positioning
//
// const useMousePosition = () => {
//     const [position, setPosition] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             const { clientX, clientY, view } = e;
//             const { innerWidth, innerHeight } = view;
//             const cardWidth = 300; // approximate width of the card
//             const cardHeight = 400; // approximate height of the card

//             // Adjust position to keep the card within the viewport
//             const x = clientX + cardWidth > innerWidth ? clientX - cardWidth : clientX;
//             const y = clientY + cardHeight > innerHeight ? clientY - cardHeight : clientY;

//             setPosition({ x, y });
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//         };
//     }, []);

//     return position;
// };
