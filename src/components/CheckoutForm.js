import React from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";

const CARD_ELEMENT_OPTIONS = {
	style: {
		base: {
			color: "#32325d",
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: "antialiased",
			fontSize: "16px",
			"::placeholder": {
				color: "#aab7c4",
			},
		},
		invalid: {
			color: "#fa755a",
			iconColor: "#fa755a",
		},
	},
};

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
      console.log("notloaded")
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
    try {
      const paymentIntentClientSecret = await API.graphql({
        query: mutations.processOrder,
        variables: {
          input: {
            id: user.id,
            payment_method_type: [ "card" ],
            amount: reservation.price,
            currency: "jpy",
            application_fee_amount: 123,
            stripeAccount: reservation.stripeAccount,
          },
        },
      });

      const result = await stripe.confirmCardPayment(paymentIntentClientSecret.data.processOrder, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        console.log("payment has failed");
        return {
          status:"failed"
        };
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          console.log("payment has succeeded");
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
			{/* <CardSection /> */}
      <label>
			  Card details
			  <CardElement options={CARD_ELEMENT_OPTIONS} />
		  </label>
			<button id="submit" disabled={!stripe} color="primary">
				Confirm order
			</button>
		</form>
	);
}
