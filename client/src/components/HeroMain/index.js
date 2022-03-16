import React,{useState} from "react";
import { Link } from 'react-router-dom';

import { Carousel, Container, Row, Form, FloatingLabel, Overlay, Button, Nav } from 'react-bootstrap';
import shopimage from '../../assets/images/shop1.jpeg'


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
                        <Button variant="outline-info" className="me-2">
                            <Nav.Link href="/search">MainSearch</Nav.Link>
                        </Button>
                </FloatingLabel>
                
                <h3>You are one step away from finding the right business</h3>
                </Carousel.Caption>
            </Carousel.Item>
            
        </Carousel>


            
            </>


    )

}

export default HeroMain;