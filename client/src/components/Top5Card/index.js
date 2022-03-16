import React from 'react';

import { Card, Badge, Button, Col } from 'react-bootstrap';
import './top5card.css'

var Top5Card = function ({ data, setOrdered, images }) {

  const pill = () => {
    const pillValues = [];
    if(data.blackOwned){
      pillValues.push("Black Owned")
    } 
    if(data.womenOwned) {
      pillValues.push("Women Owned")
    }
    if(data.closing){
      pillValues.push("Closing")
    }
    if(data.momAndDad){
      pillValues.push("Mom & Dad")
    }
    return pillValues
  }

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
          <div style={{ height: "200px"}} >
            <Card.Img style={{ maxHeight: 200, objectFit: "cover"}} variant="top" src={`/images/${data.image}`} />
          </div>
            
                <Card.Body className="d-flex flex-column">
                    <div className="d-flex flex-column mb-2 justify-content-evenly">
                      <Card.Title className="text-center font-weight-bold">{data.title}</Card.Title>
                      <div className="d-flex flex-wrap">
                        {pill().map(element => (
                        <Badge pill className="m-2 p-2" variant="warning">
                        🔴 {element}
                        </Badge>
                        )
                        )}
                      </div>
                    </div>
                    <Card.Text className="text-secondary">{data.description}</Card.Text>
                    <Button
                    onClick={(e) =>{
                      e.preventDefault()
                      document.location.replace(`/bpage/${data._id}`);
                    }}
                    className="mt-auto font-weight-bold bgcolor"
                    
                    >
                    More Info  🔍
                    </Button>
        </Card.Body>
        </Card>

      </Col>

    
  );
}

export default Top5Card;