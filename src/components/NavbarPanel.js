import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const NavbarPanel = () => {
    const cartData = useSelector((state) => state.cart);
    
    return (
        <div style={{position: "fixed", width: "100%", zIndex: 1000}}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid className="container">
                    <Navbar.Brand to="/" as={Link}>Redux Toolkit</Navbar.Brand>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link to="/" as={Link}>Products</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Nav.Link to="/cart" as={Link}>My Bag {cartData.length}</Nav.Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarPanel; 