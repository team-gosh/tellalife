import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	circle: {
		marginTop: "15%",
		color: "#28345A",
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	button: {
		background: "#28345a",
		border: 0,
		borderRadius: 3,
		color: "white",
		height: 48,
		marginTop: 5,
	},
}));

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
	const { user, confirmReservation, reservation } = props;
	const stripe = useStripe();
	const elements = useElements();
	const classes = useStyles();

	const [ open, setOpen ] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setOpen(!open);

		if (!stripe || !elements) {
			console.log("notloaded");
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
    console.log("data passed to stripe")
    console.log(user.id)
    console.log(reservation.price)
    console.log(reservation.stripeAccount)
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
      console.log("payment intent");
      console.log(paymentIntentClientSecret)
      // console.log('CardElement')
      // console.log(elements.getElement(CardElement))
      
			const result = await stripe.confirmCardPayment(paymentIntentClientSecret.data.processOrder, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
      console.log("payment result")
      console.log(result)

			if (result.error) {
				console.log("payment has failed");
				setOpen(false);

				return {
					status: "failed",
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
					confirmReservation(reservation.id);
					setOpen(false);
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
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				{/* <CardSection /> */}
				<label>
					Card details
					<CardElement options={CARD_ELEMENT_OPTIONS} />
				</label>
				<button id="submit" disabled={!stripe} className={classes.button}>
					Confirm order
				</button>
			</form>
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</React.Fragment>
	);
}
