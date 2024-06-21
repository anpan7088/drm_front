import { useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Table } from 'react-bootstrap';

// const round = (num) => {
//     console.log(num);        
//     return Math.round(num * 100) / 100;
// }
    
const TopDorms = () => {
    const [topDorms, setTopDorms] = useState([]);

    useMemo(() => {
        // Fetch top dorms
        axiosInstance.get('/dorms/top-dorms/4')
            .then(response => {
                setTopDorms(response.data);
            })
            .catch(error => {
                console.error('Error fetching top dorms:', error);
            });
    }, []);

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