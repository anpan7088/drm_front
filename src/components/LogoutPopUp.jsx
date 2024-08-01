// LogoutPopUp.jsx
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


// LogoutPopUp component
// show: boolean to show the modal
// handleClose: function to close the modal
// handleConfirm: function to confirm the logout
const LogoutPopUp = ({ show, handleClose, handleConfirm }) => {

    // handleLogout function to confirm the logout
    const handleLogout = () => {
        handleConfirm();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to log out?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// prop types for the component
LogoutPopUp.propTypes = {
    show: PropTypes.bool.isRequired,          // show flag
    handleClose: PropTypes.func.isRequired,   // function to close the modal
    handleConfirm: PropTypes.func.isRequired, // function to confirm the logout
};

export default LogoutPopUp;
