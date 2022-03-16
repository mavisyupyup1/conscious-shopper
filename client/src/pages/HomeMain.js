import React from 'react';
import { useQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap';
import HeroMain from '../components/HeroMain';
import Top5Card from '../components/Top5Card';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import staticData from '../businessData.json';
import { QUERY_ALL_BUSINESS, QUERY_BUSINESS, QUERY_ME_BASIC } from '../utils/queries';

const HomeMain = () => {
  //const { loading, data } = useQuery(QUERY_BUSINESS);
  //const { data: userData } = useQuery(QUERY_ME_BASIC);
  // const loggedIn = Auth.loggedIn();
  // const paidUser = userData?.me.type === "PAID"
  // const hasStripeId = userData?.me.stripeId !== null
  // console.log("stripeId:", userData?.me.stripeId)
  // console.log("Current user:", {loggedIn, paidUser, hasStripeId})
  const { loading, data } = useQuery(QUERY_ALL_BUSINESS)

  if(loading){
    return (
      <div>Content is Loading...</div>
    )
  }
  const business = data?.allBusiness

  const results = business.filter(values => values.voteCount > 0)

  const images = staticData.slice(0, 2).map(data => data.image)
  return (
    <Container>
        <Row>
            <Col>
                <HeroMain/>
            </Col>
        </Row>
        <Row>
        {results.map(data => (
          <Col xs={3} className="mb-5" key={`${data._id}`}>
            <Top5Card data={data} images={images} setOrdered={true} />
          </Col>
        ))}
        </Row>
    </Container>

)

}

export default HomeMain;