const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;
const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
	const account = await stripe.accounts.create({
		type: "express",
	});

	const accountLink = await stripe.accountLinks.create({
		account: account.id,
		refresh_url: "http://localhost:3000/",
		return_url: "http://localhost:3000/",
		type: "account_onboarding",
	});

	return accountLink.url;
};
