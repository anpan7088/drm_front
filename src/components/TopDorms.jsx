// src/components/TopDorms.jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Table } from 'react-bootstrap';

// top dorms component
// this is the top dorms component, it is used in the Home.jsx file and is visible on the home page
const TopDorms = () => {
    const [topDorms, setTopDorms] = useState([]);

    // useEffect hook to fetch the top dorms from the database
    useEffect(() => {
        const fetchTopDorms = async () => {
            try {
                const response = await axiosInstance.get('/dorms/top-dorms/400'); // API  endpoint for top dorms with 400 dorms means all dorms
                setTopDorms(response.data);
            } catch (error) {
                console.error('Error fetching top dorms:', error);
            }
        };
        // call the async function to fetch the top dorms
        fetchTopDorms();
    }, []); // Empty dependency array to fetch on initial render only

    return (
        <>
            <h2>Top Dorms</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Dorm Name</th>
                        <th>City</th>
                        <th>Review Count</th>
                        <th>Average Score</th>
                    </tr>
                </thead>
                <tbody>
                    {topDorms.map(dorm => (
                        <tr key={dorm.id}>
                            <td>{dorm.name}</td>
                            <td>{dorm.city}</td>
                            <td align='right'>{dorm.review_count}</td>
                            <td align='right'>{dorm.avg_score}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TopDorms;