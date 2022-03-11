import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import SearchBCard from '../components/SearchBCard'

import businesses from '../businessData.json'

const MainSearch = (data) => {

return (
    
    <Container>

        <Row >
        {businesses.map(data => (
          <Row  className="mb-3" key={`${data.id}`}>
            <SearchBCard data={data} setOrdered={true} />
          </Row>
        ))}
            
        </Row>


    </Container>
)

}

export default MainSearch;