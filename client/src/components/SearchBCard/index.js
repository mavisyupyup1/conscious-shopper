import React from 'react';

import { Container, Row, Col, Button, Image} from 'react-bootstrap';


const imgcard = {
    width: "200px",
    objectFit: "cover"
    
}


const SearchBCard = ({ data, setOrdered }) => {

return (
    
    <Container>

        <Row className='border border-dark border-5 rounded'>

            <Col xs={3} className='border border-dark border-2'> 
                {/* <img src={data.image} style={imgcard}></img> */}
                <Image fluid src={data.image}></Image>
            </Col>
            <Col xs={8}>
                <Row>
                    <h3>{data.desc}</h3>
                </Row>
                <Row>
                    <Col>
                        <Button>Location 📍</Button>
                    </Col>
                    <Col>
                        <Button>NUMBER 📞</Button>
                    </Col>
                    <Col>
                        <Button>WEBSITE 🖥</Button>
                    
                    </Col>
                    <Col>
                        <Button>MORE... 🗄</Button>
                    
                    </Col>
                </Row>
                
            </Col>
            
            
        </Row>


    </Container>
)

}

export default SearchBCard;