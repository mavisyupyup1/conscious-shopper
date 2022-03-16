import React from 'react';
import { useQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap';

import HeroMain from '../components/HeroMain';
import Top5Card from '../components/Top5Card';
import staticData from '../businessData.json';
import { QUERY_ALL_BUSINESS } from '../utils/queries';

const HomeMain = () => {
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