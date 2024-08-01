//src/components/DormEdit.jsx
import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import CityAutocomplete from '../components/CityAutocomplete';

// Dorm edit form component, used to edit dorms data
// if dorm is null, then the form is used to create a new dorm
// if dorm is not null, then the form is used to edit the dorm
// this commponent is used in DormsManagement.jsx
// does not make call to the API directly, it uses the dorm data as a prop
const DormEdit = ({ show, onHide, onSubmit, dorm }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        lat: '',
        lng: '',
    });

    // useEffect hook to set the form data to the dorm data
    // this is used to populate the form with the dorm data
    useEffect(() => {
        if (dorm) {
            setFormData({ name: dorm.name, address: dorm.address, city: dorm.city, lat: dorm.lat, lng: dorm.lng });
        } else {
            setFormData({ name: '', address: '', city: '', lat: '', lng: '' });
        }
    }, [dorm]);

    // handle change
    // this is a function that is called when the form field is changed
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // handle city change
    // this is a custom component that is used to autocomplete the city field
    // it is used in the DormEdit component and 
    // defined in the components/CityAutocomplete.jsx
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

    // handle submit
    // this is the function that is called when the form is submitted
    // it is used in the DormsManagement.jsx
    // onSubmit is a function that is passed as a prop from the DormsManagement.jsx
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

// define prop types
import PropTypes from 'prop-types';
DormEdit.propTypes = {
    show: PropTypes.bool.isRequired,  // show prop is a boolean that determines if the modal is shown or not
    onHide: PropTypes.func.isRequired, // onHide prop is a function that is called when the modal is closed
    dorm: PropTypes.object,            // dorm prop is an object that contains the dorm data
    onSubmit: PropTypes.func.isRequired, // onSubmit prop is a function that is called when the form is submitted
};

export default DormEdit;
