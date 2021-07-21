import React from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";

export default function CheckoutForm (props) {
	const { 
    user,
    approvedToConfirmed,
    reservation
  } = props;
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
    try {
      const paymentIntentReturn = await API.graphql({
        query: mutations.processOrder,
        variables: {
          input: {
            id: user.id,
            payment_method_type: [ "card" ],
  
            amount: reservation.price,
            currency: "JPY",
  
            application_fee_amount: 123,
  
            stripeAccount: reservation.stripeAccount,
          },
        },
      });
  
      const secret = paymentIntentReturn.data.processOrder;
  
      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
          },
        },
      });
  
      if (result.error) {
        // we actually need to figure out how to set the test account payable
        console.log(result.error);
        console.log("payment is succeeded?");
        // Delete when working
        approvedToConfirmed(reservation.id)
        return {
          status: "succeeded",
          //status:"failed"
        };
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          console.log("payment is succeeded");
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
          approvedToConfirmed(reservation.id)
          return {
            status: "succeeded",
          };
        }
      }
    } catch (error) {
      console.error(error.message);
    }
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardSection />
			<button id="submit" disabled={!stripe} color="primary">
				Confirm order
			</button>
		</form>
	);
}
