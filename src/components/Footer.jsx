// src/components/Footer.jsx
import { appAbout } from "../../AboutData.json";

// Footer component, dysplay the footer of the page
const Footer = () => {
    const { email, author, description, version } = appAbout;
    
    const mailtoLink = `mailto:${email}`; // Create mailto link
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} {description}. Version: {version} </p>
                <p>
                    Author: {author} -{' '}
                    <a href={mailtoLink}>{email}</a>
                </p>            
            </div>
        </footer>
    );
};

export default Footer;
