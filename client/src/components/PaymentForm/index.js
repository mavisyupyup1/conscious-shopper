import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

import { ADD_STRIPE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const SplitForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [addStripe] = useMutation(ADD_STRIPE)

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    try {
      const card = elements.getElement(CardNumberElement);
      const stripeToken = await stripe.createToken(card);
      console.log(stripeToken.token.id)
      const stripeId = stripeToken.token.id
      console.log("stripeId =", stripeId)
      try {
        await addStripe({
          variables: { stripeId },
        })

      }
      catch (err) {
        console.error(err)
      }
    }
    catch (err) {
      console.error(err)
    }
  };

  return (
    <>

      <form onSubmit={handleSubmit}>
        <label>
          Card number
        </label>   <CardNumberElement />
        <label>
          Expiration date
        </label><CardExpiryElement />
        <label>
          CVC
        </label>   <CardCvcElement />
        <button className="btn d-block w-100" type="submit">
          Pay

        </button>
      </form>


    </>
  );
}
export default SplitForm;
