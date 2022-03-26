import React,{useState} from "react";
import { Link } from 'react-router-dom';

import { Carousel, Container, Row, Form, FloatingLabel, Overlay, Button, Nav } from 'react-bootstrap';
import shopimage from '../../assets/images/shop1.jpeg'


import '../HeroMain/heromain.css'

const HeroMain = () => {
const [searchState,setSearchState] = useState({
 searchCity:''
});

const handleChange = (event)=>{

    const { name, value } = event.target;

    setSearchState({
      ...searchState,
      [name]: value,
    });
 
}
const handleSearch = async event =>{
event.preventDefault()
console.log("Clicked")

}
    return (
        <>

        <Carousel >
            <Carousel.Item interval={9000} >
                <img
                className="d-block w-100"
                src={shopimage}
                alt="First slide"
                />
                <Carousel.Caption className="mobile-caption">
                    <FloatingLabel controlId="floatingInput" label="Search a CITY to shop conscious!" className="search-inputtext mb-3">
                        <Form.Control type="searchCity"
                        name="searchCity" 
                        placeholder="search" className="shadow p-3 bg-body rounded mainsearch-input" value={searchState.searchCity} onChange={handleChange}/>
                        {/* <Button variant="primary" className="button-search" type='submit' onClick={handleSearch}>Search!</Button> */}
                        <button className="btn--outline">
                            <Nav.Link href="/search" className="mainsearch-link">MainSearch</Nav.Link>
                        </button>
                    </FloatingLabel>
                
                    <h3 className="herotext">You are one step away from finding the right business</h3>
                </Carousel.Caption>
            </Carousel.Item>
            
        </Carousel>
            
        </>
    )

}

export default HeroMain;