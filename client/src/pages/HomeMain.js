import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import HeroMain from '../components/HeroMain';

const HomeMain = () => {

return (
    
    <Container fluid>
        <Row>
            <Col>
                <HeroMain/>
            </Col>
        </Row>
        <Row>
            <Col>1 of 1</Col>
        </Row>
    </Container>

)

}

export default HomeMain;