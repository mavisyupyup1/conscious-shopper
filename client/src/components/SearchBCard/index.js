import React from 'react';

import Overlayphonebtn from '../Overlayphonebtn';

import { Container, Row, Col, Button, Image, Popover, OverlayTrigger} from 'react-bootstrap';







const imgcard = {
    width: "200px",
    objectFit: "cover"
}


const SearchBCard = ({ data }) => {

    const popover1 = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Call us!</Popover.Header>
          <Popover.Body>
          ☎️  { data.cel}
          </Popover.Body>
        </Popover>
    );

    const popover2 = (
        <Popover  bsPrefix="flex bg-white border border-primary "id="popover-basic">
          <Popover.Header as="h3">Call us!</Popover.Header>
          <Popover.Body >
          <iframe width="300" height="200" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2371.3516303703186!2d-74.0061245246478!3d40.71410503590677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b1eb14a639b%3A0x374d430af6453d28!2sBluestone%20Lane%20Tribeca%20Caf%C3%A9!5e0!3m2!1sen!2sus!4v1647219953392!5m2!1sen!2sus"  allowfullscreen="" loading="lazy"></iframe>
          </Popover.Body>
        </Popover>
    );
    
        

return (
    
    <Container>

        <Row className='border border-dark border-5 rounded'>

            <Col xs={3} className='border border-dark border-2 p-0'> 
                {/* <img src={data.image} style={imgcard}></img> */}
                <Image fluid src={data.image}></Image>
            </Col>
            <Col xs={9} className=''>
                <Row>
                    <h3>{data.title}</h3>
                </Row>
                <Row fluid className='justify-content-between'>
                    <Col>
                        <Button>{data.location} 📍</Button>
                    </Col>
                    <Col>
                        <Button>{data.phone} 📞</Button>
                    </Col>
                    <Col>
                        <Button><a href={data.links} target="_blank">Go to Website</a>🖥</Button>
                    
                    </Col>
                    <Col>
                        <Button value={data._id} onClick={e=> {
                            e.preventDefault();
                            
                        }}>Go To Business Page 🗄</Button>
                        <Button className='m-0'>Location 📍</Button>
                    </Col>
                    <Col>
                        {/* <Button className='m-0'>NUMBER 📞</Button> */}

                        {/* <Overlayphonebtn></Overlayphonebtn> */}

                        <OverlayTrigger trigger="click" placement="right" overlay={popover1}>
                            <Button variant="success">NUMBER 📞</Button>
                        </OverlayTrigger>


                        


                    </Col>
                    <Col>
                        {/* <Button className='m-0'>WEBSITE 🖥</Button> */}

                        <OverlayTrigger trigger="click" placement="right" overlay={popover2}>
                            <Button variant="success">WEBSITE 🖥</Button>
                        </OverlayTrigger>
                    
                    </Col>
                    <Col>
                        <Button className='m-0'>MORE... 🗄</Button>
                    
                    </Col>
                </Row>
                
            </Col>
            
            
        </Row>


    </Container>
)

}

export default SearchBCard;