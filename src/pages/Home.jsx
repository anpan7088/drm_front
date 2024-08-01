// src/朝鮬/pages/Home.jsx
import { useEffect,useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import SmallDormCard from '../components/SmallDormCard';

// Home Page, display top dorms
const HomePage = () => {
    const [topDorms, setTopDorms] = useState([]);

    // useEffect to fetch top dorms from the backend
    useEffect(() => {
        // Function to fetch top dorms with images
        const fetchTopDormsWithImages = async () => {
            try {
                const response = await axiosInstance.get('/dorms/top-dorms-with-images/400'); // API endpoint to get top dorms with images
                setTopDorms(response.data);
            } catch (error) {
                console.error('Error fetching top dorms:', error);
            }
        };
        // Call the function to fetch top dorms with images
        fetchTopDormsWithImages();
    }, []); // Empty dependency array to fetch on initial render only

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
