import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import SmallDormCard from '../components/SmallDormCard';


const HomePage = () => {
    const [topDorms, setTopDorms] = useState([]);

    useMemo(() => {
        // Fetch top dorms
        axiosInstance.get('/dorms/top-dorms-with-images/400')
            .then(response => {
                setTopDorms(response.data);
            })
            .catch(error => {
                console.error('Error fetching top dorms:', error);
            });
    }, []);

    return (
        <Container>
            <h4>Dorms and student homes..</h4>
            <Row xs={1} md={2} className="g-4">
                {topDorms.map((dorm) => (
                    <Col key={dorm.id} sm={6} md={4} lg={3} >
                        <SmallDormCard dorm={dorm} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
