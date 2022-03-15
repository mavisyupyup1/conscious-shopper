import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import MyBusinessForm from '../components/MyBusinessForm';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import { useQuery , useMutation} from '@apollo/client';
import { QUERY_USER, QUERY_ME ,QUERY_ME_BASIC} from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

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
  console.log("stripeId:", userData?.me.stripeId)
  console.log("Current user:", {loggedIn, paidUser, hasStripeId})

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
if(loggedIn && paidUser && !hasStripeId) {
  return <Redirect to="/signup/pay" />;
}
  // redirect to personal profile page if username is yours
  if (loggedIn && Auth.getProfile().data.username === userParam && paidUser && hasStripeId) {
    return <Redirect to="/profile" />;
  }

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
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>
      {userParam &&( 
        <button className="btn ml-auto" onClick={handleClick}>
        Add Friend 
      </button>
      )}
 <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <MyBusinessForm/>
        </div>
    </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">
          {!userParam&&<ThoughtForm/>}
      </div>
    </div>
  );
};

export default Profile;
