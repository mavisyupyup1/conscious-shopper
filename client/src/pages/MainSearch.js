import React, { useEffect } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { FILTER_BUSINESS, UPDATE_BUSINESS, UPDATE_LOCATION } from '../utils/actions';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBCard from '../components/SearchBCard';
import { idbPromise } from '../utils/idb';


const MainSearch = () => {
  // destruct the state, and dispatch method from the useStoreContext method created in GlobalState
  const [state, dispatch] = useStoreContext();
  // destruct the businessProp, and business from passed in global State object, values are empty for now
  const { businessProp, business, location } = state
  const { filter: searchParam } = useParams();

  // use the useEffect hook to update each time data is changed or reloading on page
  useEffect(() => {
    // if searched by location run this set of state updates
    if(searchParam == "location"){
      idbPromise('location', 'get').then(locations => {
        dispatch({
          type: UPDATE_LOCATION,
          location: locations[0]
        })

        idbPromise('business', 'get').then(businesses => {
          const filteredBusiness = businesses.filter(data => {
            return (data.location.indexOf(locations[0]) > -1)
          })
          dispatch({
            type: UPDATE_BUSINESS,
            business: filteredBusiness
          })
        })
      })
      
    } else {
    // require an idbPromise to get all business data form idb store
    idbPromise('business', 'get').then(businesses => {
      // if businesses, and there is a search Parameter then filter out businesses that have that search paramater property
      if(searchParam && businesses){
        const filteredBusiness = businesses.filter(data => {
          return data[searchParam]
        })
        // then update the state for the business array 
        dispatch({
          type: UPDATE_BUSINESS,
          business: filteredBusiness
        })
      } else if(businesses) {
        // if there are businesses, but not search parameters then update the business state with all values gotten from idb store
        dispatch({
          type: UPDATE_BUSINESS,
          business: businesses
        })
      }
    })
    }
  }, [searchParam, dispatch])

  // when form is submitted change reload page with the current businessProp state as the parameter
  const handleFormSubmit = async event => {
    event.preventDefault();

    document.location.replace(`/search/${businessProp}`)
  }

  // when focues on each filter input it will update the current state for businessProp
  function handleChange(value) {
    dispatch({
      type: FILTER_BUSINESS,
      businessProp: value
    })
  } 

return (
    
    <Container>
        <Row>
          <Col xs={8} className='mb-1 mt-1'>
            {!business ? <h1>Nothing to Show for Now!!!</h1> :business.map(data => (
              <Row  className="m-1" key={`${data._id}`}>
                <SearchBCard data={data} setOrdered={true} />
              </Row>
            ))}  
          </Col>


          <Col xs={3} className=' mb-2 mt-2 border border-dark border-5 rounded'>
              <h1>FILTER</h1>
              <hr></hr>
              <h5 className="my-2">Current filter: {businessProp}</h5>

              <form id="filterForm"  onSubmit={handleFormSubmit}>
                <div>
                  <input type="radio" id="blackOwned" name="filterValue" value="blackOwned" className="m-1" onFocus={() => {handleChange("blackOwned")}} />
                  <label htmlFor="blackOwned">Black Owned</label>
                </div>
                <div>
                  <input type="radio" id="womenOwned" name="filterValue" value="womenOwned" className="m-1" onFocus={() => {handleChange("womenOwned")}} />
                  <label htmlFor="womenOwned">Women Owned</label>
                </div>
                <div>
                  <input type="radio" id="closing" name="filterValue" value="closing" className="m-1" onFocus={() => {handleChange("closing")}} />
                  <label htmlFor="closing">Closing</label>
                </div>
                <div>
                  <input type="radio" id="momAndDad" name="filterValue" value="momAndDad" className="m-1" onFocus={() => {handleChange("momAndDad")}} />
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