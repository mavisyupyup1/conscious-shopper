import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import HeroBusiness from '../components/HeroBusiness'
import Auth from '../utils/auth';

import { Container, Row, Col, Form, Button  } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUSINESS, QUERY_ME } from '../utils/queries';
import { NEW_VOTE, UPDATE_VOTE } from '../utils/mutations';

const BusinessPage = () => {
    const [vote] = useMutation(NEW_VOTE);
    const [updateVote] = useMutation(UPDATE_VOTE);
    const { id: businessParam } = useParams();
    const { loading, data } = useQuery(businessParam ? QUERY_BUSINESS : QUERY_ME, {
        variables: { id: businessParam }
    });

    const business = businessParam ? [data?.business] : data?.me.businesses
    if(loading){
        return <div>Loading...</div>
    };

    /*if(Auth.loggedIn() && Auth.getProfile().data._id === data.businesses.userId){
        return <Redirect to="/bpage" />
    }*/

    const handleSaveVote = async(voteType, businessId) => {
       const userId = Auth.getProfile().data._id
       const matches = data?.business.votes.filter(userVotes => {
           return userId == userVotes.userId && voteType == userVotes.voteType
       });

       if(matches.length > 0){
           console.log("User has already voted")
           return;
       }

       const typeMatches = data?.business.votes.filter(userVotes => {
           return userId == userVotes.userId && voteType != userVotes.voteType
       });

       if(typeMatches.length > 0){
           const id = typeMatches[0]._id
           try{
                const { data } = await updateVote({
                variables: {voteType: voteType, id: id }
                })
                document.location.reload();
                return data 
            } catch(err){
                console.error(err)
            }
       }
        
        try {
            await vote({
                variables: { voteType: voteType, businessId: businessId }
            });
            document.location.reload();
        } catch(err) {
            console.error(err)
        }
    }

    return(
        <Container>
        
        <Row>
            <HeroBusiness></HeroBusiness>
        </Row>

        <Row>
            {!business ? <div>Update your account, or create a business to see this page</div> : business.map(data => (
                <>
                    <Col xs={8} className='mt-2 mb-2  border border-dark border-5 rounded' key={`${data._id}`}>
                        <Row>
                            <h1>{data.title}</h1>
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
                            <h4>VoteCount: {data.voteCount}</h4> 
                            {Auth.loggedIn() ? (
                            <Col className="d-flex" >
                                <Button 
                                onClick={()=>{
                                    const businessId=`${data._id}`
                                    handleSaveVote('downVote', businessId )
                                }}
                                variant="outline-light" className="mx-3" style={{width:"20px"}}>
                                    <img className="justify-content-center" style={{height: "25px"}} src={require('../assets/images/dislike.png')} />
                                </Button>

                                <Button 
                                onClick={()=>{
                                    const businessId=`${data._id}`
                                    handleSaveVote('upVote', businessId )
                                }}
                                variant="outline-light" className="mx-3"style={{width:"20px"}}>
                                    <img className="justify-content-center" style={{height: "25px"}} src={require('../assets/images/like.png')} />
                                </Button>
                            </Col>
                            ) : ("")}
                        </Row>
                    </Col>
                </>
            ))}

            <Col xs={4} className='mt-2 my-2 border border-dark border-5 rounded'>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" placeholder="" />  
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />  
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Review:</Form.Label>
                                <Form.Control type="text" placeholder="let us know your thoughts!" />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className='mb-2'>
                                Submit
                            </Button>
                            </Form>
                        </Col>
            
        </Row>

    </Container>
    )

}



export default BusinessPage;