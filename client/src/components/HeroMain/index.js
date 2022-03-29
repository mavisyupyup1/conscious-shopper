import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_LOCATION } from "../../utils/actions";
import { idbPromise } from "../../utils/idb";
import { Link } from 'react-router-dom';

import { Carousel, InputGroup, Dropdown, DropdownButton, Container, Row, Form, FloatingLabel, Overlay, Button, Nav, FormControl } from 'react-bootstrap';
import shopimage from '../../assets/images/shop1.jpeg'

import '../HeroMain/heromain.css'
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const HeroMain = () => {
    const [state, dispatch] = useStoreContext();
    const { location } = state;

    const handleChange = (event)=>{
        const { name, value } = event.target;
        dispatch({
            type: UPDATE_LOCATION,
            [name]: value
        })
    }

    const handleSearch = async event  =>{
        event.preventDefault();

        if(location.length > 1 ){
            idbPromise('location', 'put', location, 1);
            document.location.replace('/search/location')
        }
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
                
                    <Form onSubmit={handleSearch}>
                        <InputGroup id="citySearch" className="mb-3">
                            {/*<FloatingLabel controlId="floatingInput" label="Search a CITY to shop conscious!" className="search-input"></FloatingLabel>-->*/}
                            <FormControl  
                                aria-label="searchCity" 
                                placeholder="New York" 
                                name="location" 
                                onChange={handleChange} 
                            />
                            
                            <Button variant="primary" type="submit">
                                Search City
                            </Button>

                            <Button variant="info" className="">
                                <Nav.Link href="/search">Search All Business</Nav.Link>
                            </Button>
                        </InputGroup>
                    </Form>
                    
                    
                    
                    
                
                
                <h3 className="herotext">You are one step away from finding the right business</h3>
                </Carousel.Caption>
            </Carousel.Item>
            
        </Carousel>
            
        </>
    )

}

export default HeroMain;