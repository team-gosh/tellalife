import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { deepOrange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
		justifyContent: "space-around",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	large: {
		width: theme.spacing(20),
		height: theme.spacing(20),
		backgroundColor: deepOrange[500],
	},
	username: {
		fontSize: 15,
		color: "#3F72AF",
	},
	profile: {
		fontSize: 40,
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
	slider_root: {
		width: 250,
	},
	input: {
		width: 42,
	},
}));

const countries = [ "Japan", "China", "Australia", "UK" ];
const cities = {
	Japan: [ "Tokyo, Osaka, Nagoya" ],
	China: [ "Beijing", "Shanghai" ],
	Australia: [ "Perth" ],
	UK: [ "London" ],
};

function Profile (props) {
	const classes = useStyles();
	const { user } = props;
	const [ value, setValue ] = React.useState(100);
	const [ country, setCountry ] = React.useState("Australia");
	const [ home, setHome ] = React.useState("Japan");
	const [ city, setCity ] = React.useState("Tokyo");

	const handleChange = (event) => {
		setCountry(event.target.value);
	};
	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleInputChange = (event) => {
		setValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (value < 0) {
			setValue(0);
		} else if (value > 100000) {
			setValue(100000);
		}
	};

	return (
		<div className={classes.root}>
			<div>
				<Avatar alt="Miho Ogura" src="" className={classes.large} />
				<Typography className={classes.username}>@pluto04@live.jp</Typography>
			</div>

			<div className={classes.info}>
				<Typography className={classes.profile}>
					Miho Ogura <Button color="primary">Edit</Button>
				</Typography>
				<form className={classes.list_root} noValidate autoComplete="off">
					<div>
						<TextField id="homecountry" select label="Home Country" value={home} onChange={handleChange}>
							{countries.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</div>

					<div>
						<TextField
							id="currentcountry"
							select
							label="Current Country"
							value={country}
							onChange={handleChange}
						>
							{countries.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div>
						<TextField id="currentcity" select label="Current city" value={city} onChange={handleChange}>
							{cities[city].map((option) => (
								<MenuItem key={option.city} value={option.city}>
									{option.city}
								</MenuItem>
							))}
						</TextField>
					</div>

					<div>
						<Input
							label="Price"
							id="standard-start-adornment"
							className={clsx(classes.margin, classes.textField)}
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
							}}
						/>
					</div>
				</form>
			</div>

			<div className={classes.info}>
				<Button>Update</Button>
				<br />
				<Button>Register</Button>
			</div>
			<div />
		</div>
	);
}

export default Profile;
