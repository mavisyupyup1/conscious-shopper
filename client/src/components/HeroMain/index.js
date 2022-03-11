import React from "react";

import { Carousel, Container, Row, Form, FloatingLabel, Overlay } from 'react-bootstrap';

import shopimage from '../../assets/images/shop1.jpeg'



const HeroMain = () => {

    return (
        <>

        <Carousel style={{ height: "80%" }}>
            <Carousel.Item interval={9000} >
                <img
                className="d-block"
                src={shopimage}
                alt="First slide"
                
                
                />
                <Carousel.Caption>
                <FloatingLabel style={{ color: "green" }} controlId="floatingInput" label="Search a CITY to shop concious!" className="mb-3">
                    <Form.Control type="test" placeholder="search" className="shadow p-3 mb-5 bg-body rounded"/>
                </FloatingLabel>
                <h3>You are one step away from finding the right business</h3>
                </Carousel.Caption>
            </Carousel.Item>
            
            </Carousel>


            
            </>


    )

}

export default HeroMain;