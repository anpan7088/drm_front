// src/pages/Locations.jsx
import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import DormCardHover from '../components/DormCardHover';

// API_KEY for Google Maps
// keeping this key like this in code has significant security issues
// it should be stored in .env file or something similar
// but for now I'm just going to leave it here
//
// Posible solutions:
//   1. Use dotenv file on the server and have the client read it from there
//   2. Statically genereated map on the server and have the client download it.
//   3. Use a third party service like Mapbox, OpenStreet maps or something similar
const API_KEY = 'AIzaSyB2qqvsS9-CouAIUs6x7uxzYgmF5oEVO38';

// Locations page
// This page is for displaying the locations of the dorms on google maps component
const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [hoveredDorm, setHoveredDorm] = useState(null); // State for the hovered dorm
    const navigator = useNavigate();

    // const [zoomLevel, setZoomLevel] = useState(9);
    // const onMapZoom = (map) => {
    //     setZoomLevel(map.zoom);
    //     console.log(zoomLevel);
    // };
    const getIconSize = () => {
        const baseSize = 28;
        // const scaleFactor = 1 + (zoomLevel - 9) * 0.1; // Adjust 0.1 to change scaling speed
        // return Math.max(baseSize * scaleFactor, 20); // Set a minimum size
        return { width: 28, height: 28 }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axiosInstance('/dorms');
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching Locations:', error);
                // Set an empty array or a default value (optional)
                setLocations([]); // Example: Set an empty array on error
            }
        };

        fetchLocations();
    }, []); // Empty dependency array to fetch on initial render only

    // Handle marker click
    const handleMarkerClick = (location) => {
        navigator(`/dorm/${location.id}`);
        console.log(location);
    };

    // H
    const handleMarkerMouseOver = async (location) => {
        setHoveredDorm(location);
    };

    const handleMarkerMouseOut = () => {
        setHoveredDorm(null);
    };

    return (
        <div className="locations-container">
            <div className="row">
                <div className="col-md-8">
                    <div className="map-container">
                        <APIProvider apiKey={API_KEY}>
                            <Map
                                style={{ width: '1300px', height: '880px' }}
                                defaultCenter={{ lat: 46.17502993958369, lng: 15.023888406730292 }}
                                defaultZoom={9}
                                // onZoomChanged={onMapZoom}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                            >
                                {locations.map((location) => (
                                    <Marker
                                        key={location.id}
                                        name={location.name}
                                        position={{ lat: location.lat, lng: location.lng }}
                                        onClick={() => handleMarkerClick(location)}
                                        onMouseOver={() => handleMarkerMouseOver(location)}
                                        onMouseOut={handleMarkerMouseOut}
                                        // changing standard marker icon to custom one
                                        icon={{
                                            url: '/motel.png',
                                            // scaledSize: { width: 30, height: 30 },
                                            scaledSize: getIconSize(),
                                            caption: "Title for tooltip"
                                        }}
                                    >
                                    </Marker>
                                ))}
                            </Map>
                            {/* <ReactJson src={hoveredDorm} /> */}
                        </APIProvider>
                    </div>
                </div>
                {hoveredDorm && (
                    <DormCardHover dorm={hoveredDorm} />
                )}
            </div>
        </div>
    );
};

export default Locations;