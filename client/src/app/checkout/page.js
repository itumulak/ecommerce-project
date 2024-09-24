"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import convertToSubcurrency from '@/lib/covertToSubcurrency';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const page = () => {
  const total = useSelector(state => state.cart.total)
  const [clientSecret, setClientSecret] = useState("")
  const [dpmCheckerLink, setDpmCheckerLink] = useState("")
  const [comfirmed, setConfirmed] = useState(false)

  useEffect(() => {
    console.log(total, typeof(total));
    
    setConfirmed(new URLSearchParams(window.location.search).get("payment_intent") === "succeeded")
  }, [])

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( { amount: convertToSubcurrency(total) } ),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink)
      })
      .catch((error) => {
        console.error("Error fetching clientSecret:", error);
      });
  }, []);

  const options = {
    mode: "payment",
    currency: "usd",
    amount: convertToSubcurrency(total)
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} dpmCheckerLink={dpmCheckerLink} />
    </Elements>
  )
}

export default page