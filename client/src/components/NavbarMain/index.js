import React from 'react';
import Auth from '../../utils/auth'

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

import './navbarmain.css'

const logout = event => {
    event.preventDefault();
    Auth.logout();
}

const NavbarMain = () => {
       return (
        
        <Navbar className='navbarcolor' expand="lg">
            <Container>
                <Navbar.Brand href="/">
                <h1>Conscious Shopper</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav>
                    {Auth.loggedIn()?(
                        <>
                        <Button variant="outline-secondary" className="me-2">
                            <Nav.Link href="/profile">My Business</Nav.Link>
                        </Button>
                        <Button variant="outline-secondary" className="me-2">
                            <Nav.Link href="/bpage">Business Page</Nav.Link>
                        </Button>
                        <Button variant="outline-danger" className="me-2">
                            <Nav.Link href ='/' onClick={logout}>Logout</Nav.Link>
                        </Button>
                        </>
                    ) : (
                        <>
                        <Button variant="outline-secondary" className="me-2">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Button>
                        <Button variant="outline-secondary">
                            <Nav.Link href="/signup">Signup</Nav.Link>
                        </Button>
                        </>
                    )}  
                    </Nav>    
                </Navbar.Collapse>
                

            </Container>
        </Navbar>
        
    )

    


}

export default NavbarMain;