import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import HeroMain from '../components/HeroMain';
import Top5Card from '../components/Top5Card';
import businesses from '../businessData.json'

const HomeMain = () => {

return (
    <Container fluid>
        <Row>
            <Col>
                <HeroMain/>
            </Col>
        </Row>
        <Row>
        {businesses.slice(0, 4).map(data => (
          <Col xs={3} className="mb-5" key={`${data.id}`}>
            <Top5Card data={data} setOrdered={true} />
          </Col>
        ))}
        </Row>
    </Container>

)

}

export default HomeMain;