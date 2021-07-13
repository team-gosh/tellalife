const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51J9oYtITm2RX3fVqDlxAFvVcTcHeRuCUoyPkaD13a1W11CTEtv5aKNIwLw9vJ5cmEUTIeKzFPJJjxv75ujMraEcb002w3ZloIO"
);

const app = express();
const PORT = 8000;



app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server is listening ${PORT}!!!`);
});

// app.get("/api", async (req, res) => {
// 	res.send("Connected with server!");
// });

app.get("/secret", async (req, res) => {
	const intent = await stripe.paymentIntents.create(
		{
			payment_method_types: [ "card" ],
			amount: 1000,
			currency: "jpy",
			application_fee_amount: 123,
		},
		{
			stripeAccount: "acct_1JAqYHRN8v3zy7ya",
		}
	);
	res.json({ client_secret: intent.client_secret });
});

app.post("/v1/accounts", async (req, res) => {
	const account = await stripe.accounts.create({
		type: "express",
	});

	res.send(account);
});

app.post("/v1/account_links", async (req, res) => {
	const accountLink = await stripe.accountLinks.create({
		account: "acct_1JAqYHRN8v3zy7ya",
		refresh_url: "https://example.com/reauth",
		return_url: "https://example.com/return",
		type: "account_onboarding",
	});

	res.send(accountLink);
});

app.post("/v1/payment_intents", async (req, res) => {
	const paymentIntent = await stripe.paymentIntents.create(
		{
			payment_method_types: [ "card" ],
			amount: 1000,
			currency: "jpy",
			application_fee_amount: 123,
		},
		{
			stripeAccount: "acct_1JAqYHRN8v3zy7ya",
		}
	);
	res.send(paymentIntent);
});

// console.log(account)

// app.post("/v1/account_links", async (req, res) => {
// 	await stripe.accountLinks.create({
// 		account: "acct_1032D82eZvKYlo2C",
// 		refresh_url: "https://example.com/reauth",
// 		return_url: "https://example.com/return",
// 		type: "account_onboarding",
// 	});

// 	res.send("Account is linked.\n");
// });

// const paymentIntent = await stripe.paymentIntents.create({
//     payment_method_types: ['card'],
//     amount: 1000,
//     currency: 'jpy',
//     application_fee_amount: 123,
//   }, {
//     stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',

//   });
