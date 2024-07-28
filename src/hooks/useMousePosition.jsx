import { useState, useEffect } from 'react';

// mouse position hook, 
// usefful for geting the mouse position
function useMousePosition(defaultPosition) {
    // stariting position with negative values to avoid flickering at the start
    const [mousePosition, setMousePosition] = useState(defaultPosition);

    useEffect(() => {
        const updateMousePosition = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return mousePosition;
}

export default useMousePosition;

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

