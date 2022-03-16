import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import HeroBusiness from '../components/HeroBusiness'
import Auth from '../utils/auth';
import Moment from "react-moment";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SearchBCard from '../components/SearchBCard';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUSINESS, QUERY_ME, QUERY_ME_BASIC, QUERY_THOUGHT, QUERY_USER } from '../utils/queries';
import { ADD_THOUGHT } from '../utils/mutations';

const BusinessPage = () => {
    const loggedIn = Auth.loggedIn();
    const { id: businessParam } = useParams();
    const { loading, data } = useQuery(businessParam ? QUERY_BUSINESS : QUERY_ME, {
        variables: { id: businessParam }
    });
console.log(data)
    console.log(data?.business)
    const [thoughtText, setText] = useState('');
    const [addThought] = useMutation(ADD_THOUGHT,{refetchQueries:[QUERY_BUSINESS]})
   
  
    const { data:userData } = useQuery(QUERY_ME_BASIC);
   
    console.log(userData)
    
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addThought({
                variables: { thoughtText, businessId: businessParam },
            });
            // clear form value
            setText('');
            console.log(businessParam)
        } catch (e) {
            console.error(e);
        }
    };
    const business = businessParam ? [data?.business] : data?.me.businesses
    if (loading) {
        return <div>Loading...</div>
    };

    /*if(Auth.loggedIn() && Auth.getProfile().data._id === businessParam){
        return <Redirect to="/bpage" />
    }*/
    // console.log(data?.business.thoughts)
    return (
        <Container>

            <Row>
                <HeroBusiness></HeroBusiness>
            </Row>

            <Row>
                {!business ? <div>Sorry An error has Occurred</div> : business.map(data => (
                    <>
                        <Col xs={8} className='mt-2 mb-2  border border-dark border-5 rounded' key={data._id}>
                            <Row>
                                <h1>{`${data.title}`}</h1>
                            </Row>
                            <hr></hr>
                            <Row>
                                <h3>ABOUT THE BUSINESS:</h3>
                                <p>{data.description}</p>
                                <p>Lorem ipsum dolor sit amet, at pri libris iisque, menandri adipiscing sit ex. Vix ex eius decore eirmod. Omnis dicam ut pri, esse illud vim at. Brute fugit te his, id utinam impetus facilisis ius, alia minim mnesarchum et sit. An agam labore consulatu sea.</p>
                            </Row>
                            <hr></hr>
                            <Row>
                                <h4>Address:  {data.location}</h4>
                                <h4>Phone Number:  {data.phone}</h4>
                                <h4>Website: {data.links[0]}</h4>
                                <div>
                                <hr></hr>   
                                    <h3>Reviews</h3>
                                    {data.thoughts &&
                                        data.thoughts.map(thought => (
                                            <div key={thought._id} setOrdered={true} className="card mb-3">
                                            <div className="card-header" >
                                                {userData?.me.username}
                                                <Moment fromNow>
                                                     {thought.createdAt}
                                                </Moment>
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-0">
                                                        {thought.thoughtText}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                {/* <p>{data.thoughts.map(data=>(key={thoughts._id}))}</p>             */}
                            </Row>
                        </Col>
                    </>
                ))}
                {loggedIn ? <Col xs={4} className='mt-2 my-2 border border-dark border-5 rounded'>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Add a Review:</Form.Label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Let everyone know your thoughts!" rows="3" value={thoughtText} onChange={handleChange}></textarea>
                        </Form.Group>

                        <Button variant="primary" type="submit" className='mb-2'>
                            Submit
                        </Button>
                    </Form>
                </Col> : 'Log in or sign up to write a review'}


            </Row>

        </Container>
    )

}



export default BusinessPage;