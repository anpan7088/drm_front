import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useLoginContext } from "../context/loginContext";
import LogoutPopUp from './LogoutPopUp';
import { useState } from 'react';

const Topbar = () => {
    const { userName, showLogin } = useLoginContext();

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
                            <NavDropdown title="Dorms" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/dorms">Dorm Management</NavDropdown.Item>
                                <NavDropdown.Item href="/reviews">Dorm reviews</NavDropdown.Item>
                            </NavDropdown>
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
