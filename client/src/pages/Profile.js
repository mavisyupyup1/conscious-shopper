import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

// import ThoughtList from '../components/ThoughtList';
import MyBusinessForm from '../components/MyBusinessForm';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import { useQuery , useMutation} from '@apollo/client';
import { QUERY_USER, QUERY_ME ,QUERY_ME_BASIC} from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import { Card, Badge, Button, Col, Container, Row } from 'react-bootstrap';

import './Profile.css'

const Profile = (props) => {
  const { username: userParam } = useParams();
  const [addFriend] =useMutation(ADD_FRIEND)
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const loggedIn = Auth.loggedIn();
  const paidUser = userData?.me.type === "PAID"
  const hasStripeId = userData?.me.stripeId !== null

  const user = data?.me || data?.user || {};

  const handleClick =async()=>{
    try{
      await addFriend({
        variables: {id: user._id}
      })
    } catch(e){
      console.error(e)
    }
  }

  // redirect to personal profile page if username is yours
  // if (loggedIn  && paidUser && hasStripeId) {
  //   return <Redirect to="/profile" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


  return (

    <Container className=''>   
    <div>

      {/*  VIEWING USER PROFILE - ROW*/}
      <div className="row m-4 card border border-dark border-5 rounded">
        <h2 className="text-secondary text-center">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        {userParam &&( 
          <button className="btn ml-auto" onClick={handleClick}>
          Add Friend 
          </button>
        )}
      </div>
      
      {/*  BUSINESS FORM - ROW */}
      {loggedIn && paidUser && hasStripeId?(<><div className="row justify-content-center">
        <div className=''>
        <MyBusinessForm/>
        </div>      
      </div></>
      ):null}
      
      {/* THOUGHT LIST  */}
      <div className="flex-row justify-space-between mb-3">
        {/* <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          /> 
        </div> */}

                

      {/* FRIENDS LIST */}

      <div className="row justify-content-center">

        <div className=''>
          <div className=" border border-dark border-5 rounded ">
            <FriendList
              username={user.username}
              friendCount={user.friendCount}
              friends={user.friends}
            />
          </div>
          </div>
            
          </div>
        </div>

        {/* <div className="row justify-content-center">
          
          <div className='col-8'>
            <div className=" border border-dark border-5 rounded " style={{width: "45rem"}}>
              <div className="m-3">
                {!userParam&&<ThoughtForm/>}
              </div>
            </div>
          </div>
        </div>
         */}

      

    </div>


      


    </Container>


    
  )
};

export default Profile;
