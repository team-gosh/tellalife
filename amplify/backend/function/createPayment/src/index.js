const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;
const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
	const body = JSON.parse(event.body);

	console.log(body, "this is body");

	const paymentIntent = await stripe.paymentIntents.create({
		amount: parseInt(body.argument.input.amount),
		currency: body.argument.input.currency,
	});

	const response = {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "OPTIONS,POST,GET",
		},
		body: JSON.stringify(paymentIntent),
		isBase64Encoded: false,
	};
	return response;
};
