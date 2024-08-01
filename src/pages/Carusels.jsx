// src/components/Carusels.jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Row, Col } from 'react-bootstrap';
import SmallDormCardCarusel from '../components/SmallDormCardCarusel';

// Carusels page
// Same as Home page, but displayng carusels for images instead of first image on cards
const Carusels = () => {
    const [topDorms, setTopDorms] = useState([]);

    // useEffect to fetch top dorms from the backend
    useEffect(() => {
        // Fetch top dorms from the backend
        const fetchTopDorms = async () => {
            axiosInstance.get('/dorms/top-dorms-with-images/400')  // API endpoint to get top dorms
            .then(response => {
                setTopDorms(response.data);
            })
            .catch(error => {
                console.error('Error fetching top dorms:', error);
            });
        };
        fetchTopDorms();
    }, []);

    return (
        <Container>
            <h4>Dorms and student homes..</h4>
            <Row xs={1} md={2} className="g-4">
                {topDorms.map((dorm) => (
                    <Col key={dorm.id} sm={6} md={4} lg={3}>
                        <SmallDormCardCarusel dorm={dorm} />
                        {/* <DormCardHover dorm={dorm} /> */}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Carusels;
