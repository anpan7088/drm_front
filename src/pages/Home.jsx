import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import DormCard from '../components/DormCard';
import TopDorms from '../components/TopDorms';

const HomePage = () => {
    const [dormOfTheDay, setDormOfTheDay] = useState(null);

    useEffect(() => {
        // Fetch dorm of the day
        axiosInstance.get('/dorms/dorm-of-the-day/1')
            .then(response => {
                setDormOfTheDay(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching dorm of the day:', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                <h2>Dorm of the Day </h2>
                {dormOfTheDay ? (
                        <DormCard dormID={dormOfTheDay.id} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="col-md-4">
                    <TopDorms />
                </div>
`            </div>
        </div>
    );
};

export default HomePage;
