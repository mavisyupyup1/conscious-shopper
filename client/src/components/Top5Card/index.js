import React from 'react';

import { Card, Badge, Button, Col } from 'react-bootstrap';

var Top5Card = function ({ data, setOrdered, images }) {

  return (

    
      <Col>

        {/* <Card className="h-100 shadow-sm bg-white rounded mt-2">
        <Card.Img variant="top" src={data.image} />
        <Card.Body className="d-flex flex-column">
            <div className="d-flex mb-2 justify-content-between">
            <Card.Title className="mb-0 font-weight-bold">{data.name}</Card.Title>
            <Badge pill className="mb-1" variant="warning">
            🔴 {data.type}
            </Badge>
            </div>
            <Card.Text className="text-secondary">{data.desc}</Card.Text>
            <Button
            onClick=""
            className="mt-auto font-weight-bold"
            variant="success"
            block
            >
            More Info  🔍 
            </Button>
        </Card.Body>
        </Card> */}

        <Card className=" shadow-sm bg-white rounded mt-2">
            <Card.Img variant="top" src={images.slice(0, 1)} />
                <Card.Body className="d-flex flex-column">
                    <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="mb-0 font-weight-bold">{data.title}</Card.Title>
                    <Badge pill className="mb-1" variant="warning">
                    🔴 {data.womenOwned}
                    </Badge>
                    </div>
                    <Card.Text className="text-secondary">{data.description}</Card.Text>
                    <Button
                    onClick={(e) =>{
                      e.preventDefault()

                      console.log('something inocuos')
                    }}
                    className="mt-auto font-weight-bold"
                    variant="success"
                    >
                    More Info  🔍 
                    </Button>
        </Card.Body>
        </Card>

      </Col>

    
  );
}

export default Top5Card;