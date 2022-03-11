import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import shopimage from '../../assets/images/shop1.jpeg'


const Hcontainer = {
    backgroundImage: `url(${shopimage})`,
    height: "500px"
}

const HeroBusiness = ({ data, setOrdered }) => {

    return (

        <Container style={ Hcontainer} >
            <Row>
                
            </Row>


        </Container>




    )

    






}

export default HeroBusiness;