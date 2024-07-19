import React, { useState, useEffect, useMemo } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import ReactJson from 'react-json-view';
import axiosInstance from '../axiosConfig';

const API_KEY = 'AIzaSyB2qqvsS9-CouAIUs6x7uxzYgmF5oEVO38';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    // const [selectedLocation, setSelectedLocation] = useState(null);

    useMemo(async () => {
        // Fetch locations from the API
        await axiosInstance('/dorms/locations')
        .then(response => {
            setLocations( response.data);
        })
        .catch(error => {
            console.error('Error fetching Locations:', error);
            return [];
        });
    }, []);

    const handleMarkerClick = (name) => {
        // setSelectedLocation(location);
        console.log(name);
    };

    const handleLocationClick = (location) => {
        console.log(location);
    };

    return (
        <div className="locations-container">
            <APIProvider apiKey={API_KEY}>
                <Map
                    style={{ width: '1024px', height: '768px' }}
                    defaultCenter={{ lat: 46.17502993958369, lng: 15.023888406730292 }}
                    defaultZoom={8.5}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={handleLocationClick}
                >
                    {/* <Marker name="Proba" position={{ lat: 46.17502993958369, lng: 15.023888406730292 }} onClick={handleMarkerClick} /> */}
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            name={location.name}
                            position={{ lat: location.lat, lng: location.lng }}
                            onClick={handleMarkerClick}
                        />

                    ))}
                </Map>
            </APIProvider>
        </div>
    );
};

export default Locations;