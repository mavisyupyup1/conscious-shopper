import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBCard from '../components/SearchBCard';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_BUSINESS } from '../utils/queries';

//import staticBusinesses from '../businessData.json'

const MainSearch = () => {
  const { loading, data: businessData } = useQuery(QUERY_ALL_BUSINESS);
  console.log(businessData)

  if(loading) {
    return <h2>LOADING...</h2>
  };

return (
    
    <Container>

        <Row>
            <Col xs={8}>

        {businessData.allBusiness.map(data => (
          <Row  className="m-1" key={`${data._id}`}>
            <SearchBCard data={data} setOrdered={true} />
          </Row>
        ))}  
        
        </Col>


        <Col xs={4} className=' border border-dark border-5 rounded'>
            <h1>FILTER</h1>
        </Col>




        </Row>

        

        


    </Container>
)

}

export default MainSearch;