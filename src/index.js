import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// paymentpage

// import React from "react";
// import ReactDOM from "react-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
// 	"pk_test_51J9oYtITm2RX3fVqVcbPzL8t0rjLQYaTkdYZSooASIcFqg56B1xV3pJbBgGfzIgjT77M1FepHmUzyeF7yaIUInni00D8L42SUX",
// 	{
// 		stripeAccount: "acct_1JAqYHRN8v3zy7ya",
// 	}
// );

// function App () {
// 	return (
// 		<Elements stripe={stripePromise}>
// 			<CheckoutForm />
// 		</Elements>
// 	);
// }

// ReactDOM.render(<App />, document.getElementById("root"));
