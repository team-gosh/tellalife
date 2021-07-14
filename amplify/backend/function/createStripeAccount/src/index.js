const { AccountBalance } = require("@material-ui/icons");

const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;
const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
	const account = await stripe.accounts.create({
		type: "express",
	});

	const accountLink = await stripe.accountLinks.create({
		account: account.id,
		refresh_url: "https://main.d29bbs0f2rju24.amplifyapp.com/",
		return_url: "https://main.d29bbs0f2rju24.amplifyapp.com/",
		type: "account_onboarding",
	});

	account.url = accountLink.url;

	return JSON.stringify(account);
};
