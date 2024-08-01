// src/hooks/useWindowSize.jsx
import { useState, useEffect } from 'react';

// Custom hook to get window size
// This hook returns an object with the width and height of the window
// it is posible to use this hook in any component
// and is not necessary to use it but this is more react way to do it
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Update window size on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener, when window resize, update the window size
        window.addEventListener('resize', handleResize);
        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Return window size
    return windowSize;
};

export default useWindowSize;
