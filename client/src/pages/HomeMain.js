import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import HeroMain from '../components/HeroMain';
import Top5Card from '../components/Top5Card';
import businesses from '../businessData.json'
import { QUERY_BUSINESS,QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';


const HomeMain = () => {
  //const { loading, data } = useQuery(QUERY_BUSINESS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const loggedIn = Auth.loggedIn();
  const paidUser = userData?.me.type === "PAID"
  const hasNoStripeId = userData?.me.hasStripeId === null
  console.log("stripeId:", userData?.me.stripeId)
  console.log("Current user:", {loggedIn, paidUser, hasNoStripeId})
return (
    <Container fluid>
        <Row>
            <Col>
                <HeroMain/>
            </Col>
        </Row>
        <Row>
        {businesses.slice(0, 4).map(data => (
          <Col xs={3} className="mb-5" key={`${data.id}`}>
            <Top5Card data={data} setOrdered={true} />
          </Col>
        ))}
        </Row>
    </Container>

)

}

export default HomeMain;