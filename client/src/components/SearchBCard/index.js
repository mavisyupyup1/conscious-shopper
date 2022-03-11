import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';


const SearchBCard = ({ data, setOrdered }) => {

return (
    
    <Container>

        <Row className='border border-dark border-5 rounded'>

            <Col xs={3} className='border border-dark border-2'> 
                <img src={data.image} ></img>
            </Col>
            <Col xs={9}>
                <Row>
                    <h3>{data.desc}</h3>
                </Row>
                <Row>
                    <Col>
                        <Button>Location 📍</Button>
                    </Col>
                    <Col>
                        <Button>PHONE NUMBER 📞</Button>
                    </Col>
                    <Col>
                        <Button>WEBSITE 🖥</Button>
                    
                    </Col>
                </Row>
                
            </Col>
            
            
        </Row>


    </Container>
)

}

export default SearchBCard;