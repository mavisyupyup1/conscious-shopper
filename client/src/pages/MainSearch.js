import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import SearchBCard from '../components/SearchBCard'

import businesses from '../businessData.json'



const MainSearch = () => {

return (
    
    <Container>

        <Row>
            <Col xs={8} className='mb-1 mt-1'>

        
        {businesses.slice(0, 5).map(data => (
          <Row  className="m-1" key={`${data.id}`}>
            <SearchBCard data={data} setOrdered={true} />
          </Row>
        ))}  
        
        </Col>


        <Col xs={3} className=' mb-2 mt-2 border border-dark border-5 rounded'>
            <h1>FILTER</h1>
        </Col>




        </Row>

        

        


    </Container>
)

}

export default MainSearch;