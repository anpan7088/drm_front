import React, { useState, useMemo } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import DormCardHover from '../components/DormCardHover';

// API key for Google Maps
// keeping this key like this in code has significant security issues
// it should be stored in .env file or something similar
// but for now I'm just going to leave it here
//
// Posible solutions:
//   1. Use dotenv file on the server and have the client read it from there
//   2. Statically genereated map on the server and have the client download it.
//   3. Use a third party service like Mapbox, OpenStreet maps or something similar
const API_KEY = 'AIzaSyB2qqvsS9-CouAIUs6x7uxzYgmF5oEVO38';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [hoveredDorm, setHoveredDorm] = useState(null); // State for the hovered dorm
    const navigator = useNavigate();

    useMemo(async () => {
        // Fetch locations from the API
        await axiosInstance('/dorms')
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                console.error('Error fetching Locations:', error);
                return [];
            });
    }, []);

    const handleMarkerClick = (location) => {
        navigator(`/dorm/${location.id}`);
        console.log(location);
    };

    const handleMarkerMouseOver = async (location) => {
        setHoveredDorm(location);
    };

    const handleMarkerMouseOut = () => {
        setHoveredDorm(null);
    };

    return (
        <div className="locations-container">
            <div class="row">
                <div class="col-md-8">
                    <div className="map-container">
                        <APIProvider apiKey={API_KEY}>
                            <Map
                                style={{ width: '1024px', height: '768px' }}
                                defaultCenter={{ lat: 46.17502993958369, lng: 15.023888406730292 }}
                                defaultZoom={8.5}
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
                                    >
                                    </Marker>
                                ))}
                            </Map>
                            {/* <ReactJson src={hoveredDorm} /> */}
                        </APIProvider>
                    </div>
                </div>
                <div class="col-md-4">
                    <div className="dorm-container">
                        {hoveredDorm && (
                            <DormCardHover dorm={hoveredDorm} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;