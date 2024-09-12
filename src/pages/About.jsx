// src/pages/About.jsx
import { Button } from "react-bootstrap";
import {  useLoginContext } from "../context/loginContext";

// About Page, just place holder for now
// to be replaced with actual content
const About = () => {
    const { userName, fullName, logout, showLogin } = useLoginContext();

    return (
        <div class="content-container">
            <h3>About this platform</h3>
            
            <p>As an international student in Slovenia, I quickly discovered how challenging it can be to find the right accommodation.
             Navigating dormitory options in a new country, with language barriers and limited knowledge of the area, was overwhelming. Realizing that many international students face similar struggles, 
            I decided to create a platform to make this process easier.
             My website is designed to help students access detailed information about dormitories, read honest reviews, and make well-informed decisions based on their needs.
             By providing a centralized hub for dormitory ratings and fostering a supportive community of students, 
            this platform aims to simplify the accommodation search for future students and make their transition to life in Slovenia smoother.</p>
            <p>Founded and developed by: <b>Angela Panovska</b> and <b>Riste Panovski</b>
            </p>
        </div>
        
    );
};

export default About;
