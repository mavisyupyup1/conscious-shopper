import React from 'react';
import Auth from '../../utils/auth'

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
                            <Nav.Link href="/profile">My Profile</Nav.Link>
                        </Button>
                        {loggedIn && paidUser && hasStripeId?(<><div className="row justify-content-center">
        <div className='col-9'>
        <Button variant="outline-secondary" className="me-2">
                            <Nav.Link href="/bpage">Business Page</Nav.Link>
                        </Button>
        </div>      
      </div></>
      ):null}
                       
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