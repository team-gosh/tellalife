import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		[theme.breakpoints.up("md")]: {
			minWidth: 200,
		},
	},
	inputLabel: {
		fontSize: "1rem",
		[theme.breakpoints.up("md")]: {
			fontSize: "1.2rem",
		},
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		[theme.breakpoints.up("md")]: {
			display: "flex",
			justifyContent: "center",
			flexDirection: "row",
		},
	},
	button: {
		marginLeft: 3,
		margin: 10,
		fontSize: "1rem",
		color: "#28345A",
		borderColor: "#28345A",
		[theme.breakpoints.up("md")]: {
			fontSize: "1rem",
		},
	},
}));

function Filter (props) {
	const { countriesCitiesList, filter, setFilter } = props;

	const classes = useStyles();
	const [ homeCountryCondition, setHomeCountryCondition ] = useState("");
	const [ currentCountryCondition, setCurrentCountryCondition ] = useState("");
	const [ currentCityCondition, setCurrentCityCondition ] = useState("");

	const handleHomeCountryChange = (event) => {
		setHomeCountryCondition(event.target.value);
		const newCondition = {
			home: event.target.value,
			targetCountry: currentCountryCondition,
			targetCity: currentCityCondition,
		};
		setFilter(newCondition);
	};
	const handleCurrentCountryChange = (event) => {
		setCurrentCountryCondition(event.target.value);
		const newCondition = {
			home: homeCountryCondition,
			targetCountry: event.target.value,
			targetCity: currentCityCondition,
		};
		setFilter(newCondition);
	};
	const handleCurrentCityChange = (event) => {
		setCurrentCityCondition(event.target.value);
		const newCondition = {
			home: homeCountryCondition,
			targetCountry: currentCountryCondition,
			targetCity: event.target.value,
		};
		setFilter(newCondition);
	};

	return (
		<div className={classes.container}>
			<FormControl variant="filled" className={classes.formControl}>
				<InputLabel id="homecountry" className={classes.inputLabel}>
					Home Country ?
				</InputLabel>
				<Select
					labelId="homecountry"
					id="homecountry"
					value={homeCountryCondition}
					onChange={handleHomeCountryChange}
				>
					{countriesCitiesList.map((option, index) => (
						<MenuItem key={index} value={option.country}>
							{option.country}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant="filled" className={classes.formControl}>
				<InputLabel id="targetcountry" className={classes.inputLabel}>
					Country ?
				</InputLabel>
				<Select
					labelId="targetcountry"
					id="targetcountry"
					value={currentCountryCondition}
					onChange={handleCurrentCountryChange}
				>
					{countriesCitiesList.map((option, index) => (
						<MenuItem key={index} value={option.country}>
							{option.country}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant="filled" className={classes.formControl}>
				<InputLabel id="targetcity" className={classes.inputLabel}>
					City ?
				</InputLabel>
				<Select
					labelId="targetcity"
					id="targetcity"
					value={currentCityCondition}
					onChange={handleCurrentCityChange}
				>
					{currentCountryCondition ? (
						countriesCitiesList.map((option) => {
							if (option.country === "Other") {
								return (
									<MenuItem key="other" value="Other">
										{option.cities}
									</MenuItem>
								);
							} else if (option.country === currentCountryCondition) {
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
				</Select>
			</FormControl>
			<Button
				className={classes.button}
				size="small"
				variant="outlined"
				color="primary"
				onClick={() => {
					const newCondition = {
						home: "",
						targetCountry: "",
						targetCity: "",
					};
					setFilter(newCondition);
					setHomeCountryCondition("");
					setCurrentCountryCondition("");
					setCurrentCityCondition("");
				}}
			>
				Clear
			</Button>
		</div>
	);
}

export default Filter;
