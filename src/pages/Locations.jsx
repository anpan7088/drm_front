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

const DEFAULT_ZOOM = 9;
const DEFAULT_ICON_SIZE = 20;
const DEFAULT_CENTER = { lat: 46.17502993958369, lng: 15.023888406730292 };

// Locations page
// This page is for displaying the locations of the dorms on google maps component
const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [hoveredDorm, setHoveredDorm] = useState(null); // State for the hovered dorm
    const navigator = useNavigate();

    const [iconSize, setIconSize] = useState({ width: 20, height: 20 });

    // function to handle dorm icon size on zoom change
    const onMapZoom = (zoom) => {
        const baseSize = DEFAULT_ICON_SIZE;
        const scaleFactor = Math.max(0.5, Math.min(2, zoom / DEFAULT_ZOOM));
        const size = Math.round(baseSize * scaleFactor);
        setIconSize({ width: size, height: size });
    };

    // Fetch locations on initial render
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axiosInstance('/dorms'); // API call to get locations (dorms list width coordinates)
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching Locations:', error);
                // Set an empty array or a default value (optional)
                setLocations([]); // Example: Set an empty array on error
            }
        };

        fetchLocations();
    }, []); // Empty dependency array to fetch on initial render only

    // Handle marker click, navigate to the dorm page
    const handleMarkerClick = (location) => {
        navigator(`/dorm/${location.id}`);
        console.log(location);
    };

    // Handle marker mouse over, set hovered dorm to show the card
    const handleMarkerMouseOver = async (location) => {
        setHoveredDorm(location);
    };

    // Handle marker mouse out, set hovered dorm to null to hide the card
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
                                defaultCenter={DEFAULT_CENTER}
                                defaultZoom={DEFAULT_ZOOM}
                                onZoomChanged={(mapObject) => onMapZoom(mapObject.map.zoom)} // Handle zoom change
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
                                        icon={{ // changing standard marker icon to custom one
                                            url: '/motel.png',
                                            scaledSize: iconSize,
                                            caption: "Title for tooltip"
                                        }}
                                    >
                                    </Marker>
                                ))}
                            </Map>
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