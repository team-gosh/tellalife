const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;
const stripe = require("stripe")(secretKey);

exports.handler = async function (event, context, callback) {
  const URL = process.env.DEPLOYED_ENV
    ? "https://main.d29bbs0f2rju24.amplifyapp.com/"
    : "http://localhost:3000"

	const account = await stripe.accounts.create({
		type: "express",
	});

	const refreshFunc = await stripe.accountLinks.create({
		account: account.id,
		refresh_url: URL,
		return_url: URL,
		type: "account_onboarding",
	});
  
  // http://192.168.125.1:20002/graphql
  // https://zhg6fex5wjejdgvztaslbwnave.appsync-api.us-east-2.amazonaws.com/graphql


	const accountLink = await stripe.accountLinks.create({
		account: account.id,
		refresh_url: refreshFunc.url,
		return_url: URL,
		type: "account_onboarding",
	});

	accountLink.refresh_url = accountLink.url;
	account.url = accountLink.url;

	console.log(account);
	console.log(refreshFunc);

	return JSON.stringify(account);
};
