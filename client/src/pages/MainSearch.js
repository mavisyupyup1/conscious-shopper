import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBCard from '../components/SearchBCard';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_BUSINESS, QUERY_FEED } from '../utils/queries';

//import staticBusinesses from '../businessData.json'

const MainSearch = () => {
  const { filter: searchParam } = useParams();
  const [formState, setFormState] = useState(searchParam);
  const { loading, data: businessData } = useQuery(searchParam ? QUERY_FEED : QUERY_ALL_BUSINESS, {
    variables: { filter: searchParam }
  });

  const businesses = searchParam ? businessData?.feed : businessData?.allBusiness
  
  if(loading) {
    return <h2>LOADING...</h2>
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    document.location.replace(`/search/${formState}`)
    
  }

return (
    
    <Container>
        <Row>
          <Col xs={8} className='mb-1 mt-1'>
            {!businesses ? <h1>Nothing to Show for Now!!!</h1> :businesses.map(data => (
              <Row  className="m-1" key={`${data._id}`}>
                <SearchBCard data={data} setOrdered={true} />
              </Row>
            ))}  
          </Col>


          <Col xs={3} className=' mb-2 mt-2 border border-dark border-5 rounded'>
              <h1>FILTER</h1>
              <hr></hr>
              <h5 className="my-2">Current filter: {formState}</h5>
              <form onSubmit={handleFormSubmit}>
                <div>
                  <input type="radio" id="blackOwned" name="filterValue" value="blackOwned" className="m-1" onFocus={() => {setFormState("blackOwned")}} />
                  <label htmlFor="blackOwned">Black Owned</label>
                </div>
                <div>
                  <input type="radio" id="womenOwned" name="filterValue" value="womenOwned" className="m-1" onFocus={() => {setFormState("womenOwned")}} />
                  <label htmlFor="womenOwned">Women Owned</label>
                </div>
                <div>
                  <input type="radio" id="closing" name="filterValue" value="closing" className="m-1" onFocus={() => {setFormState("closing")}} />
                  <label htmlFor="closing">Closing</label>
                </div>
                <div>
                  <input type="radio" id="momAndDad" name="filterValue" value="momAndDad" className="m-1" onFocus={() => {setFormState("momAndDad")}} />
                  <label htmlFor="momAndDad">Mom & Dad</label>
                </div>
                <button type="submit" className="btn btn-dark m-2 d-inline-block">Submit</button>
              </form>
          </Col>
        </Row>

    </Container>
)

}

export default MainSearch;