import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import CityAutocomplete from '../components/CityAutocomplete';
import ReactJson from 'react-json-view';

const DormEdit = ({ show, onHide, onSubmit, dorm }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        lat: '',
        lng: '',
    });

    useEffect(() => {
        if (dorm) {
            setFormData({ name: dorm.name, address: dorm.address, city: dorm.city, lat: dorm.lat, lng: dorm.lng });
        } else {
            setFormData({ name: '', address: '', city: '', lat: '', lng: '' });
        }
    }, [dorm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCityChange = (city) => {
        setFormData({
            ...formData,
            city: city,
        });
    };

    // handle location change
    // coma separated values are splited on  lat, lng and set as lat, lng
    // copy cordinates from google maps and paste them in the input field
    const handleLocationChange = (e) => {
        const value = e.target.value;
        if (value.includes(',')) {
            const [lat, lng] = value.split(',').map(coord => coord.trim());
            setFormData({
                ...formData,
                lat: lat,
                lng: lng,
            });
        } else {
            const { name } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{dorm ? 'Edit Dorm' : 'Add Dorm'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <CityAutocomplete
                        value={formData.city}
                        onChange={(city) => setFormData({ ...formData, city })}
                        onSelect={handleCityChange}
                    />

                    <Form.Group controlId="formLocation">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control
                            type="text"
                            name="lat"
                            value={formData.lat}
                            onChange={handleLocationChange}
                        />
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control
                            type="text"
                            name="lng"
                            value={formData.lng}
                            onChange={handleLocationChange}
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        {dorm ? 'Update Dorm' : 'Add Dorm'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default DormEdit;
