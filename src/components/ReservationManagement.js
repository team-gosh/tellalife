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
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import HistoryIcon from "@material-ui/icons/History";
import Badge from "@material-ui/core/Badge";
import { API } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	tab: {
		backgroundColor: "#E6DDC6",
	},
	pending: {
		backgroundColor: "#F9F7F7",
	},
	approved: {
		backgroundColor: "#F9F7F7",
	},
	confirmed: {
		backgroundColor: "#F9F7F7",
	},
	finished: {
		backgroundColor: "#F9F7F7",
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
	checkCircleIcon: {
		color: "#63B028",
	},
	paper_root: {
		flexGrow: 1,
		maxWidth: 500,
	},
}));

function ReservationManagement (props) {
	const classes = useStyles();

	const { user, setVideo, video, API, queries, mutations } = props;
	const [ view, setView ] = useState("listener");
	const [ value, setValue ] = useState(0);
	const [ reservations, setReservations ] = useState([]);
	const [ expanded1, setExpanded1 ] = useState(false);
	const [ expanded2, setExpanded2 ] = useState(false);
	const [ expanded3, setExpanded3 ] = useState(false);
	const [ expanded4, setExpanded4 ] = useState(false);
	const [ pendingCounts, setPendingCounts ] = useState(5);
	const [ approveCounts, setApproveCounts ] = useState(6);
	const [ confirmedCounts, setConfirmedCounts ] = useState(7);
	const [ finishedCounts, setFinishedCounts ] = useState(8);

	useEffect(async () => {
		console.log("user in ReservationManagement.js");
		console.log(user);

		// Retrieve Reservation Data one at a time from data
		// from intermediary table
		const currentReservations = await Promise.all(
			user.reservations.items.map(async (e) => {
				console.log("inside map");
				console.log(e);
				const reservation = (await API.graphql({
					query: queries.getReservation,
					variables: {
						id: e.reservationID,
					},
				})).data.getReservation;
				console.log(reservation);
				return reservation;
			})
		);
		console.log("currentReservations");
		console.log(currentReservations);
		setReservations(currentReservations);
	}, []);

	function handleChange (event, newValue) {
		setValue(newValue);
	}

	const handleChangePanel1 = (panel) => (event, isExpanded) => {
		setExpanded1(isExpanded ? panel : false);
		setPendingCounts(1);
	};
	const handleChangePanel2 = (panel) => (event, isExpanded) => {
		setExpanded2(isExpanded ? panel : false);
		setApproveCounts(2);
	};
	const handleChangePanel3 = (panel) => (event, isExpanded) => {
		setExpanded3(isExpanded ? panel : false);
		setConfirmedCounts(3);
	};
	const handleChangePanel4 = (panel) => (event, isExpanded) => {
		setExpanded4(isExpanded ? panel : false);
		setFinishedCounts(4);
	};

	function createReservation (status) {
		console.log("view in createReservation is", view);
		console.log(reservations);
		return reservations
			.filter((e) => (view === "teller" ? e.tellerID === user.id : e.tellerID !== user.id))
			.map((data, index) => {
				// console.log(user.id)
				// console.log(data.tellerID)
				// if (
				//   data.status === status
				//   && view === 'teller'
				//   && data.tellerID === user.id
				// ) {
				//   console.log("I'm a teller list")
				// 	return (
				// 		<Reservation
				// 			key={index}
				// 			data={data}
				// 			status={data.status}
				// 			view={view}
				// 			setVideo={setVideo}
				// 			video={video}
				// 			user={user}
				// 		/>
				// 	);
				// } else if (data.status === status) {
				if (data.status === status) {
					// console.log("I'm a listener list")
					// console.log("view", view)
					return (
						<Reservation
							key={index}
							data={data}
							status={data.status}
							view={view}
							setVideo={setVideo}
							video={video}
							user={user}
						/>
					);
				}
			});
	}

	return (
		<div>
			<div className={classes.root}>
				<div>
					<h1>{view}</h1>
					{/* <h1>{JSON.stringify(reservations)}</h1> */}
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
				<Accordion expanded={expanded1 === "panel1"} onChange={handleChangePanel1("panel1")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						className={classes.pending}
					>
						<div>
							<Badge color="secondary" badgeContent={pendingCounts}>
								<PauseCircleFilledIcon color="primary" fontSize="large" />
							</Badge>
							Pending
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div>
							<div className={classes.column}>
								{createReservation("pending")}
								{console.log(
									createReservation("pending"),
									createReservation("pending").length,
									createReservation("pending")[0]
								)}
							</div>
						</div>
					</AccordionDetails>
				</Accordion>

				<Accordion expanded={expanded2 === "panel2"} onChange={handleChangePanel2("panel2")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
						className={classes.approved}
					>
						<div>
							<Badge color="secondary" badgeContent={approveCounts}>
								<CheckCircleIcon className={classes.checkCircleIcon} fontSize="large" />{" "}
							</Badge>
							Approved
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className={classes.column}>{createReservation("approved")}</div>
					</AccordionDetails>
				</Accordion>

				<Accordion expanded={expanded3 === "panel3"} onChange={handleChangePanel3("panel3")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
						className={classes.confirmed}
					>
						<div>
							<Badge color="secondary" badgeContent={confirmedCounts}>
								<MonetizationOnIcon color="error" fontSize="large" />
							</Badge>
							Payment Confirmed
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className={classes.column}>{createReservation("confirmed")}</div>
					</AccordionDetails>
				</Accordion>

				<Accordion expanded={expanded4 === "panel4"} onChange={handleChangePanel4("panel4")}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
						className={classes.finished}
					>
						<div>
							<Badge color="secondary" badgeContent={finishedCounts}>
								<HistoryIcon color="action" fontSize="large" />
							</Badge>
							Finished
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className={classes.column}>{createReservation("finished")}</div>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
}

export default ReservationManagement;
