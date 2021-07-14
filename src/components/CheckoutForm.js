import React from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

export default function CheckoutForm () {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();
		console.log(stripe, elements, "stripe and element");
		// if (!stripe || !elements) {
		console.log("here");
		const paymentIntentReturn = await API.graphql({
			query: mutations.processOrder,
			variables: {
				input: {
					id: "1",
					payment_method_type: [ "card" ],
					amount: 1000,
					currency: "JPY",
					application_fee_amount: 123,

					stripeAccount: "acct_1JAqYHRN8v3zy7ya",
				},
			},
		});

		const secret = paymentIntentReturn.data.processOrder;

		console.log(typeof secret, secret);

		const result = await stripe.confirmCardPayment(`${secret}`, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: "Jenny Rosen",
				},
			},
		});

		if (result.error) {
			// we actually need to figure out how to set the test account payable
			console.log(result.error);
			console.log("payment is succeeded?");
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
				return {
					status: "succeeded",
				};
			}
		}
	};

	// handleSubmit()

	return (
		<form onSubmit={handleSubmit}>
			{/* <form
			id="payment-form"
			onSubmit={() => {
				console.log("hey");
				handleSubmit();
			}}
		> */}
			<CardSection />
			<button id="submit" disabled={!stripe} color="primary">
				Confirm order
			</button>
		</form>
	);
}
