import React, { useMemo , useState} from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import {ADD_STRIPE}from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const SplitForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [success,setSuccess]=useState(false)
  const [addStripe,{error}]=useMutation(ADD_STRIPE)
  const handleSubmit = async event => {
  event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    try {
      const card = elements.getElement(CardNumberElement);
      const token  = await stripe.createToken(card);
      
     const stripeId = token.token.id;
      
     await addStripe({
       variables:{stripeId: stripeId}
     })
 
    } catch(err) {
      console.error(err)
    }
  };


  return (
    <>
    {!success ?
   ( <form onSubmit={handleSubmit}>
      <label>
        Card number
      </label>   <CardNumberElement/>
      <label>
        Expiration date
      </label><CardExpiryElement/>
      <label>
        CVC
      </label>   <CardCvcElement/>
      <button className="btn d-block w-100" type="submit">
Pay

</button>
    </form>):
   ( <div>
      <h2> You have successfully signed up as a business owner. 
      You will be redirected to profile page in 3 seconds. </h2>
    </div>)
}


</>)
};

export default SplitForm;
