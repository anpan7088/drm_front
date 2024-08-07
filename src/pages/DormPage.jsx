// src/pages/DormPage.jsx
import { useParams } from "react-router";
import DormCard from "../components/DormCard";

// Dorm Page, just display DormCard for the dormID
const DormPage = () => {
    // get dormID from URL parameters
    const { dormID } = useParams();

    // convert string Parameter to number, coz some wired reason in PropTypes of DormCard
    const numDormID = (id) => parseInt(id);

    return (
        <div>
            <h5>Dorm Page</h5>
            <DormCard dormID={numDormID(dormID)} />
        </div>
    );
};

export default DormPage;
