import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
const stripePromise = loadStripe(
	// stripe with public key (exposable)
	"pk_test_51J9oYtITm2RX3fVqVcbPzL8t0rjLQYaTkdYZSooASIcFqg56B1xV3pJbBgGfzIgjT77M1FepHmUzyeF7yaIUInni00D8L42SUX",
	{
		// this needs to be changed and get from DB
		stripeAccount: "acct_1JAqYHRN8v3zy7ya",
	}
);

ReactDOM.render(
	<Elements stripe={stripePromise}>
		<App />
	</Elements>,
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
