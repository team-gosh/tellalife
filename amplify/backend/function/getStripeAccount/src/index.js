const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;

const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
	console.log(event.arguments);
    const account = await stripe.accounts.retrieve(event.arguments.input.id);
    

	return JSON.stringify(account);
};
