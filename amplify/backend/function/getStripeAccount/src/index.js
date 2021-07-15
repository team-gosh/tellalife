// const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;
const secretKey =
	"sk_test_51J9oYtITm2RX3fVqDlxAFvVcTcHeRuCUoyPkaD13a1W11CTEtv5aKNIwLw9vJ5cmEUTIeKzFPJJjxv75ujMraEcb002w3ZloIO	";
const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
	console.log(event.arguments);
    const account = await stripe.accounts.retrieve(event.arguments.input.id);
    

	return JSON.stringify(account);
};
