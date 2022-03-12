           import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {Redirect} from "react-router-dom"

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    type:'free'
  });
 const[paidUserSignedUp,setPaidUserSignedUp]=useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
if(formState.type=== "free"){
  Auth.login(data.addUser.token);
}
else if(formState.type=== "paid"){
  console.log("paid account")
  setPaidUserSignedUp(true)

} 
else {
  throw new Error("Content State Unknown User Choice")
}
     

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
             <label htmlFor="type">Choose An Account Type:</label>
<select className="form-input" name="type" id="type" onChange={handleChange}>
  <option value="free">Customer Account (Free)</option>
  <option value="paid">Business Account ($1.99/months)</option>
</select>
{/* {formState.account=== "paid"  &&
  <>
   <Elements stripe={stripePromise}>
<PaymentForm/>
</Elements>
</>
} */}
<button className="btn d-block w-100" type="submit">
{formState.type=== "paid" ?(<span>Pay and Submit</span>):(<span>Submit</span>)}
{/* Submit */}
</button>
</form>          
            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
      {
        paidUserSignedUp && <Redirect to='/signup/pay'/>
      }
    </main>
  );
};

export default Signup;
