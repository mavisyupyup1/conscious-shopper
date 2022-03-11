import React from 'react';

import { Container, Row, Col, Form, Button  } from 'react-bootstrap';

import HeroBusiness from '../components/HeroBusiness'

import businesses from '../businessData.json'


const BusinessPage = () => {

    return(



        <Container>
        
        <Row>


            <HeroBusiness></HeroBusiness>

        </Row>

        <Row>

            <Col xs={8} className='mt-2 mb-2  border border-dark border-5 rounded'>

                <Row>
                    <h1>BUSINESS NAME</h1>

                </Row>
                <hr></hr>
                <Row>
                    <h3>ABOUT THE BUSINESS:</h3>
                    <p>Lorem ipsum dolor sit amet, at pri libris iisque, menandri adipiscing sit ex. Vix ex eius decore eirmod. Omnis dicam ut pri, esse illud vim at. Brute fugit te his, id utinam impetus facilisis ius, alia minim mnesarchum et sit. An agam labore consulatu sea.</p>

                </Row>
                <hr></hr>
                <Row>
                    <h4>Address</h4>
                    <h4>Phone Number</h4>
                    <h4>Email</h4>
                    
                </Row>



            </Col>

            

            <Col xs={4} className='mt-2 mb-2 border border-dark border-5 rounded'>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" placeholder="" />  
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />  
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Review:</Form.Label>
                                <Form.Control type="text" placeholder="let us know your thoughts!" />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className='mb-2'>
                                Submit
                            </Button>
                            </Form>
                        </Col>
            
        </Row>

    </Container>
    )

    












}



export default BusinessPage;