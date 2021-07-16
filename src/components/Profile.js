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
		flexDirection: "column",
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
			alignItems: "flex-start",
		},
		alignItems: "center",
		marginTop: 3,
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		backgroundColor: deepOrange[700],
		[theme.breakpoints.up("md")]: {
			width: theme.spacing(30),
			height: theme.spacing(30),
		},
	},
	username: {
		fontSize: 8,
		color: "#3F72AF",
		textAlign: "center",
		[theme.breakpoints.up("md")]: {
			fontSize: 16,
		},
	},
	profile: {
		fontSize: 20,
		marginTop: 20,
		[theme.breakpoints.up("md")]: {
			fontSize: 35,
			marginTop: 42,
		},
	},
	edit: {
		fontSize: 20,
		width: 100,
		[theme.breakpoints.up("md")]: {
			fontSize: 40,
			width: 150,
		},
	},
	info: {
		justifyContent: "space-around",
		flexDirection: "column",
		alignItems: "center",
	},
	list_root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
	margin: {
		marginTop: 20,
		[theme.breakpoints.up("md")]: {
			marginTop: 30,
		},
	},

	stripeNotice: {
		fontSize: 10,
	},
	card_root: {
		minWidth: 375,
		maxWidth: 375,
		minHeight: 400,
		display: "flex",
		justifyContent: "center",
		[theme.breakpoints.up("md")]: {
			minWidth: 1000,
			minHeight: 600,
			justifyContent: "space-around",
		},
	},
	profile_container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		alignContent: "space-around",
	},
	card_content: {
		flexGrow: "1",
		[theme.breakpoints.up("md")]: {
			flexGrow: "2",
		},
	},
	price_label: {
		color: "gray",
		fontSize: 12,
	},
	buttons: {
		marginLeft: 3,
		marginTop: 5,
		fontSize: 10,
	},
	textField: {
		fontSize: 13,
	},
}));

