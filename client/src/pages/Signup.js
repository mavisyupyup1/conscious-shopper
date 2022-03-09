import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import {loadStripe} from '@stripe/stripe-js'
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';

import Auth from '../utils/auth';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const [getCheckout,{data}] = useLazyQuery(QUERY_CHECKOUT)

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(()=>{
    if(data){
        stripePromise.then((res)=>{
            res.redirectToCheckout({sessionId:data.checkout.session})
        })
    }
},[data]);

function submitCheckout() {
  const productIds = [];

  state.cart.forEach((item) => {
    for (let i = 0; i < item.purchaseQuantity; i++) {
      productIds.push(item._id);
    }
  });

  getCheckout({
    variables: { products: productIds },
  });
}



  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
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
               <input
                className="dropdown"
                placeholder="account type"
                name="account"
                type="account"
                id="account"
                value={formState.account}
                onChange={handleChange}
              />

              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
