const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;
const stripe = require("stripe")(
	"sk_test_51J9oYtITm2RX3fVqDlxAFvVcTcHeRuCUoyPkaD13a1W11CTEtv5aKNIwLw9vJ5cmEUTIeKzFPJJjxv75ujMraEcb002w3ZloIO"
);

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
