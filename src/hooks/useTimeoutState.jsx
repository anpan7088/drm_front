// src/hooks/useTimeoutState.jsx
import { useState, useEffect, useRef } from 'react';

// useTimeoutState is a custom hook that returns a state and a setState function
// that will reset the state after a timeout.
// initialValue is the initial value of the state
// timeout is the timeout in milliseconds
const useTimeoutState = (initialValue = false, timeout = 1000) => {
    const [state, setState] = useState(initialValue);
    const timeoutRef = useRef(null);

    // setTimedState is a function that sets the state and resets the state after a timeout
    const setTimedState = (value) => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setState(value);

        // Set the timeout to reset the state
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
