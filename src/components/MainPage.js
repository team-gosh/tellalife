import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import ReservationManagement from "./ReservationManagement";
import Amplify, { API, graphqlOperation } from "aws-amplify";
// import { GetUserByEmail } from '../graphql/queries';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import Feed from "./Feed";
import App from "../App";
import CheckoutForm from "./CheckoutForm";
import { Auth, Hub } from "aws-amplify";

//material ui
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import DescriptionIcon from "@material-ui/icons/Description";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		color: "#F9F7F7",
		fontSize: 40,
	},
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	iconButtonLabel: {
		display: "flex",
		flexDirection: "column",
	},
	appbar: {
		backgroundColor: "#3F72AF",
	},
}));

function MainPage (props) {
	const {
		video,
		setVideo,
		userAuth,
		AmplifySignOut,
		Auth,
		Amplify,
		// user authentication
	} = props;
	const [ display, setDisplay ] = useState("Feed");
	const [ user, setUser ] = useState();
	const [ state, setState ] = React.useState(false);
	const classes = useStyles();

	useEffect(async () => {
		// while (!user) {
		console.log("before if 77");
		console.log("user");
		console.log(user);
		if (userAuth && userAuth.attributes) {
			console.log("after if 77");
			const userNameAndEmail = userAuth.attributes.email;
			const name = userAuth.attributes.name;
			try {
				// Try to get user from database
				const currentUser = await API.graphql({
					query: queries.getUserByEmail,
					variables: {
						username: userNameAndEmail,
					},
				});
				console.log(currentUser);
				console.log("main page current user");
				console.log(currentUser);
				if (currentUser.data.getUserByEmail.items.length) {
					console.log("after if 94 (user exists)");
					// If user exists, set to user
					setUser(currentUser.data.getUserByEmail.items[0]);
				} else if (!user) {
					console.log("after else 99 (create new user)");
					// If user doesn't exist, then create new user in database
					const newUserRegistrationData = {
						email: userNameAndEmail,
						username: userNameAndEmail,
						name: name,
						isTeller: false,
					};
					const response = await API.graphql({
						query: mutations.createUser,
						variables: { input: newUserRegistrationData },
					});
					// Retrieve new user data from database and set to user
					console.log("response");
					console.log(response);
					setUser(response.data.createUser);
				}
				console.log("after conditionals");
				console.log(user, "this is because the react thing");
			} catch (error) {
				console.error(error.message);
			}
		}
		// }
	}, []);

	// //test

	// (async () => {
	// 	const response = await API.graphql({
	// 		query: mutations.generateVideoToken,
	// 		variables: {
	// 			input: { id: "2", identity: "miho", room: "roomName" },
	// 		},
	// 	});
	// 	console.log(response, "this is response from Twilio");
	// })();

	// material ui drawer
	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	// signout button
	const handleSignOutButtonClick = async () => {
		try {
			await Auth.signOut();
			Hub.dispatch("UI Auth", {
				// channel must be 'UI Auth'
				event: "AuthStateChange",
				message: "signedout",
			});
		} catch (error) {
			console.log("error signing out: ", error);
		}
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{[ "Reservation", "Feed", "Profile" ].map((text, index) => (
					<ListItem button key={text} onClick={() => setDisplay(text)}>
						<ListItemIcon>
							{index === 0 ? (
								<VideoCallIcon />
							) : index === 1 ? (
								<DescriptionIcon />
							) : index === 2 ? (
								<AccountCircleIcon />
							) : (
								<ExitToAppIcon />
							)}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{[ "Logout" ].map((text, index) => (
					<ListItem button key={text} onClick={handleSignOutButtonClick}>
						<ListItemIcon>
							<ExitToAppIcon />
							{/* <AmplifySignOut /> */}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);
	console.log(user);
	return (
		<div className="MainPage">
			{/* <h1>{JSON.stringify(state)}</h1> */}
			<AppBar position="static" className={classes.appbar}>
				<Toolbar>
					<IconButton onClick={toggleDrawer("left", true)} color="inherit">
						<MenuIcon />
					</IconButton>
					<Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
						{list("left")}
					</Drawer>
					<Typography variant="h6" className={classes.title}>
						TELLaLIFE
						<h3>Hello {user ? user.name : ""}!</h3>
					</Typography>
				</Toolbar>
			</AppBar>

			{display === "Reservation" ? (
				<ReservationManagement user={user} setVideo={setVideo} video={video} API={API} queries={queries} mutations={mutations} />
			) : display === "Profile" ? (
				<Profile user={user} setUser={setUser} API={API} queries={queries} mutations={mutations} />
			) : (
				<Feed user={user} API={API} queries={queries} mutations={mutations} />
			)}
		</div>
	);
}

export default MainPage;
