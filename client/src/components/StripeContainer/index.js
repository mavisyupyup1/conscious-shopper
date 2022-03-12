import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PUBLIC_KEY ='pk_test_51KaouJLvQuwH79AnN7yEfoHv5B2ecn6fLOIgKx1siq59pTuioxmpCYDGsAMZtGWZ6eI63rSU9ckt9DZCPVjYNVnZ00iGHVuw44'
const stripePromise = loadStripe(PUBLIC_KEY)
export default function StripeContainer(){
    return(
       <Elements stripe={stripePromise}>
<PaymentForm> </PaymentForm>
       </Elements>
    )
}