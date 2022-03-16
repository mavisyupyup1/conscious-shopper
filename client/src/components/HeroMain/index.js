import React,{useState} from "react";

import { Carousel, Container, Row, Form, FloatingLabel, Overlay, Button } from 'react-bootstrap';
import shopimage from '../../assets/images/shop1.jpeg'
import { useQuery } from "@apollo/client";
import {QUERY_BUSINESS} from "../../utils/queries"

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
                <Carousel.Caption>
                <FloatingLabel controlId="floatingInput" label="Search a CITY to shop conscious!" className="search-input mb-3">
                    <Form.Control type="searchCity"
                    name="searchCity" 
                 placeholder="search" className="shadow p-3 mb-5 bg-body rounded" value={searchState.searchCity} onChange={handleChange}/>
                    <Button variant="primary" className="button-search" type='submit' onClick={handleSearch}>Search!</Button>
                </FloatingLabel>
                
                <h3 className="herotext">You are one step away from finding the right business</h3>
                </Carousel.Caption>
            </Carousel.Item>
            
        </Carousel>


            
            </>


    )

}

export default HeroMain;