import React, { useEffect } from 'react';
// import stored global state context
import { useStoreContext } from '../utils/GlobalState';
// import actions to be used to change global state
import { UPDATE_BUSINESS, UPDATE_USER } from '../utils/actions'
import { useQuery } from '@apollo/client'
import { Container, Row, Col ,Image} from 'react-bootstrap';
import HeroMain from '../components/HeroMain';
import Top5Card from '../components/Top5Card';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { QUERY_ALL_BUSINESS, QUERY_ME } from '../utils/queries';
import { idbPromise } from '../utils/idb';
import './HomeMain.css'

const HomeMain = () => {
  //const { loading, data } = useQuery(QUERY_BUSINESS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  // const loggedIn = Auth.loggedIn();
  // const paidUser = userData?.me.type === "PAID"
  // const hasStripeId = userData?.me.stripeId !== null
  // console.log("stripeId:", userData?.me.stripeId)
  // console.log("Current user:", {loggedIn, paidUser, hasStripeId})
  
  // destructure the state from the stored context
  const [state, dispatch] = useStoreContext();
  // destructure only the business , and me properties from global state
  const { business, me } = state;
  const { loading, data: businessData } = useQuery(QUERY_ALL_BUSINESS);
  const { data: userData } = useQuery(QUERY_ME);
  

  // use the react useEffect hook to ask if the queried data exists, and or has been changed from apollo cache, and add it to the Global State
  useEffect(() => {
    // if BusinessData exists or has changed from the response of the useQuery, then use dispatch
    if(businessData){
      dispatch({
        type: UPDATE_BUSINESS,
        business: businessData?.allBusiness
      });
      businessData?.allBusiness.forEach(business => {
        idbPromise('business', 'put', business);
      })
    }
    // if userData exists or has changed from the response of the useQuery, then use dispatch
    if(userData){
      dispatch({
        type: UPDATE_USER,
        me: userData?.me
      });
      idbPromise('me', 'put', userData?.me)
    }
  }, [businessData, userData, dispatch])


  const loggedIn = Auth.loggedIn();
  const paidUser = me.type === "PAID"
  const hasStripeId = me.stripeId !== null
  if (loggedIn && paidUser && !hasStripeId){
    return <Redirect to="/signup/pay" />;
  }
  if(loading){
    return (
      <div>Content is Loading...</div>
    )
  }

  // filter method to stort through global State of all business and see which ones are the top voted
  const results = business.filter(values => values.voteCount > 0)

  return (
    <Container>
        <Row>
            <Col>
                <HeroMain />
            </Col>
        </Row>
        <Row className='mobile-cardsection'>
        {results.map(topBusiness => (
          <Col className="mobile-business-card col-3 mb-5" key={`${topBusiness._id}`}>
            <Top5Card data={topBusiness} setOrdered={true} />   
          </Col>
        ))}
        </Row>
    </Container>

)

}

export default HomeMain;