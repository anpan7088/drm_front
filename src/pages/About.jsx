import { Button } from "react-bootstrap";
import {  useLoginContext } from "../context/loginContext";

const About = () => {
    const { userName, fullName, logout, showLogin } = useLoginContext();

    return (
        <div>
            <h1>About Page</h1>
            <p>Welcome to the About Page</p>
            <p>{userName} - {fullName}</p>
            <Button variant="primary" onClick={logout} >Logout - {userName}</Button>
            <Button variant="primary" onClick={showLogin} >Login</Button>
        </div>
    );
};

export default About;
