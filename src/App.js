import React from "react";
import logo from "./logo.svg";
import "./App.css";
import VideoChat from "./components/VideoChat";
import axios from "axios";

import React, { useEffect, useState } from "react";

function App () {
	useEffect(() => {
		axios.get("/api").then((res) => setState(res.data));
		// axios.post("/v1/accounts").then((res) => console.log(res));
	});
	const [ state, setState ] = useState("");

	// create express account
	const createAccount = () => {
		console.log("clicked!!");
		axios.post("/v1/accounts").then((res) => console.log(res));
	};

	// account link
	const setLink = () => {
		console.log("clicked!!");
		axios.post("/v1/account_links").then((res) => console.log(res));
	};

	// make payment
	const paymentIntent = () => {
		console.log("clicked!!");
		axios.post("/v1/payment_intents").then((res) => console.log(res));
	};

	// fetch the client secret with JavaScript on the client side (from Stripe example, so it should be secure)
	const getSecret = async () => {
		console.log("clicked!!");
		const response = await fetch("/secret");
		const { client_secret: clientSecret } = await response.json();

		console.log(clientSecret);
	};
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
			{/* < Stripe /> */}
			<a href="#" class="stripe-connect">
				<span>Connect with</span>
			</a>
			<button onClick={createAccount}>CreateAccount</button>
			<button onClick={setLink}>Link</button>
			<button onClick={paymentIntent}>PaymentIntent</button>
			<button onClick={getSecret}>Secret</button>
			<VideoChat guestName={"ME"} guestRoom={"heso"} />
		</div>
	);
}

export default App;
