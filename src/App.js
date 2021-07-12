import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/roboto";
import VideoChat from "./components/VideoChat";
import MainPage from "./components/MainPage";
import axios from "axios";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
  AmplifySignIn
} from "@aws-amplify/ui-react";
// import awsconfig from "./aws-exports";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Amplify.configure(awsconfig);

function App() {
  // const [ video, setVideo ] = useState(false);
  const [video, setVideo] = useState({
    isActive: false,
    username: "",
    roomName: ""
  });
  const [authState, setAuthState] = useState();
  const [userAuth, setUserAuth] = useState(); // Change name to avoid confusion

  const stripePromise = loadStripe(
    "pk_test_51J9oYtITm2RX3fVqVcbPzL8t0rjLQYaTkdYZSooASIcFqg56B1xV3pJbBgGfzIgjT77M1FepHmUzyeF7yaIUInni00D8L42SUX",
    {
      stripeAccount: "acct_1JAqYHRN8v3zy7ya"
    }
  );

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

  console.log("Auth State");
  console.log(authState);
  console.log("User Auth");
  console.log(userAuth);
  console.log("Auth State Signed In");
  console.log(authState ? authState.SignedIn : undefined);

  return (
    // authState === AuthState.SignedIn && userAuth ? (
    <div className="App">
      {/* < Stripe /> */}
      {/* <a href="#" className="stripe-connect">
				<span>Connect with</span>
			</a> */}
      <button onClick={createAccount}>CreateAccount</button>
      <button onClick={setLink}>Link</button>
      <button onClick={paymentIntent}>PaymentIntent</button>
      <button onClick={getSecret}>Secret</button>

      {video.isActive ? (
        <VideoChat guestName={video.username} guestRoom={video.roomName} />
      ) : (
        <Elements stripe={stripePromise}>
          <MainPage video={video} setVideo={setVideo} />
        </Elements>
      )}
    </div>
  );
  // ) : (
  // 	<div />
  // );
  // ) : (
  // 	<AmplifyAuthenticator>
  // 		<AmplifySignUp
  // 			slot="sign-up"
  // 			formFields={[
  // 				{
  // 					type: "name",
  // 					label: "Name",
  // 					inputProps: { required: true },
  // 					// placeholder: "Custom phone placeholder",
  // 				},
  // 				{
  // 					type: "username",
  // 					label: "Username",
  // 					inputProps: { required: true, autocomplete: "username" },
  // 					// placeholder: "Custom phone placeholder",
  // 				},
  // 				{
  // 					type: "email",
  // 					label: "E-Mail",
  // 					// placeholder: "Custom email placeholder",
  // 					inputProps: { required: true },
  // 				},
  // 				{
  // 					type: "password",
  // 					label: "Password",
  // 					// placeholder: "Custom password placeholder",
  // 					inputProps: { required: true, autocomplete: "new-password" },
  // 				},
  // 			]}
  // 		/>
  // 		<AmplifySignIn slot="sign-in" />
  // 	</AmplifyAuthenticator>
  // );
}

export default App;