// get from APIs
const countries = [ "Japan", "China", "Australia", "UK", "Iceland" ];
const cities = {
	Japan: [ "Tokyo", "Osaka", "Nagoya" ],
	China: [ "Beijing", "Shanghai" ],
	Australia: [ "Sydney", "Perth" ],
	UK: [ "London" ],
	Iceland: [ "Reykjavík", "Kópavogur" ],
};

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

	// From DB
	const [ isTeller, setTeller ] = React.useState(false);

	const bull = <span className={classes.bullet}>•</span>;

	const handleHomeChange = (event) => {
		setHome(event.target.value);
	};

	const handleCurrentCountryChange = (event) => {
		setCountry(event.target.value);
	};

	const handleCurrentCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleNameChange = (event) => {
		setNickName(event.target.value);
	};

	const updateUser = async () => {
		const newData = {
			id: user.id,
			name: nickName,
			home_country: home,
			current_country: country,
			current_city: city,
			price: value,
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
			price: value,
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
			<Card className={classes.card_root}>
				<CardContent>
					<Avatar alt="Miho Ogura" src="" className={classes.large} />
				</CardContent>

				<CardContent className={classes.card_content}>
					<div>
						{isEditing === false ? (
							<div className={classes.info}>
								<Typography className={classes.profile}>{nickName}</Typography>
								<Button
									size="small"
									variant="outlined"
									color="primary"
									onClick={() => {
										account();
										setEdit(true);
									}}
								>
									Edit
								</Button>
							</div>
						) : (
							<div>
								<Input
									id="name"
									value={nickName}
									onChange={handleNameChange}
									className={classes.profile}
								/>
								<br />
								<Button
									className={classes.buttons}
									size="small"
									variant="outlined"
									color="primary"
									onClick={() => {
										console.log(stripeUrl, "this is url");
										if (charges_enabled === true) {
											updateUser();
										} else {
											updateName();
										}
										setEdit(false);
										setRegistration(false);
									}}
								>
									Save
								</Button>

								{user.isTeller === false && registration === false ? (
									<span>
										<Button
											variant="outlined"
											color="primary"
											onClick={() => {
												setRegistration(true);
											}}
											className={classes.buttons}
										>
											Register
										</Button>
										<Button
											size="small"
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
									</span>
								) : (
									<span>
										<Button
											size="small"
											variant="outlined"
											color="gray"
											disabled={true}
											className={classes.buttons}
										>
											Register
										</Button>
										<Button
											size="small"
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
									</span>
								)}
							</div>
						)}

						{user ? (
							<form className={classes.list_root} noValidate autoComplete="off">
								<div className={classes.margin}>
									{isEditing === false ? (
										<div className={classes.profile_container}>
											<Typography className={classes.profile}>
												<HomeIcon color="primary" fontSize="medium" /> {user.home_country}
											</Typography>
											<Typography className={classes.profile}>
												<PublicIcon color="primary" fontSize="medium" /> {user.current_country}
											</Typography>
											<Typography className={classes.profile}>
												<LocationCityIcon color="primary" fontSize="medium" />{" "}
												{user.current_city}
											</Typography>
											{user.isTeller ? (
												<Typography className={classes.profile}>
													<TimerIcon color="primary" fontSize="medium" /> ¥{user.price} / hour
												</Typography>
											) : (
												<div />
											)}
										</div>
									) : (
										<div>
											<div className={classes.profile_container}>
												{user.home_country ? (
													<Typography className={classes.profile}>
														<HomeIcon color="primary" fontSize="medium" />
														{user.home_country}
													</Typography>
												) : (
													<TextField
														id="homecountry"
														select
														label="Home Country"
														value={home}
														onChange={handleHomeChange}
														helperText="Please select your home country *This can't be changed"
														className={classes.textField}
													>
														{countries.map((option) => (
															<MenuItem key={option} value={option}>
																{option}
															</MenuItem>
														))}
													</TextField>
												)}
											</div>

											<div className={classes.margin}>
												<TextField
													size="small"
													id="currentcountry"
													select
													label="Current Country"
													value={country}
													onChange={handleCurrentCountryChange}
													helperText="Please select your current country"
													className={classes.textField}
												>
													{countries.map((option) => (
														<MenuItem key={option} value={option}>
															{option}
														</MenuItem>
													))}
												</TextField>
											</div>
											<div className={classes.margin}>
												<TextField
													id="currentcity"
													select
													label="Current City"
													value={city}
													onChange={handleCurrentCityChange}
													helperText="Please select your current city"
													className={classes.textField}
												>
													{country ? (
														cities[country].map((option) => (
															<MenuItem key={option} value={option}>
																{option}
															</MenuItem>
														))
													) : (
														<MenuItem />
													)}
												</TextField>
											</div>
											<div className={classes.margin}>
												<Input
													id="price"
													value={value}
													onChange={handleInputChange}
													startAdornment={<InputAdornment position="start">¥</InputAdornment>}
												/>
												<p className={classes.price_label}>Price per hour</p>
											</div>
											{user.charges_enabled === true || registration === false ? (
												<Button
													size="small"
													variant="outlined"
													color="primary"
													disabled={true}
													className={classes.buttons}
												>
													Register Stripe Account
												</Button>
											) : (
												<div>
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
													<p> *You need Stripe account to get paid</p>
												</div>
											)}
										</div>
									)}
								</div>

								{error}
							</form>
						) : (
							<div />
						)}
					</div>
				</CardContent>
				{/* <CardActions>
					<div className={classes.info}>
						{registration ? (
							<div>
								<Button
									size="medium"
									variant="outlined"
									color="primary"
									className={classes.margin}
									onClick={
										value !== 0 ? (
											() => {
												createUser();
												updateUser();
											}
										) : (
											() => {
												setError("Please fill in the price");
											}
										)
									}
								>
									Continue
								</Button>
								<br />
							</div>
						) : (
							<div />
						)}
						{stripeObj.url ? (
							<span className={classes.stripeNotice}>
								Please access here to register <a href={stripeObj.url}>Go to Stripe</a>
							</span>
						) : (
							<span />
						)}
						<br />
					</div>
				</CardActions> */}
			</Card>
		</div>
	);
}

export default Profile;




