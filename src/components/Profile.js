import React, { useState, useEffect } from "react";
import axios from "axios";

import { useStripe, useElements } from "@stripe/react-stripe-js";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { deepOrange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PublicIcon from "@material-ui/icons/Public";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import TimerIcon from "@material-ui/icons/Timer";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
		justifyContent: "space-around",
		flexDirection: "row",
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
			alignItems: "flex-start",
		},
		marginTop: 3,
		fontFamily: "Lato, sans-serif",
	},
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
		backgroundColor: "#FDBE0B",
		fontSize: 20,
		[theme.breakpoints.up("md")]: {
			width: theme.spacing(30),
			height: theme.spacing(30),
			fontSize: 50,
		},
	},

	profile: {
		marginTop: 20,
		width: 150,
		[theme.breakpoints.up("md")]: {
			marginTop: 42,
			width: 400,
		},
	},
	info: {
		justifyContent: "space-around",
		flexDirection: "column",
		alignItems: "center",
	},
	list_root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(0.5),
			width: 150,
			[theme.breakpoints.up("md")]: {
				margin: theme.spacing(1),
				width: 300,
			},
		},
	},
	margin: {
		marginTop: 10,
		[theme.breakpoints.up("md")]: {
			marginTop: 20,
		},
	},

	stripeNotice: {
		fontSize: 10,
	},
	card_root: {
		marginTop: "3rem",
		minWidth: "60%",
		maxWidth: "90%",
		minHeight: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "aliceblue",

		[theme.breakpoints.up("md")]: {
			minWidth: "70%",
			minHeight: "100%",
			justifyContent: "space-around",
		},
	},
	profile_container: {
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		width: "100%",

		[theme.breakpoints.up("md")]: {
			minWidth: "100%",
		},
	},
	card_content: {
		flexGrow: "1",
		[theme.breakpoints.up("md")]: {
			flexGrow: "2",
		},
	},
	button_container: {
		display: "flex",
		flexDirection: "column",
		marginTop: "3rem",
	},
	buttons: {
		marginLeft: 3,
		margin: 10,
		fontSize: "1rem",
		color: "#28345A",
		borderColor: "#28345A",
		[theme.breakpoints.up("md")]: {
			fontSize: "1.5rem",
		},
	},
	inputText: {
		color: "#28345A",
		backgroundColor: "transparent",
		fontSize: 20,
		textAlign: "center",
		[theme.breakpoints.up("md")]: {
			backgroundColor: "transparent",
			fontSize: 40,
			textAlign: "center",
		},
	},
	selectText: {
		color: "#28345A",
		alignItems: "center",
		backgroundColor: "transparent",
		fontSize: 20,
		textAlign: "center",
		[theme.breakpoints.up("md")]: {
			backgroundColor: "transparent",
			fontSize: 40,
			textAlign: "center",
		},
	},
	rootTxt: {
		"&$disabled": {
			color: "#28345A",
			backgroundColor: "transparent",
			fontSize: 20,
			textAlign: "center",
		},
		[theme.breakpoints.up("md")]: {
			"&$disabled": {
				backgroundColor: "transparent",
				fontSize: 40,
				textAlign: "center",
			},
		},
	},
	disabled: {},
	helperText: {
		color: "#4F74BE !important",
	},
}));

