// DormsManagement.js
// htis is the dorm managment page
// shoudbe visble only wen user is logged in and is an admin
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';

import Alert from '../components/Alert';
import CityAutocomplete from '../components/CityAutocomplete';
import WriteReview from '../components/WriteReview';
import DormImages from '../components/DormImages';

const DormsManagement = () => {
    const [dorms, setDorms] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [alert, setAlert] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewDormId, setReviewDormId] = useState(null);

    // image modal
    const [imageDormId, setImageDormId] = useState(null);
    const [showImgModal, setShowImgModal] = useState(false);
    const handleImgShow = (dorm_id) => {
        setImageDormId(dorm_id);
        setShowImgModal(true);
    }
    const handleImgClose = () => {
        setShowImgModal(false);
        setImageDormId(null);
    }

    // edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditShow = (dorm) => {
        setFormData({ name: dorm.name, address: dorm.address, city: dorm.city });
        setEditingId(dorm.id);
        setShowEditModal(true);
    }
    const handleEditClose = () => {
        setShowEditModal(false);
        setFormData({ name: '', address: '', city: '' });
        setEditingId(null);
    }

    useEffect(() => {
        fetchDorms();
    }, []);

    const fetchDorms = async () => {
        try {
            const response = await axiosInstance.get('/dorms');
            setDorms(response.data);
        } catch (error) {
            setAlert({ message: 'Error fetching dorms', variant: 'danger' });
        }
    };

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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axiosInstance.patch(`/dorms/${editingId}`, formData);
                setAlert({ message: 'Dorm updated successfully', variant: 'success' });
            } else {
                await axiosInstance.post('/dorms', formData);
                setAlert({ message: 'Dorm added successfully', variant: 'success' });
            }
            fetchDorms();
            handleEditClose(); // Close the modal after submission
        } catch (error) {
            setAlert({ message: 'Error saving dorm: ' + error.response.data.error, variant: 'danger' });
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/dorms/${id}`);
            setAlert({ message: 'Dorm deleted successfully', variant: 'success' });
            fetchDorms();
        } catch (error) {
            setAlert({ message: 'Error deleting dorm: ' + error.response.data.error, variant: 'danger' });
        }
    };

    const handleWriteReview = (dormId) => {
        setReviewDormId(dormId);
        setShowReviewForm(true);
    };

    const handleCloseReviewForm = () => {
        setShowReviewForm(false);
        setReviewDormId(null);
    };

    return (
        <Container>
            <h2>Dorms Management</h2>
            {alert && <Alert message={alert.message} variant={alert.variant} onClose={() => setAlert(null)} />}

            <Button variant="primary" onClick={() => setShowEditModal(true)}>
                Add Dorm
            </Button>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dorms.map((dorm) => (
                        <tr key={dorm.id}>
                            <td>{dorm.name}</td>
                            <td>{dorm.address}</td>
                            <td>{dorm.city}</td>
                            <td className='d-flex  justify-content-around'>
                                <Button variant="warning" onClick={() => handleEditShow(dorm)}>
                                    Edit
                                </Button>
                                {' '}
                                <Button variant='warning' onClick={() => handleImgShow(dorm.id)}>
                                    Images
                                </Button>
                                {' '}
                                <Button variant="info" onClick={() => handleWriteReview(dorm.id)}>
                                    Review
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={() => handleDelete(dorm.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {showImgModal && (
                <DormImages
                    dormId={imageDormId}
                    onClose={handleImgClose}
                />
            )}
            {showReviewForm && (
                <WriteReview
                    dormId={reviewDormId}
                    onClose={handleCloseReviewForm}
                />
            )}
            <Modal show={showEditModal} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? 'Edit Dorm' : 'Add Dorm'}</Modal.Title>
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

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            {editingId ? 'Update Dorm' : 'Add Dorm'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default DormsManagement;
