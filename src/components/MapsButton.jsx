import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const MapsButton = ({ location, title, variant = 'default' }) => {
    const handleClick = () => {
      const mapUrl = `https://www.google.com/maps/search/?q=${location.lat},${location.lng}`;
      window.open(mapUrl, '_blank'); // Open in a new t
    };
  
    return (
        <Button variant={variant} onClick={handleClick}>
        {title || 'Open in Google Maps'}
      </Button>
      );
  };
  
MapsButton.propTypes = {
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }).isRequired,
    title: PropTypes.string,
    variant: PropTypes.string,
};

export default MapsButton;

