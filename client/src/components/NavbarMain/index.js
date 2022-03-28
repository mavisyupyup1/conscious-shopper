import React from 'react';
import Auth from '../../utils/auth'
import {Link} from 'react-router-dom'

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useQuery , useMutation} from '@apollo/client';
import { QUERY_ME_BASIC} from '../../utils/queries';

import './navbarmain.css'

const logout = event => {
    event.preventDefault();
    Auth.logout();
}


const NavbarMain = () => {
    // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    //     variables: { username: userParam },
    //   });
    
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const loggedIn = Auth.loggedIn();
    const paidUser = userData?.me.type === "PAID"
    const hasStripeId = userData?.me.stripeId !== null
    console.log("stripeId:", userData?.me.stripeId)
    console.log("Current user:", {loggedIn, paidUser, hasStripeId})

    return (

        <>
        
        
        
        <Navbar className='navbarcolor' expand="lg">
            <Container>


                <Navbar.Brand href="/">
                    <div className="navbar-logo">
                    Conscious Shopper <i class="fa-solid fa-basket-shopping"></i>
                    </div>
                </Navbar.Brand> 

                {/* NAVBAR CONCIOUS SHOPPER LOGO */}
                {/* <Link to="/" className="navbar-logo" >
                Concious Shopper <i class="fa-solid fa-basket-shopping"></i>
                </Link> */}


                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav>
                        {Auth.loggedIn() ? (
                            <>
                                <Button variant="outline-secondary" className="m-2 mt-2">
                                    <Nav.Link href="/profile">My Profile</Nav.Link>
                                </Button>
                                
                                {loggedIn && paidUser && hasStripeId ? (
                                    
                                        <Button variant="outline-secondary" className="m-2">
                                            <Nav.Link href="/bpage">Business Page</Nav.Link>
                                        </Button>
                                    
                                
                                ) : null}

                                <Button variant="outline-danger" className="m-2">
                                    <Nav.Link href='/' onClick={logout}>Logout</Nav.Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-secondary" className="m-2">
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Button>
                                <Button variant="outline-secondary" className="m-2">
                                    <Nav.Link href="/signup">Signup</Nav.Link>
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>


            </Container>
        </Navbar>

        {/* <nav className='navbar'>
            <div className='navbar-container'>
                
                // NAVBAR CONCIOUS SHOPPER LOGO 
                <Link to="/" className="navbar-logo" >
                Concious Shopper <i class="fa-solid fa-basket-shopping"></i>
                </Link>





                
            </div>
        </nav> */}
        






        </>
    )




}

export default NavbarMain;