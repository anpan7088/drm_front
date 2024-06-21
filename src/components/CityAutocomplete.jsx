// #mkd
// Генерирано од чатгпт тс 2021-08-16 15:35:21.781 +0300
// Не ме бендисуе баш, кога ке немам друга работа ке го поедноставам
//
// src/components/CityAutocomplete.jsx
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Form, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';


const CityAutocomplete = ({ value, onChange, onSelect }) => {
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

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

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(value);
        fetchCitySuggestions(value);
    };

    const handleSelect = (city) => {
        onSelect(city.Name + ', '+ city.country);
        setCitySuggestions([]);
        setDropdownOpen(false);
        setHighlightedIndex(-1);
    };

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

CityAutocomplete.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default CityAutocomplete;
