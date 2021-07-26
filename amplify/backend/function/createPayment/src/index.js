const secretKey = process.env.REACT_APP_STRIPE_API_SECRET;

exports.handler = async function (event, context, callback) {
  const stripe = require("stripe")(secretKey);
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    amount: event.arguments.input.amount,
    currency: 'jpy',
    application_fee_amount: 123,
    transfer_data: {
      // amount: // transfer fee amount, not necessary
      destination: event.arguments.input.stripeAccount,
    },
  });

  return paymentIntent.client_secret;
};
