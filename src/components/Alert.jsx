import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { Alert as BootstrapAlert } from 'react-bootstrap';


const Alert = ({ message, variant = 'success', duration = 5000, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!show) return null;

    return (
        <div className="alert-container">
            <BootstrapAlert variant={variant} onClose={() => setShow(false)} dismissible>
                {message}
            </BootstrapAlert>
        </div>
    );
};


// Define prop types for the Alert component 
// Воа се глупости ама ајде 
Alert.propTypes = {
    message: PropTypes.string.isRequired,
    variant: PropTypes.string,
    duration: PropTypes.number,
    onClose: PropTypes.func,
};

export default Alert;
