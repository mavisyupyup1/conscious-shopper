import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_THOUGHT, CHANGE_VOTE,UPDATE_BUSINESS, UPDATE_USER, UPDATE_CURRENT_BUSINESS } from '../utils/actions'
import { Redirect, useParams,Link } from 'react-router-dom'
//import HeroBusiness from '../components/HeroBusiness'
import Auth from '../utils/auth';
import Moment from "react-moment";
import { Container, Row, Col, Form, Button,Card } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUSINESS, QUERY_THOUGHT, QUERY_USER } from '../utils/queries';
import { ADD_THOUGHT, NEW_VOTE, UPDATE_VOTE } from '../utils/mutations';
import { idbPromise } from '../utils/idb'

const BusinessPage = () => {
    // state and dispatch gotten from the store context
    const [state, dispatch] = useStoreContext();
    const { me, business, currentBusiness, votes, thoughts } = state;
    const { id: businessParam } = useParams();

    const loggedIn = Auth.loggedIn();
    const [thoughtText, setText] = useState('');
    const [vote] = useMutation(NEW_VOTE);
    const [updateVote] = useMutation(UPDATE_VOTE);
    const [addThought] = useMutation(ADD_THOUGHT,{refetchQueries:[QUERY_BUSINESS]})

    useEffect(() => {
        // if there is a parameter for business then start promise requsst to ask for business data
        if(businessParam){
            idbPromise('business', 'get').then(businesses => {
                if(businesses){
                    // filter out businesses in returned data that only matches the business parameter's id.
                    const filteredBusiness = businesses.filter(business => {
                        return business._id == businessParam
                    })
                    // changes the id for the current business state
                    dispatch({
                        type: UPDATE_CURRENT_BUSINESS,
                        currentBusiness: businessParam
                    });
                    // update the business state with the return filtered business data
                    dispatch({
                        type: UPDATE_BUSINESS,
                        business: filteredBusiness
                    })
                } else {
                    // if there is no business data, redirect user to the home page to either re-load business datam or create some data if it doesn't exist.
                    document.location.replace('/')
                }
            });
        } else if (!businessParam) {
            // if there is no business parameter then retrieve data from the idb data store
            idbPromise('me', 'get').then(user => {
                // if there is no user data for some reason then redirect to the login page.
                if(!user){
                    alert('You need to be logged in to view this page');
                    return <Redirect to="/login" />  
                } else if(user){
                    // once user data is established then retrieve all users business data
                    const businessOwned = user[0].businesses
                    dispatch({
                        type: UPDATE_USER,
                        me: user
                    });
                    dispatch({
                        type: UPDATE_BUSINESS,
                        business: businessOwned
                    });
                }
            })
        }
    }, [dispatch, businessParam]) 
    
   /* const { loading, data } = useQuery(businessParam ? QUERY_BUSINESS : QUERY_ME, {
        variables: { id: businessParam }
    });

    const { data:userData } = useQuery(QUERY_ME_BASIC);*/
 
   
   /* if (loading) {
        return <div>Loading...</div>
    };*/
    
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
        } catch (e) {
            console.error(e);
        }
    };
    

    /*if(Auth.loggedIn() && Auth.getProfile().data._id === data.businesses.userId){
        return <Redirect to="/bpage" />
    }*/

    // function to save and update votes, possibly can be updated to rely on useffect and state with more time
    const handleSaveVote = async(voteType, businessId) => {
       const userId = Auth.getProfile().data._id
       const matches = business[0].votes.filter(userVotes => {
           return userId === userVotes.userId && voteType === userVotes.voteType
       });

       if(matches.length > 0){
           console.log("User has already voted")
           return;
       }

       const typeMatches = business[0].votes.filter(userVotes => {
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
                {!business ? <div> There is no business Data. Upgrade your account, or create a business to get full use of this page!!</div> : business.map(data => (
                    <>
            
                        <Col xs={8} className='mt-2 mb-2  border border-dark border-5 rounded' key={`${data._id}`}>
                            <Row>
                                <h1>{data.title}</h1>
                            </Row>
                            <hr></hr>
                            <Row>
                            <Card.Img variant="top" src={`../images/${data.image}`} />
                                <h3>ABOUT THE BUSINESS:</h3>
                                <p>{data.description}</p>
                                <p>Lorem ipsum dolor sit amet, at pri libris iisque, menandri adipiscing sit ex. Vix ex eius decore eirmod. Omnis dicam ut pri, esse illud vim at. Brute fugit te his, id utinam impetus facilisis ius, alia minim mnesarchum et sit. An agam labore consulatu sea.</p>
                            </Row>
                            <hr></hr>
                            <Row>
                                <h4>Address:  {data.location}</h4>
                                <h4>Phone Number:  {data.phone}</h4>
                               
                                
                                <h4>Website:{data.links ? ( <><Button className="btn btn-primary" onClick={e => {e.preventDefault();window.location.assign(`${data.links[0]}`) }}  target="_blank">Website</Button> </>):("")}</h4>
                                
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
                                <div>
                                <hr></hr>   
                                    <h3>Reviews</h3>
                                    {data.thoughts &&
                                        data.thoughts.map(thought => (
                                            <div key={thought._id}  className="card mb-3">
                                            <div className="card-header" >
                                                <span>{me.username} ||  </span>
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
                   
            </Row>
            

            <Row>
                {loggedIn ? <Col xs={4} className='mt-2 my-2 border border-dark border-5 rounded'>
                    <Form onSubmit={handleFormSubmit}>
                       
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