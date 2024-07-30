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

