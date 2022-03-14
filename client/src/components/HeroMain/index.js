import React,{useState} from "react";

import { Carousel, Container, Row, Form, FloatingLabel, Overlay } from 'react-bootstrap';
import shopimage from '../../assets/images/shop1.jpeg'
import { useQuery } from "@apollo/client";
import {QUERY_BUSINESS} from "../../utils/queries"

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
                <FloatingLabel style={{ color: "green" }} controlId="floatingInput" label="Search a CITY to shop conscious!" className="mb-3">
                    <Form.Control type="searchCity"
                    name="searchCity" 
                 placeholder="search" className="shadow p-3 mb-5 bg-body rounded" value={searchState.searchCity} onChange={handleChange}/>
                    <button type='submit' onClick={handleSearch}>search</button>
                </FloatingLabel>
                
                <h3>You are one step away from finding the right business</h3>
                </Carousel.Caption>
            </Carousel.Item>
            
        </Carousel>


            
            </>


    )

}

export default HeroMain;