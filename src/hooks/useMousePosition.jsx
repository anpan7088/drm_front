import { useState, useEffect } from 'react';

// mouse position hook, 
// usefful for geting the mouse position
// default position is -1000, -1000 for avoid flickering at the start
function useMousePosition(defaultPosition) {
    const [mousePosition, setMousePosition] = useState(defaultPosition);

    // useEffect to update the mouse position on mouse move
    useEffect(() => {
        // update the mouse position on mouse move
        const updateMousePosition = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        // add event listener to window, when mouse move, update the mouse position
        window.addEventListener('mousemove', updateMousePosition);
        // remove event listener on unmount
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return mousePosition;
}

export default useMousePosition;

