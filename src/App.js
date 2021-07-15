import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/roboto";
import VideoChat from "./components/VideoChat";
import MainPage from "./components/MainPage";
import axios from "axios";
import Amplify, { Auth, graphqlOperation } from "aws-amplify";
// import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignUp, AmplifySignIn } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

// console.log("awsconfig")
// console.log(awsconfig)
Amplify.configure(awsconfig);

// Auth.configure(awsconfig)
function App () {
	// const [ video, setVideo ] = useState(false);
	const [ video, setVideo ] = useState({
		isActive: false,
		username: "",
		roomName: "",
	});
	const [ authState, setAuthState ] = useState();
	const [ userAuth, setUserAuth ] = useState(); // Change name to avoid confusion

	useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUserAuth(authData);
		});
	}, []);

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
		// Below line is for avoiding database duplicates, and undefined userAuth in MainPage.
		// Need to find better solution
		authState === AuthState.SignedIn && userAuth && userAuth.attributes ? (
			<div className="App">
				{video.isActive ? (
					<VideoChat
						guestName={video.username}
						guestRoom={video.roomName}
						Amplify={Amplify}
						graphqlOperation={graphqlOperation}
					/>
				) : (
					// <Elements stripe={stripePromise}>
					<MainPage
						video={video}
						setVideo={setVideo}
						userAuth={userAuth}
						AmplifySignOut={AmplifySignOut}
						Auth={Auth}
						Amplify={Amplify}
						graphqlOperation={graphqlOperation}
					/>
					// </Elements>
				)}
			</div>
		) : (
			// );
			// ) : (
			// 	<div />
			// );
			<AmplifyAuthenticator>
				<AmplifySignUp
					slot="sign-up"
					formFields={[
						{
							type: "name",
							label: "Name",
							inputProps: { required: true },
							// placeholder: "Custom phone placeholder",
						},
						{
							type: "username",
							label: "E-Mail",
							inputProps: { required: true, autocomplete: "username" },
							// placeholder: "Custom phone placeholder",
						},
						// {
						//   type: "email",
						//   label: "E-Mail",
						//   // placeholder: "Custom email placeholder",
						//   inputProps: { required: true },
						// },
						{
							type: "password",
							label: "Password",
							// placeholder: "Custom password placeholder",
							inputProps: { required: true, autocomplete: "new-password" },
						},
					]}
				/>
				<AmplifySignIn slot="sign-in" />
			</AmplifyAuthenticator>
		)
	);
}

export default App;
