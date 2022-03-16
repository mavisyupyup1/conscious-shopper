import React from 'react';
import Overlayphonebtn from '../Overlayphonebtn';

import { Container, Row, Col, Button, Image, Popover, OverlayTrigger} from 'react-bootstrap';

import { Link } from 'react-router-dom'

const imgcard = {
    width: "200px",
    objectFit: "cover"
}

const SearchBCard = ({ data }) => {

    const popover1 = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Call us!</Popover.Header>
          <Popover.Body>
          ☎️  { data.phone}
          </Popover.Body>
        </Popover>
    );
console.log(data.links)
    const popover2 = (
        <Popover  bsPrefix="flex bg-white border border-primary "id="popover-basic">
          <Popover.Header as="h3">Come Visit!</Popover.Header>
          <Popover.Body >
            <div>
                {data.location}
            </div>
            <iframe width="300" height="200" src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${data.location}`}  allowFullScreen loading="lazy"></iframe>
          </Popover.Body>
        </Popover>
    );
    
        

return (
    
    <Container>

        <Row className='border border-dark border-5 rounded'>

            <Col xs={3} className='border border-dark border-2 p-0'> 
                {/* <img src={data.image} style={imgcard}></img> */}
                <Image fluid  alt={data.name}
          src={`/images/${data.image}`}></Image>
            </Col>
            <Col xs={9} className=''>
                <Row>
                    <h3>{data.title}</h3>
                </Row>
                <Row className="container my-3">
                    {data.description}
                </Row>
                <Row className='justify-content-between'>
                    <Col>
                        {/* <Button className='m-0'>NUMBER 📞</Button> */}

                        {/* <Overlayphonebtn></Overlayphonebtn> */}

                        <OverlayTrigger trigger="click" placement="right" overlay={popover1}>
                            <Button variant="success">NUMBER 📞</Button>
                        </OverlayTrigger>
                    </Col>
                    <Col>
                    
                        <a href={data.link} target="_blank" /><Button className="p-1"><a href={data.links} target="_blank" rel="noopener noreferrer">Go to Website</a>🖥</Button>
                    </Col>
                    <Col>
                        {/* <Button className='m-0'>WEBSITE 🖥</Button> */}

                        <OverlayTrigger trigger="click" placement="right" overlay={popover2}>
                            <Button variant="success">Location 📍</Button>
                        </OverlayTrigger>
                    
                    </Col>
                    <Col>
                        <Link
                        to={`/bpage/${data._id}`}
                        style={{ fontweight: 700}}
                        className="btn btn-primary"
                        >More... 🗄</Link>{' '}
                    </Col>
                    
                </Row>
                
            </Col>
            
            
        </Row>


    </Container>
)

}

export default SearchBCard;