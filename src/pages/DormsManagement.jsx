// DormsManagement.js
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Button, Table } from 'react-bootstrap';
import Alert from '../components/Alert';
import WriteReview from '../components/WriteReview';
import DormImages from '../components/DormImages';
import DormEdit from '../components/DormEdit';

// htis is the dorm managment page
// shoudbe visble only wen user is logged in and is an admin
const DormsManagement = () => {
    const [dorms, setDorms] = useState([]);
    const [editingDorm, setEditingDorm] = useState(null);
    const [alert, setAlert] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewDormId, setReviewDormId] = useState(null);

    // image modal
    const [imageDormId, setImageDormId] = useState(null);
    const [showImgModal, setShowImgModal] = useState(false);
    const handleImgShow = (dorm_id) => {
        setImageDormId(dorm_id);
        setShowImgModal(true);
    };
    const handleImgClose = () => {
        setShowImgModal(false);
        setImageDormId(null);
    };

    // edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditShow = (dorm) => {
        setEditingDorm(dorm);
        setShowEditModal(true);
    };
    const handleEditClose = () => {
        setShowEditModal(false);
        setEditingDorm(null);
    };

    // useEffect to fetch dorms from the backend
    useEffect(() => {
        const fetchDorms = async () => {
            try {
                const response = await axiosInstance.get('/dorms');
                setDorms(response.data);
            } catch (error) {
                setAlert({ message: 'Error fetching dorms', variant: 'danger' });
            }
        };

        fetchDorms();
    }, []);

    // handle submit of form
    const handleSubmit = async (formData) => {
        try {
            if (editingDorm) {
                await axiosInstance.patch(`/dorms/${editingDorm.id}`, formData);
                setAlert({ message: 'Dorm updated successfully', variant: 'success' });
            } else {
                await axiosInstance.post('/dorms', formData);
                setAlert({ message: 'Dorm added successfully', variant: 'success' });
            }
            fetchDorms();
            handleEditClose();
        } catch (error) {
            setAlert({ message: 'Error saving dorm: ' + error.response.data.error, variant: 'danger' });
            console.error(error);
        }
    };

    // handle delete dorm
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/dorms/${id}`);
            setAlert({ message: 'Dorm deleted successfully', variant: 'success' });
            fetchDorms();
        } catch (error) {
            setAlert({ message: 'Error deleting dorm: ' + error.response.data.error, variant: 'danger' });
        }
    };

    // handle write review
    const handleWriteReview = (dormId) => {
        setReviewDormId(dormId);
        setShowReviewForm(true);
    };

    // handle close review form
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
                            <td className='d-flex justify-content-around'>
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
            <DormEdit
                show={showEditModal}
                onHide={handleEditClose}
                onSubmit={handleSubmit}
                dorm={editingDorm}
            />
        </Container>
    );
};

export default DormsManagement;
