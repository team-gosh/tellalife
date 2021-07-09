import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import VideoChat from "./components/VideoChat";
import MainPage from "./components/MainPage";
import axios from "axios";


function App () {
  const [video, setVideo] = useState({
    isActive: false,
    username: "",
    roomName: ""
  })
	useEffect(() => {

  }, []);
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
			{/* < Stripe /> */}
			<a href="#" className="stripe-connect">
				<span>Connect with</span>
			</a>
			<button onClick={createAccount}>CreateAccount</button>
			<button onClick={setLink}>Link</button>
			<button onClick={paymentIntent}>PaymentIntent</button>
			<button onClick={getSecret}>Secret</button>
      {video.isActive 
        ? <VideoChat guestName={video.username} guestRoom={video.roomName} />
        : <MainPage video={video} setVideo={setVideo} />}
			
		</div>
	);
}

export default App;
