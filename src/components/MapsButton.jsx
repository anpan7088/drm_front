import { Button } from "react-bootstrap";

// Next row is another syntax variant.
// const MapsButton = ({ location, title, variant = 'default' }) => {
const MapsButton = (props) => {
    const{ location, title, variant = 'default' } = props;
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
  

export default MapsButton;

// the PropTypes are intentionally not used here.
// They are used in the DormCard.jsx file.