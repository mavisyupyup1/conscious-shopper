import React from 'react';
import { Container, Row, Col, Button, Image} from 'react-bootstrap';

const imgcard = {
    width: "200px",
    objectFit: "cover"
}


const SearchBCard = ({ data }) => {

return (
    
    <Container>

        <Row className='border border-dark border-5 rounded'>

            <Col xs={3} className='border border-dark border-2'> 
                {/* <img src={data.image} style={imgcard}></img> */}
                <Image fluid src={data.image}></Image>
            </Col>
            <Col xs={8}>
                <Row>
                    <h3>{data.title}</h3>
                </Row>
                <Row>
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
                    
                    </Col>
                </Row>
                
            </Col>
            
            
        </Row>


    </Container>
)

}

export default SearchBCard;