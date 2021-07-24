// const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;

const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;



exports.handler = async function (event, context, callback) {
  const stripe = require("stripe")(secretKey);
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    amount: event.arguments.input.amount,
    currency: 'jpy',
    application_fee_amount: 123,
    transfer_data: {
      // amount: //some amount, not necessary
      // destination: "acct_1JDe4ERPtTBKeA1Y",
      destination: event.arguments.input.stripeAccount,
    },
  });
  console.log("payment intent")
  console.log(paymentIntent)

  console.log("event arguments input")
  console.log(event.arguments.input)
  

  return paymentIntent.client_secret;

};

// exports.handler = async function (event, context, callback) {
//   const paymentMethod = JSON.parse(event.arguments.input.payment_method);
//   console.log("paymentMethod")
//   console.log(paymentMethod)
//   const paymentIntent = await stripe.paymentIntents.create({
//     // amount: parseInt(event.arguments.input.amount),
//     amount: 1000,
// 		// currency: event.arguments.input.currency,
// 		payment_method_types: [ "card" ],
//     currency: 'jpy',
// 		// payment_method_types: "card",
// 		application_fee_amount: 123,
//     // payment_method: paymentMethod.id,
// 		transfer_data: {
//       // amount: parseInt(event.arguments.input.amount),
// 			// destination: event.arguments.input.stripeAccount,
// 			destination: "acct_1JDe4ERPtTBKeA1Y",
// 		},
// 	});
  
//   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//   console.log("payment intent");
//   console.log(paymentIntent)

//   const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
//     paymentIntent.id,
//     // {payment_method: 'pm_card_visa'}
//     // {payment_method_data: paymentMethod.id}
//   )
  
//   console.log("confirmed payment intent in index.js")
// 	console.log(confirmedPaymentIntent);

// 	// return paymentIntent.client_secret;
//   return confirmedPaymentIntent
// };
