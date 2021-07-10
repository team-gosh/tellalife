import React, { useState, useEffect } from "react";
import Reservation from "./Reservation";

//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
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
}));

function ReservationManagement (props) {
	const classes = useStyles();

	const { user } = props;
	const [ view, setView ] = useState("listener");

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
			status: "pending",
		},
		{
			title: "US",
			status: "pending",
		},
		{
			title: "China",
			status: "pending",
		},
		{
			title: "Australia",
			status: "pending",
		},
	]);

	useEffect(async () => {
		// const reservations = (await axios.get(.....)).data
		// setReservations(reservations);
	}, []);

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
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>Pending</Typography>
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
					>
						<Typography className={classes.heading}>Approved</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
							amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography className={classes.heading}>Confirmed</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
							amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography className={classes.heading}>Finished</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
							amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>

			<div>
				{/* this h2 is just for testing purpose */}
				<h2>Current view is {view}</h2>
				<button
					onClick={() => {
						setView("teller");
					}}
				>
					Teller
				</button>
				<button
					onClick={() => {
						setView("listener");
					}}
				>
					Listener
				</button>
			</div>
			<h3>Pending</h3>
			{createReservation("pending")}
			<h3>Approved</h3>
			{createReservation("approved")}
			<h3>Confirmed</h3>
			{createReservation("confirmed")}
			<h3>Finished</h3>
			{createReservation("finished")}
		</div>
	);
}

export default ReservationManagement;