function Profile (props) {
	const classes = useStyles();
	const { user, setUser, API, mutations } = props;

	// Connect with DB
	const [ nickName, setNickName ] = React.useState(user.name);
	const [ home, setHome ] = React.useState();
	const [ country, setCountry ] = React.useState();
	const [ city, setCity ] = React.useState();
	const [ value, setValue ] = React.useState(user.price ? user.price : 0);
	const [ isEditing, setEdit ] = React.useState(false);
	const [ registration, setRegistration ] = React.useState(false);
	const [ error, setError ] = React.useState("");
	const [ stripeObj, setStripeObj ] = React.useState({});
	const [ stripeUrl, setUrl ] = React.useState("");
	const [ charges_enabled, setCharges_enabled ] = React.useState(false);

	// From API
	const [ countriesCitiesList, setLists ] = React.useState([]);

	// From DB
	const [ isTeller, setTeller ] = React.useState(false);

	const bull = <span className={classes.bullet}>•</span>;

	useEffect(async () => {
		const responseObj = await axios.get("https://countriesnow.space/api/v0.1/countries");
		const countriesArray = responseObj.data.data.map((data) => data);
		setLists(countriesArray);
	}, []);

	const handleHomeChange = (event) => {
		setHome(event.target.value);
	};

	const handleCurrentCountryChange = (event) => {
		console.log(event.target.value, " current country is set");
		setCountry(event.target.value);
	};

	const handleCurrentCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value);
	};

	const handleNameChange = (event) => {
		console.log(event.target.value, "target value");
		setNickName(event.target.value);
		console.log(nickName);
	};

	const updateUser = async () => {
		const newData = {
			id: user.id,
			name: nickName,
			home_country: home,
			current_country: country,
			current_city: city,
			price: Number(value),
			stripeAccount: stripeObj.id,
			stripeURL: stripeUrl,
			isTeller: true,
		};
		// logic to handle to timeout!!!!

		const response = await API.graphql({
			query: mutations.updateUser,
			variables: { input: newData },
		});
		console.log("updated user");
		console.log(response.data.updateUser);
		setUser(response.data.updateUser);
	};

	const updateName = async () => {
		const newData = {
			id: user.id,
			name: nickName,
			home_country: home,
			current_country: country,
			current_city: city,
			price: Number(value),
			stripeAccount: stripeObj.id,
			isTeller: false,
			stripeURL: stripeUrl,
		};
		// logic to handle to timeout!!!!

		const response = await API.graphql({
			query: mutations.updateUser,
			variables: { input: newData },
		});
		console.log("updated user");
		console.log(response.data.updateUser);
		setUser(response.data.updateUser);
	};

	const createUser = async () => {
		// need to change later
		const response = await API.graphql({
			query: mutations.createStripeAccount,
			variables: {
				input: {
					type: "express",
				},
			},
		});
		const stripeUser = response.data.createStripeAccount;
		const jsonUser = JSON.parse(stripeUser);
		setStripeObj(jsonUser);
		setUrl(jsonUser.url);
		window.open(jsonUser.url, "_blank");
	};

	const account = async () => {
		const response = await API.graphql({
			query: mutations.getStripeAccount,
			variables: {
				input: {
					id: user.stripeAccount,
				},
			},
		});
		const userObj = JSON.parse(response.data.getStripeAccount);

		console.log(userObj);

		if (userObj.charges_enabled === true) {
			setCharges_enabled(true);
		} else {
			console.log("Processs has not finished yet");
		}
	};

	return (
		<div className={classes.root}>
			{isEditing === false ? (
				<div className={classes.button_container}>
					<Button
						className={classes.buttons}
						size="large"
						variant="outlined"
						color="primary"
						onClick={() => {
							account();
							setEdit(true);
						}}
					>
						Edit
					</Button>
					<Button
						className={classes.buttons}
						size="medium"
						variant="outlined"
						color="primary"
						disabled={true}
					>
						Save
					</Button>
					<Button
						variant="outlined"
						color="primary"
						disabled={true}
						className={classes.buttons}
						size="medium"
					>
						Register
					</Button>

					<Button size="small" variant="outlined" color="primary" className={classes.buttons} disabled={true}>
						Register Stripe Account
					</Button>
					<Button
						size="medium"
						variant="outlined"
						color="secondary"
						disabled={true}
						className={classes.buttons}
					>
						Cancel
					</Button>
				</div>
			) : (
				<div className={classes.button_container}>
					<Button className={classes.buttons} size="large" variant="outlined" color="primary" disabled={true}>
						Edit
					</Button>
					<Button
						className={classes.buttons}
						size="medium"
						variant="outlined"
						color="primary"
						onClick={() => {
							if (charges_enabled === true) {
								updateUser();
							} else {
								console.log("name only");
								updateName();
							}
							setEdit(false);
							setRegistration(false);
						}}
					>
						Save
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => {
							setRegistration(true);
						}}
						className={classes.buttons}
						size="medium"
					>
						Register
					</Button>
					{user.charges_enabled === true || registration === false ? (
						<Button
							size="small"
							variant="outlined"
							color="primary"
							className={classes.buttons}
							disabled={true}
						>
							Register Stripe Account
						</Button>
					) : (
						<Button
							size="small"
							variant="outlined"
							color="primary"
							className={classes.buttons}
							onClick={
								value !== 0 ? (
									() => {
										createUser();
									}
								) : (
									() => {
										setError("Please fill in the price");
									}
								)
							}
						>
							Register Stripe Account
						</Button>
					)}

					<Button
						size="medium"
						variant="outlined"
						color="secondary"
						onClick={() => {
							setEdit(false);
							setRegistration(false);
						}}
						className={classes.buttons}
					>
						Cancel
					</Button>
				</div>
			)}

			<Card className={classes.card_root}>
				<CardContent>
					<Avatar alt={user.name} src="" className={classes.large} />
				</CardContent>

				<CardContent className={classes.card_content}>
					<div>
						{isEditing === false ? (
							<div className={classes.info}>
								<TextField
									id="name"
									value={user.name}
									className={classes.profile}
									disabled
									FormHelperTextProps={{
										className: classes.helperText,
									}}
									InputProps={{
										classes: {
											root: classes.rootTxt,
											disabled: classes.disabled,
											input: classes.inputText,
										},
									}}
									helperText="NickName"
								/>
							</div>
						) : (
							// edit mode
							<div className={classes.info}>
								<TextField
									id="name"
									className={classes.profile}
									FormHelperTextProps={{
										className: classes.helperText,
									}}
									InputProps={{
										classes: {
											root: classes.rootTxt,
											input: classes.inputText,
										},
									}}
									onChange={handleNameChange}
									helperText="NickName"
								/>
							</div>
						)}

						{/* Other than name, countries and price to show */}
						{user ? (
							<form className={classes.list_root} noValidate autoComplete="off">
								{isEditing === false ? (
									<div>
										<div className={classes.profile_container}>
											{/* Home check */}
											{user.home_country ? (
												<div className={classes.margin}>
													<TextField
														id="homecountry"
														value={user.home_country}
														onChange={handleHomeChange}
														disabled={true}
														helperText="Home country"
														className={classes.profile}
														InputProps={{
															classes: {
																root: classes.selectText,
																disabled: classes.disabled,
																input: classes.selectText,
															},
														}}
														FormHelperTextProps={{
															className: classes.helperText,
														}}
													/>
												</div>
											) : (
												<div className={classes.margin}>
													<TextField
														id="homecountry"
														helperText="Home country"
														value={user.home_country}
														onChange={handleHomeChange}
														disabled={true}
														className={classes.profile}
														InputProps={{
															classes: {
																root: classes.selectText,
																disabled: classes.disabled,
																input: classes.selectText,
															},
														}}
														FormHelperTextProps={{
															className: classes.helperText,
														}}
													/>
												</div>
											)}
										</div>
										<div className={classes.margin}>
											<TextField
												size="small"
												id="currentcountry"
												value={user.current_country}
												className={classes.profile}
												disabled
												helperText="Current Country"
												InputProps={{
													classes: {
														root: classes.selectText,
														disabled: classes.disabled,
														input: classes.selectText,
													},
												}}
												FormHelperTextProps={{
													className: classes.helperText,
												}}
											/>
										</div>
										<div className={classes.margin}>
											<TextField
												id="currentcity"
												value={user.current_city}
												disabled={true}
												helperText="Current City"
												className={classes.profile}
												InputProps={{
													classes: {
														root: classes.selectText,
														disabled: classes.disabled,
														input: classes.inputText,
													},
												}}
												FormHelperTextProps={{
													className: classes.helperText,
												}}
											/>
										</div>
										<div className={classes.margin}>
											<TextField
												id="price"
												value={user.price}
												type="number"
												helperText="Price per hour (¥)"
												disabled={true}
												InputProps={{
													classes: {
														root: classes.selectText,
														disabled: classes.disabled,
														input: classes.selectText,
													},
												}}
												FormHelperTextProps={{
													className: classes.helperText,
												}}
											/>
										</div>
									</div>
								) : (
									<div>
										<div className={classes.profile_container}>
											{user.home_country ? (
												<div className={classes.margin}>
													<TextField
														id="homecountry"
														value={user.home_country}
														onChange={handleHomeChange}
														disabled={true}
														className={classes.profile}
														InputProps={{
															classes: {
																root: classes.rootTxt,
																disabled: classes.disabled,
																input: classes.inputText,
															},
														}}
														FormHelperTextProps={{
															className: classes.helperText,
														}}
														helperText="Home Country"
													/>
												</div>
											) : (
												<div className={classes.margin}>
													<TextField
														id="homecountry"
														select
														onChange={handleHomeChange}
														helperText="Home country *This can't be changed"
														className={classes.profile}
														InputProps={{
															classes: {
																root: classes.selectText,
																disabled: classes.disabled,
																input: classes.selectText,
															},
														}}
														FormHelperTextProps={{
															className: classes.helperText,
														}}
													>
														{countriesCitiesList.map((option) => (
															<MenuItem key={option.country} value={option.country}>
																{option.country}
															</MenuItem>
														))}
													</TextField>
												</div>
											)}
										</div>

										<div className={classes.margin}>
											<TextField
												size="small"
												id="currentcountry"
												select
												onChange={handleCurrentCountryChange}
												className={classes.profile}
												InputProps={{
													classes: {
														root: classes.selectText,
														input: classes.selectText,
													},
												}}
												helperText="Current Country"
												FormHelperTextProps={{
													className: classes.helperText,
												}}
											>
												{countriesCitiesList.map((option) => (
													<MenuItem key={option.id} value={option.country}>
														{option.country}
													</MenuItem>
												))}
											</TextField>
										</div>
										<div className={classes.margin}>
											<TextField
												id="currentcity"
												select
												onChange={handleCurrentCityChange}
												helperText="Current City"
												InputProps={{
													classes: {
														root: classes.selectText,
														disabled: classes.disabled,
														input: classes.selectText,
													},
												}}
												FormHelperTextProps={{
													className: classes.helperText,
												}}
											>
												{country ? (
													countriesCitiesList.map((option) => {
														if (option.country === country) {
															console.log("here", option.cities);
															return option.cities.map((city, index) => (
																<MenuItem key={index} value={city}>
																	{city}
																</MenuItem>
															));
														}
													})
												) : (
													<MenuItem />
												)}
											</TextField>
										</div>
										<div className={classes.margin}>
											<TextField
												id="price"
												type="number"
												onChange={handleInputChange}
												helperText="Price per hour"
												InputProps={{
													classes: {
														root: classes.selectText,
														disabled: classes.disabled,
														input: classes.selectText,
													},
												}}
												FormHelperTextProps={{
													className: classes.helperText,
												}}
											/>
										</div>
									</div>
								)}

								{error}
							</form>
						) : (
							<div />
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default Profile;
