// const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;
const secretKey =
	"sk_test_51J9oYtITm2RX3fVqDlxAFvVcTcHeRuCUoyPkaD13a1W11CTEtv5aKNIwLw9vJ5cmEUTIeKzFPJJjxv75ujMraEcb002w3ZloIO	";
const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
	const account = await stripe.accounts.create({
		type: "express",
	});

	const refreshFunc = await stripe.accountLinks.create({
		account: account.id,
		refresh_url: "http://localhost:3000/",
		return_url: "http://localhost:3000/",
		type: "account_onboarding",
	});

	const accountLink = await stripe.accountLinks.create({
		account: account.id,
		refresh_url: refreshFunc.url,
		return_url: "http://localhost:3000/",
		type: "account_onboarding",
	});

	accountLink.refresh_url = accountLink.url;
	account.url = accountLink.url;

	console.log(account);
	console.log(refreshFunc);

	return JSON.stringify(account);
};
