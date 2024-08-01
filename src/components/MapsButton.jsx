// src/components/MapsButton.jsx
import { Button } from "react-bootstrap";

// Next row is another syntax variant.
// const MapsButton = ({ location, title, variant = 'default' }) => {
// maaps button component, is not used in the project for now
const MapsButton = (props) => {
    const{ location, title, variant = 'default' } = props;
    
    // handleClick function to open the location in Google Maps
    const handleClick = () => {
      const mapUrl = `https://www.google.com/maps/search/?q=${location.lat},${location.lng}`;
      window.open(mapUrl, '_blank'); // Open in a new tab
    };

    return (
        <Button variant={variant} onClick={handleClick}>
        {title || 'Open in Google Maps'}
      </Button>
      );
  };
  

export default MapsButton;

// the PropTypes are intentionally not used here.
// They are used in the DormCard.jsx file.