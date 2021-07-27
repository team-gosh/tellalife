import React, { useState, useEffect } from "react";
import axios from "axios";
import MakeReservation from "./MakeReservation";
import { Icon, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import moment from "moment";

import Airplane from "../airplane_blue.png";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 20,
	},
	post: {
		width: 300,
		minHeight: 200,
		display: "flex",
		alignItems: "flex-start",
		[theme.breakpoints.up("md")]: {
			width: 800,
			minHeight: 300,
			marginTop: 50,
		},
	},
	avatar: {
		display: "flex",
		justifyContent: "space-between",
	},
	area: {
		width: "100%",
	},
	flagContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	flag: {
		fontSize: 20,
		[theme.breakpoints.up("md")]: {
			fontSize: 35,
		},
	},
	icon: {
		marginLeft: 2,
		marginRight: 2,
		height: 20,
		weight: 20,
		[theme.breakpoints.up("md")]: {
			height: 30,
			weight: 30,
		},
	},
	submitButton: {
		display: "flex",
		justifyContent: "flex-end",
	},
	avatarContainer: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	avatarName: {
		color: "gray",
		color: "#28345a",
		marginLeft: 5,
	},
	date: {
		color: "gray",
		marginLeft: 5,
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
}));
moment().format();

function Post (props) {
	const classes = useStyles();
	const { postData, user } = props;
	const [ uniHomeFlag, setUniHomeFlag ] = useState("");
	const [ uniCountryFlag, setUniCountryFlag ] = useState("");
	const [ isLoading, setLoading ] = useState(true);

	useEffect(async () => {
		// get flags
		const homeFlag = await axios.post("https://countriesnow.space/api/v0.1/countries/flag/unicode", {
			country: postData.home_country,
		});

		const currentFlag = await axios.post("https://countriesnow.space/api/v0.1/countries/flag/unicode", {
			country: postData.country,
		});
		setUniHomeFlag(homeFlag.data.data.unicodeFlag);
		setUniCountryFlag(currentFlag.data.data.unicodeFlag);
		setLoading(false);
	}, []);

	return (
		<div className={classes.container}>
			<Card className={classes.post}>
				<CardContent className={classes.area}>
					<div className={classes.avatarContainer}>
						<Avatar aria-label="avatar" src={postData.user.avatarURL} />
						<div className={classes.infoContainer}>
							<span className={classes.avatarName}>{postData.user.name}</span>
							<span className={classes.date}>{moment(postData.createdAt).fromNow()}</span>
						</div>
					</div>
					{isLoading === true ? (
						<CircularProgress size={20} className={classes.circle} />
					) : (
						<div className={classes.flagContainer}>
							<span className={classes.flag}>{uniHomeFlag} </span>
							<span />
							--- <img src={Airplane} className={classes.icon} /> -->
							<span className={classes.flag}>{uniCountryFlag} </span>
						</div>
					)}

					<CardContent className={classes.container}>
						<Typography gutterBottom variant="h5" component="h3" align="left">
							{postData.title}
						</Typography>
						{postData.imageURL ? (
							<CardMedia
								className={classes.media}
								component="img"
								src={postData.imageURL}
								title={postData.title}
							/>
						) : (
							<div />
						)}
						<Typography variant="body2" color="textSecondary" variant="body1" align="left">
							{postData.text}
						</Typography>
					</CardContent>
					{user && postData.userID === user.id ? (
						<div />
					) : (
						<div className={classes.submitButton}>
							<MakeReservation teller={postData.user} user={user} />
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default Post;
