"use client"
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const page = () => {
  const items = useSelector(state => state.cart.products)

  const fetchClientSecret = useCallback(async () => {
    return await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( { items } ),
    })
      .then((res) => {
        if (!res.ok) {  
          throw new Error(res.statusText);
        }

        return res.json()
      })
      .then((data) => data.clientSecret)
      .catch((error) => {
        console.error("Error fetching clientSecret:", error);
      });
  }, []);
  
  const options = {fetchClientSecret}

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout/>
    </EmbeddedCheckoutProvider>
  )
}

export default page