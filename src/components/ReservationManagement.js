import React, { useState, useEffect } from "react";
import Reservation from "./Reservation";

//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import HearingIcon from "@material-ui/icons/Hearing";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	pending: {
		backgroundColor: "green",
	},
	approved: {
		backgroundColor: "red",
	},
	confirmed: {
		backgroundColor: "blue",
	},
	finished: {
		backgroundColor: "grey",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	column: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	icon: {
		color: "primary",
		size: "5",
		cursor: "initial",
	},
	paper_root: {
		flexGrow: 1,
		maxWidth: 500,
	},
}));

function ReservationManagement (props) {
	const classes = useStyles();

	const { user } = props;
	const [ view, setView ] = useState("listener");
	const [ value, setValue ] = React.useState(0);
	const [ reservations, setReservations ] = useState([
		{
			title: "Iceland",
			status: "pending",
			teller: "Miho",
			listener: "Yoshi",
			date: "2021/07/12",
			time: "15:00",
			description: "Talking about the uni life in Australia",
			duration: "1:00",
		},
		{
			title: "Iceland2",
			status: "approved",
			teller: "Miho",
			description: "Talking about the uni life in Australia",
		},
		{
			title: "US",
			status: "finished",
			teller: "Miho",
		},
		{
			title: "China",
			status: "confirmed",
			teller: "Miho",
		},
		{
			title: "Australia",
			status: "pending",
			teller: "Miho",
		},
	]);

	useEffect(async () => {
		// const reservations = (await axios.get(.....)).data
		// setReservations(reservations);
	}, []);

	function handleChange (event, newValue) {
		setValue(newValue);
	}

	function createReservation (status) {
		return reservations.map((data) => {
			if (data.status === status) {
				return <Reservation data={data} status={data.status} view={view} />;
			}
		});
	}

	return (
		<div>
			<div className={classes.root}>
				<div>
					{/* this h2 is just for testing purpose */}
					<Paper square className={classes.root}>
						<Tabs
							value={value}
							onChange={handleChange}
							variant="fullWidth"
							indicatorColor="primary"
							textColor="primary"
							aria-label="icon label tabs example"
						>
							<Tab
								icon={<HearingIcon />}
								label="Listener"
								onClick={() => {
									setView("listener");
								}}
							/>
							<Tab
								icon={<RecordVoiceOverIcon />}
								label="Teller"
								onClick={() => {
									setView("teller");
								}}
							/>
						</Tabs>
					</Paper>
				</div>
				<br />
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						className={classes.pending}
					>
						<Typography>Pending *color will be changed later</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							<div className={classes.column}>{createReservation("pending")}</div>
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
						className={classes.approved}
					>
						<Typography className={classes.heading}>Approved</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>{createReservation("approved")}</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
						className={classes.confirmed}
					>
						<Typography className={classes.heading}>Confirmed</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>{createReservation("confirmed")}</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
						className={classes.finished}
					>
						<Typography className={classes.heading}>Finished</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>{createReservation("finished")}</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
}

export default ReservationManagement;
