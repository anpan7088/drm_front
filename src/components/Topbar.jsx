// src/components/Topbar.jsx
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useLoginContext } from "../context/loginContext";
import LogoutPopUp from './LogoutPopUp';
import { useState } from 'react';

// top bar component, with menus and login buttons
// this is the top bar of the website
// it contains the logo, the menus and the login button
// it is used in the App.jsx file and is visible on all pages
const Topbar = () => {
    const { userName, userRole, showLogin } = useLoginContext();

    const { logout } = useLoginContext();
    const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand href="/home">Dorm Reviews</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/carusels">Carusels</Nav.Link>
                            <Nav.Link href="/locations">Locations</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavDropdown title={userName || "Login"} id="user-dropdown">

                                {userName && (
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>)}
                                <NavDropdown.Divider />

                                {!userName && (
                                    <NavDropdown.Item href="/register">Register</NavDropdown.Item>)}

                                {!userName && (
                                    <NavDropdown.Item onClick={showLogin}>Login</NavDropdown.Item>)}

                                {userName && (
                                    <NavDropdown.Item href="#" onClick={() => setShowLogoutPopUp(true)}>Logout</NavDropdown.Item>)}

                                <NavDropdown.Divider />

                                {userRole === 'admin' && (
                                    <>
                                        <NavDropdown.Item href="/dorms">Dorm admin</NavDropdown.Item>
                                        <NavDropdown.Item href="/reviews">Review admin</NavDropdown.Item>
                                        <NavDropdown.Item href="/users">Users admin</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                )}

                                <NavDropdown.Item href="/about">About</NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LogoutPopUp
                show={showLogoutPopUp}
                handleClose={() => setShowLogoutPopUp(false)}
                handleConfirm={() => logout()}
            />
        </>
    );
};

export default Topbar;
