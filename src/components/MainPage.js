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
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: "#F9F7F7",
		fontSize: 25,
		fontFamily: "Lato, sans-serif",
		fontWeight: "bold",
		letterSpacing: 10,
		[theme.breakpoints.up("md")]: {
			color: "#F9F7F7",
			fontSize: 40,
			fontFamily: "Lato, sans-serif",
			fontWeight: "bold",
			letterSpacing: 15,
		},
		[theme.breakpoints.up("lg")]: {
			color: "#F9F7F7",
			fontSize: 40,
			fontFamily: "Lato, sans-serif",
			fontWeight: "bold",
			letterSpacing: 15,
		},
	},
	list: {
		width: drawerWidth,
		[theme.breakpoints.up("lg")]: {
			width: drawerWidth,
		},
	},
	fullList: {
		width: "auto",
	},
	iconButtonLabel: {
		display: "flex",
		flexDirection: "column",
	},
	appbar: {
		width: "100%",
		backgroundColor: "#28345A",
		boxShadow: "none",
		[theme.breakpoints.up("lg")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	login: {
		fontSize: 15,
		color: "#BFD0DA",
		fontFamily: "Lato, sans-serif",
		letterSpacing: 0,
		fontWeight: "thin",
		[theme.breakpoints.up("md")]: {
			fontSize: 20,
			fontWeight: "thin",
		},
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
		padding: 0,
		[theme.breakpoints.up("lg")]: {
			justifyContent: "center",
		},
	},
	marginLeft: {
		[theme.breakpoints.up("lg")]: {
			marginLeft: drawerWidth,
		},
	},
	lists: {
		fontSize: 50,
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

	const theme = useTheme();
	const isBiggerScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const navBarProps = {
		variant: isBiggerScreen ? "permanent" : "temporary",
		width: isBiggerScreen ? 240 : "auto",
		anchor: "left",
	};
	const [ countriesCitiesList, setLists ] = useState([]);

	useEffect(async () => {
		// get countries & cities
		const responseObj = await axios.get("https://countriesnow.space/api/v0.1/countries");
		const countriesArray = responseObj.data.data.map((data) => data);
		countriesArray.push({ country: "Other", cities: "Other" });
		setLists(countriesArray);

		if (userAuth && userAuth.attributes) {
			console.log("after if 77");
			const userNameAndEmail = userAuth.attributes.email;
			const name = userAuth.attributes.name;
			try {
				// Try to get user from database
				console.log("before currntuserID");
				const currentUserData = (await API.graphql({
					query: queries.getUserByEmail,
					variables: {
						username: userNameAndEmail,
					},
				})).data.getUserByEmail.items;
				console.log("before");
				console.log(currentUserData);
				console.log("after");

				// console.log("main page current user big Get");
				// console.log(currentUser);
				// if (currentUser.data.getUser) {
				if (currentUserData.length) {
					console.log("after if 94 (user exists)");
					// If user exists, set to user

					const currentUser = await API.graphql({
						query: queries.getUser,
						variables: {
							id: currentUserData[0].id,
						},
					});

					setUser(currentUser.data.getUser);
					console.log("!!!!!!HERE!!!!!!!!");
					console.log(currentUser);
					// console.log(currentUserData)
					// setUser(currentUser.data.getUser);
				} else if (!user) {
					console.log("after else 99 (create new user)");
					// If user doesn't exist, then create new user in database
					const newUserRegistrationData = {
						email: userNameAndEmail,
						username: userNameAndEmail,
						name: name,
						isTeller: false,
					};
					console.log("newUserRegistrationData in useEffect Main Page 108");
					console.log(newUserRegistrationData);
					const newUserId = (await API.graphql({
						query: mutations.createUser,
						variables: { input: newUserRegistrationData },
					})).data.createUser.id;
					// Retrieve new user data from database and set to user
					// console.log("response");
					// console.log(response);
					// setUser(response.data.createUser);
					const newUser = await API.graphql({
						query: queries.getUser,
						variables: {
							id: newUserId,
						},
					});
					console.log("newUser");
					console.log(newUser);
					setUser(newUser.data.getUser);
				}
			} catch (error) {
				console.error(error.message);
			}
		}
		// }
	}, []);

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
					<ListItem button key={text} onClick={() => setDisplay(text)} className={classes.lists}>
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
			{/* <h1>{JSON.stringify(user)}</h1> */}
			<AppBar position="static" className={classes.appbar}>
				<Toolbar className={classes.toolbar}>
					{isBiggerScreen ? (
						<span />
					) : (
						<IconButton onClick={toggleDrawer("left", true)} color="inherit">
							<MenuIcon size="large" />
						</IconButton>
					)}
					<Drawer {...navBarProps} anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
						{list("left")}
					</Drawer>
					<div className={classes.titleContainer}>
						<Typography className={classes.title}>
							TELLaLIFE
							<p className={classes.login}>Logged in as {user ? user.name : ""}</p>
						</Typography>
					</div>
					<div />
				</Toolbar>
			</AppBar>

			<div className={classes.marginLeft}>
				{display === "Reservation" ? (
					<ReservationManagement
						user={user}
						setUser={setUser}
						setVideo={setVideo}
						video={video}
						API={API}
						queries={queries}
						mutations={mutations}
					/>
				) : display === "Profile" ? (
					<Profile
						user={user}
						setUser={setUser}
						API={API}
						queries={queries}
						mutations={mutations}
						countriesCitiesList={countriesCitiesList}
					/>
				) : (
					<Feed
						user={user}
						API={API}
						queries={queries}
						mutations={mutations}
						countriesCitiesList={countriesCitiesList}
					/>
				)}
			</div>
		</div>
	);
}

export default MainPage;
