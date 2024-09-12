import React from 'react';
import { Container, Button } from 'react-bootstrap'; // Bootstrap components
import dormImage from '../assets/dormImage.jpg'; // Sample dorm image, adjust the path
import '../scss/App.scss'; // Custom CSS for styling

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Half Background Image */}
      <div className="half-bg-image">
        <div className="overlay">
          <h1 className="homepage-title">Find Your Perfect Dorm</h1>
          <p className="homepage-subtitle">Helping international students feel at home in Slovenia</p>
          <div className="homepage-buttons">
            <Button variant="outline-light" href="/dorms" className="m-2 btn-lg">
              Dorms
            </Button>
            <Button variant="outline-light" href="/locations" className="m-2 btn-lg">
              Locations
            </Button>
            <Button variant="outline-light" href="/about" className="m-2 btn-lg">
              About
            </Button>
          </div>
        </div>
      </div>

      {/* Message container */}
      <Container className="message-container mt-5">
        <h2 className="message-title">Welcome to the Dormitory Rating Platform</h2>
        <p className="message-text">
          We know how overwhelming it can be to find the perfect accommodation as a foreign student. 
          Our platform simplifies the process by providing detailed dorm information, reviews, and ratings from fellow students. 
          Whether you're concerned about location, amenities, or overall living conditions, we're here to help make your transition to life in Slovenia smoother.
        </p>
      </Container>
    </div>
  );
};

export default HomePage;
