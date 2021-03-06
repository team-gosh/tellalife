import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Storage } from "aws-amplify";
import * as customQueries from "../graphql/customQueries";

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
	const { user, setUser, API, mutations, countriesCitiesList } = props;

	const [ nickName, setNickName ] = useState(user.name);
	const [ home, setHome ] = useState(user.home_country);
	const [ country, setCountry ] = useState(user.current_country);
	const [ city, setCity ] = useState(user.current_city);
	const [ value, setValue ] = useState(user.price ? user.price : 0);
	const [ isEditing, setEdit ] = useState(false);
	const [ error, setError ] = useState("");
	const [ stripeObj, setStripeObj ] = useState({});
	const [ stripeUrl, setUrl ] = useState("");
	const [ charges_enabled, setCharges_enabled ] = useState(false);
	const [ homeURL ] = useState(window.location.href);

	useEffect(async () => {
		try {
			if (user.stripeAccount) {
				const response = (await API.graphql({
					query: mutations.getStripeAccount,
					variables: {
						input: {
							id: user.stripeAccount,
						},
					},
				})).data.getStripeAccount;
				const userObj = JSON.parse(response);

				// probably move this check to the main.js
				if (userObj.charges_enabled === true) {
					console.log("charges_enabled");
					setCharges_enabled(true);

					console.log(user, "user before update");
					const newData = {
						id: user.id,
						isTeller: true,
					};

					const response = await API.graphql({
						query: mutations.updateUser,
						variables: { input: newData },
					});

					user.isTeller = true;
				} else {
					console.log("Process has not finished yet");
				}
			} else {
				console.log("No stripe account");
			}
		} catch (error) {
			console.error(error.message);
		}
	}, []);

	const handleHomeChange = (event) => {
		setHome(event.target.value);
	};

	const handleCurrentCountryChange = (event) => {
		setCountry(event.target.value);
		setCity("");
	};

	const handleCurrentCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value);
	};

	const handleNameChange = (event) => {
		setNickName(event.target.value);
	};

	const handleEdit = () => {
		setEdit(!isEditing);
	};

	const updateUser = async () => {
		console.log("updateUser");
		try {
			console.log(nickName, user, home, country, city, value, stripeObj, stripeUrl);
			const newData = {
				id: user.id,
				name: nickName,
				username: user.email,
				home_country: home,
				current_country: country,
				current_city: city,
				price: Number(value),
				stripeAccount: user.stripeAccount,
				isTeller: true,
				stripeURL: user.stripeURL,
			};
			// logic to handle to timeout!!!!

			const response = await API.graphql({
				query: mutations.updateUser,
				variables: { input: newData },
			});

			const updatedUserData = (await API.graphql({
				query: customQueries.getUser,
				variables: {
					id: response.data.updateUser.id,
				},
			})).data.getUser;
			setUser(updatedUserData);

			// setUser(response.data.updateUser);
		} catch (error) {
			console.error(error.message);
		}
	};

	const updateName = async () => {
		console.log("updateName");

		try {
			const newData = {
				id: user.id,
				name: nickName,
				username: user.email,
				home_country: home,
				current_country: country,
				current_city: city,
				price: Number(value),
				stripeAccount: stripeObj.id,
				stripeURL: stripeUrl,
			};
			// logic to handle to timeout!!!!
			console.log(newData, "this is newData");
			const response = await API.graphql({
				query: mutations.updateUser,
				variables: { input: newData },
			});

			const updatedUserData = (await API.graphql({
				query: customQueries.getUser,
				variables: {
					id: response.data.updateUser.id,
				},
			})).data.getUser;
			setUser(updatedUserData);

			// setUser(response.data.updateUser);
		} catch (error) {
			console.error(error.message);
		}
	};

	const createUser = async () => {
		try {
			const response = await API.graphql({
				query: mutations.createStripeAccount,
				variables: {
					input: {
						type: "express",
						homeURL: homeURL,
					},
				},
			});
			const stripeUser = response.data.createStripeAccount;
			const jsonUser = JSON.parse(stripeUser);
			console.log(stripeUser, jsonUser, "stripeUser & jsonUser ");

			const newData = {
				id: user.id,
				name: nickName,
				username: user.email,
				home_country: home,
				current_country: country,
				current_city: city,
				price: Number(value),
				stripeAccount: jsonUser.id,
				isTeller: false,
				stripeURL: jsonUser.url,
			};

			const addStripeAccount = await API.graphql({
				query: mutations.updateUser,
				variables: { input: newData },
			});
			setUser(addStripeAccount.data.updateUser);
			setEdit(false);

			console.log(addStripeAccount, " addStripeAccount");

			window.open(jsonUser.url);
		} catch (error) {
			console.error(error.message);
		}
	};

	const uploadAvatar = async (e) => {
		try {
			if (e.target.files[0]) {
				const file = e.target.files[0];
				const fileName = `${user.id}_${new Date().getTime()}_${file.name}`;
				const putResponse = await Storage.put(fileName, file);
				// console.log("putResponse from put");
				// console.log(putResponse)
				if (user.avatarKey) {
					await Storage.remove(user.avatarKey);
				}
				const getResponse = await Storage.get(putResponse.key);
				// console.log('getResponse');
				// console.log(getResponse)
				const updateUserResponse = await API.graphql({
					query: mutations.updateUser,
					variables: {
						input: {
							id: user.id,
							avatarKey: putResponse.key,
							avatarURL: getResponse,
						},
					},
				});
				setUser(updateUserResponse.data.updateUser);
				// reader.readAsDataURL(e.target.files[0]);
			}
		} catch (error) {
			console.error(error.message);
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
							handleEdit();
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
							updateName();
							setEdit(false);
						}}
					>
						Save
					</Button>

					{user.isTeller === true ? (
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
						}}
						className={classes.buttons}
					>
						Cancel
					</Button>
				</div>
			)}
			<Card className={classes.card_root}>
				<CardContent>
					{/* <Avatar alt={user.name} src={user.avatar} className={classes.large} /> */}
					<Avatar alt={user.name} src={user.avatarURL} className={classes.large} />
				</CardContent>

				<input
					accept="image/*"
					className={classes.input}
					style={{ display: "none" }}
					id="upload-image"
					type="file"
					onChange={(e) => uploadAvatar(e)}
				/>
				<label htmlFor="upload-image">
					<Button color="primary" component="span">
						Upload Avatar
					</Button>
				</label>

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
									defaultValue={""}
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
												helperText="Price per hour (??)"
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
									// editing
									<div>
										<div className={classes.profile_container}>
											{user.home_country ? (
												// home_country exists
												<div className={classes.margin}>
													<TextField
														id="homecountry"
														value={user.home_country}
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
												// home_country does not exist
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
														defaultValue={""}
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
												defaultValue={user.current_country}
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
												defaultValue={user.current_city}
											>
												{country ? (
													countriesCitiesList.map((option) => {
														if (option.country === "Other") {
															return (
																<MenuItem key="other" value="Other">
																	{option.cities}
																</MenuItem>
															);
														} else if (option.country === country) {
															return option.cities.map((city, index) => (
																<MenuItem key={index} value={city}>
																	{city}
																</MenuItem>
															));
														} else {
															<MenuItem value={""} />;
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
												defaultValue={""}
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
