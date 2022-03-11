import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';


const NavbarMain = () => {

    return (
        
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                <h1>Concious Shopper</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav>
                    <Nav.Link href="/search">MainSearch</Nav.Link>
                        <Button variant="outline-secondary" className="me-2">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Button>
                        
                        <Button variant="outline-secondary">
                            <Nav.Link href="/signup">Signup</Nav.Link>
                        </Button>
                    </Nav>    
                </Navbar.Collapse>
                

            </Container>
        </Navbar>
        
    )

    


}

export default NavbarMain;