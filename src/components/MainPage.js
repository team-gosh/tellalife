import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import ReservationManagement from "./ReservationManagement";
import Feed from "./Feed";
import App from "../App";
import CheckoutForm from "./CheckoutForm";

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
import Amplify from "aws-amplify";

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
		AmplifySignOut,
		Auth,
		Amplify,
		// user authentication
	} = props;
	const [ display, setDisplay ] = useState("Feed");
	const [ user, setUser ] = useState({});
	const [ state, setState ] = React.useState(false);
	const classes = useStyles();

	useEffect(async () => {
		// const userData = (await axios.get(.......)).data
		// setUser(userData)
		// console.log(video);
	});

	// material ui drawer
	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		setState({ ...state, [anchor]: open });
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
				{[ "Reservation", "Feed", "Profile", "Something" ].map((text, index) => (
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
					<ListItem button key={text}>
						<ListItemIcon>
							<ExitToAppIcon />
							<AmplifySignOut />
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className="MainPage">
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
					</Typography>
				</Toolbar>
			</AppBar>

			{display === "Reservation" ? (
				<ReservationManagement user={user} setVideo={setVideo} video={video} />
			) : display === "Profile" ? (
				<Profile user={user} />
			) : (
				<Feed user={user} />
			)}
		</div>
	);
}

export default MainPage;
