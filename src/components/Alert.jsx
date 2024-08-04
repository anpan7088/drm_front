//src/components/DormEdit.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 

import { Alert as BootstrapAlert } from 'react-bootstrap';

// Alert component for displaying messages
// mesaage: The message to be displayed
// variant: The variant of the alert (default is 'success')
// duration: The duration in milliseconds for which the alert should be displayed (default is 5000)
// onClose: A callback function to be called when the alert is closed
const Alert = ({ message, variant = 'success', duration = 5000, onClose }) => {
    const [show, setShow] = useState(true);

    // useEffect hook to set a timer to hide the alert after the specified duration
    // The timer is cleared when the component unmounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            if (onClose) onClose();
        }, duration);

        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // If the show state is false, the component is not rendered
    if (!show) return null;

    return (
        <div className="alert-container" style={{  zIndex: 9999 }}>
            <BootstrapAlert variant={variant} onClose={() => setShow(false)} dismissible>
                {message}
            </BootstrapAlert>
        </div>
    );
};


// Define prop types for the Alert component 
Alert.propTypes = {
    message: PropTypes.string.isRequired, // message: The message to be displayed in the alert (required)
    variant: PropTypes.string,   // variant: The variant of the alert (default is 'success')
    duration: PropTypes.number,  // duration: The duration in milliseconds for which the alert should be displayed (default is 5000)
    onClose: PropTypes.func,     // onClose: A callback function to be called when the alert is closed
};

export default Alert;
