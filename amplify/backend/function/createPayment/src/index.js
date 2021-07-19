const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;

// const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;

const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: parseInt(event.arguments.input.amount),
		currency: event.arguments.input.currency,
		payment_method_types: [ "card" ],
		application_fee_amount: 123,
		transfer_data: {
			// destination: event.arguments.input.stripeAccount,
			destination: "acct_1JDe4ERPtTBKeA1Y",
		},
	});

	console.log(paymentIntent);

	return paymentIntent.client_secret;
};
