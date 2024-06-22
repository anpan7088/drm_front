// timeOutState is a custom hook that returns a state and a setState function
// that will reset the state after a timeout.
// defined in src/hooks/useTimeoutState.jsx

import { useState, useEffect, useRef } from 'react';

const useTimeoutState = (initialValue = false, timeout = 1000) => {
    const [state, setState] = useState(initialValue);
    const timeoutRef = useRef(null);

    const setTimedState = (value) => {
        // Clear any existing timeout
        //        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setState(value);

        // Set the timeout to reset the state
        //
        timeoutRef.current = setTimeout(() => {
            setState(initialValue);
        }, timeout);
    };

    // Clear the timeout if the component unmounts
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return [state, setTimedState];
};

export default useTimeoutState;
