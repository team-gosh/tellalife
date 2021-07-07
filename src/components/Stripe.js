import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

function Stripe() {
  return (
    <StripeProvider apiKey="pk_test_51JAB1JHBArI6S55aLwEi66sv52XEF6fwf4DNTTXGFK0t0EKLSz18K28wyTZ5Urr7wtBi242Ijuv556z5GpGTBAUU00FD4wtQKX">
      <div className="container">
        <h3 className="my-4">React Stripe Element Sample</h3>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
  );
}

export default Stripe;
