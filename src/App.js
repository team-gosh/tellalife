import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/roboto";
import VideoChat from "./components/VideoChat";
import MainPage from "./components/MainPage";
import Amplify, { Auth, graphqlOperation } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignUp, AmplifySignIn } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

Amplify.configure(awsconfig);

function App () {
	const [ video, setVideo ] = useState({
		isActive: false,
		username: "",
		roomName: "",
    type: "",
    userID: "",
    tellerID: ""
	});
	const [ authState, setAuthState ] = useState();
	const [ userAuth, setUserAuth ] = useState();

	useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUserAuth(authData);
		});
	}, []);

	return (
		// Below line is for avoiding database duplicates, and undefined userAuth in MainPage.
		// Need to find better solution
    // TODO
		authState === AuthState.SignedIn && userAuth && userAuth.attributes ? (
			<div className="App">
				{video.isActive ? (
					<VideoChat
						guestName={video.identity}
						guestRoom={video.roomName}
						Amplify={Amplify}
						graphqlOperation={graphqlOperation}
            video={video}
            setVideo={setVideo}
					/>
				) : (
					<MainPage
						video={video}
						setVideo={setVideo}
						userAuth={userAuth}
						AmplifySignOut={AmplifySignOut}
						Auth={Auth}
						Amplify={Amplify}
						graphqlOperation={graphqlOperation}
					/>
				)}
			</div>
		) : (
			<AmplifyAuthenticator>
				<AmplifySignUp
					slot="sign-up"
					formFields={[
						{
							type: "name",
							label: "Name",
							inputProps: { required: true },
						},
						{
							type: "username",
							label: "E-Mail",
							inputProps: { required: true, autocomplete: "username" },
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
