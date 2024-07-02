import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Row, Col } from 'react-bootstrap';
import DormCard from '../components/DormCard';
import TopDorms from '../components/TopDorms';
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
            <Row>
                <Col>
                    <h3>Dorms and student homes..</h3>
                    <Container>
                        <Row>
                            {topDorms.map((dorm) => (
                                <Col key={dorm.id} sm={6} md={4} lg={3}>
                                    <SmallDormCard dorm={dorm} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
