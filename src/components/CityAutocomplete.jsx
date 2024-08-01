// src/components/CityAutocomplete.jsx
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Form, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

// CityAutocomplete component for displaying a dropdown of city suggestions
// value: The current value of the input field
// onChange: A callback function to be called when the input value changes
// onSelect: A callback function to be called when a city is selected from the dropdown
const CityAutocomplete = ({ value, onChange, onSelect }) => {
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    // featch city suggestions from the server when the query is updated
    // The query is the current value of the input field
    const fetchCitySuggestions = async (query) => {
        if (query.length < 3) {
            setCitySuggestions([]);
            setDropdownOpen(false);
            return;
        }
        try {
            const response = await axiosInstance.get(`/cities/name/${query}`);
            setCitySuggestions(response.data.data);
            setDropdownOpen(true);
        } catch (error) {
            console.error('Error fetching city suggestions', error);
        }
    };

    // handle input change event
    const handleChange = (e) => {
        const { value } = e.target;
        onChange(value);
        fetchCitySuggestions(value);
    };

    // handle dropdown item selection
    const handleSelect = (city) => {
        onSelect(city.Name + ', '+ city.country);
        setCitySuggestions([]);
        setDropdownOpen(false);
        setHighlightedIndex(-1);
    };

    // Keyboard navigation for the dropdown
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowDown':
                setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, citySuggestions.length - 1));
                break;
            case 'ArrowUp':
                setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
                break;
            case 'Enter':
            case ' ':
                if (highlightedIndex >= 0 && highlightedIndex < citySuggestions.length) {
                    handleSelect(citySuggestions[highlightedIndex]);
                }
                break;
            default:
                break;
        }
    };

    // useEffect hook to handle keyboard navigation
    useEffect(() => {
        if (dropdownRef.current && highlightedIndex >= 0 && highlightedIndex < citySuggestions.length) {
            const item = dropdownRef.current.children[highlightedIndex];
            item.scrollIntoView({ block: 'nearest' });
        }
    }, [citySuggestions.length, highlightedIndex]);

    return (
        <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <InputGroup>
                <FormControl
                    type="text"
                    name="city"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    required
                />
                {citySuggestions.length > 0 && dropdownOpen && (
                    <div className="w-100" style={{ zIndex: 1000 }}>
                        <Dropdown.Menu show={true} style={{ display: 'block', width: '100%' }} ref={dropdownRef}>
                            {citySuggestions.map((city, index) => (
                                <Dropdown.Item
                                    key={city.id}
                                    onClick={() => handleSelect(city)}
                                    active={index === highlightedIndex}
                                >
                                    {city.Name}, {city.state}, {city.country}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </div>
                )}
            </InputGroup>
        </Form.Group>
    );
};

// Define prop types for the CityAutocomplete component
CityAutocomplete.propTypes = {
    value: PropTypes.string.isRequired, // value: The current value of the input field (required)
    onChange: PropTypes.func.isRequired,// onChange: A callback function to be called when the input value changes (required)
    onSelect: PropTypes.func.isRequired // onSelect: A callback function to be called when a city is selected from the dropdown (required)
};

export default CityAutocomplete;
