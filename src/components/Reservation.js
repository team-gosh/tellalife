import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

// material ui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Badge from "@material-ui/core/Badge";
import CardHeader from "@material-ui/core/CardHeader";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		maxWidth: 280,
		minHeight: 200,
		margin: 5,
		alignSelf: "center",
		backgroundColor: " #D8F2FF",
	},
	group: {
		minWidth: 275,
		maxWidth: 280,
		minHeight: 200,
		margin: 5,
		alignSelf: "center",
		backgroundColor: "#FCF0E3",
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
	text: {
		minHeight: 60,
	},
	accept: {
		color: "#63B028",
	},
	container: {
		display: "flex",
		flexWrap: "wrap",
	},
	cardContainer: {
		textAlign: "left",
		paddingTop: "0px",
	},
	cardContainerFont: {
		paddingLeft: "0px",
		paddingRight: "10px",
		fontWeight: "300px",
	},
}));

function Reservation (props) {
	const classes = useStyles();
	const { user, data, status, view, setVideo, removeReservation, pendingToApproved, approvedToConfirmed } = props;

	const [ open, setOpen ] = useState(false);
	const [ pairName, setPairName ] = useState("");
	const [ tourTeller, setTourTeller ] = useState("");
	const [ tourPeople, setTourPeople ] = useState();

	useEffect(
		() => {
			getAttendingUserName(data.id);
		},
		[ user, data, getAttendingUserName, pairName ]
	);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	async function getAttendingUserName (id) {
		try {
			const attendingUsers = (await API.graphql({
				query: queries.getAttendingUsersByReservationID,
				variables: {
					reservationID: id,
				},
			})).data.getAttendingUsersByReservationID.items;
			if (data.type === "pair") {
				attendingUsers.forEach((e) => {
					if (user.id !== e.user.id) setPairName(e.user.name);
				});
			} else {
				attendingUsers.forEach((e) => {
					if (data.tellerID === e.user.id) {
						setTourTeller(e.user.name);
						setTourPeople(attendingUsers.length);
					}
				});
			}
		} catch (error) {
			console.error(error.message);
		}
	}
	return (
		<div className="Reservation" id={data.id}>
			<Card className={data.type === "pair" ? classes.root : classes.group}>
				{" "}
				<CardHeader
					title={
						<Typography variant="h5" gutterBottom>
							{data.type === "pair" ? (
								pairName
							) : (
								tourTeller + "( " + tourPeople + (tourPeople === 1 ? " person )" : " people )")
							)}
						</Typography>
					}
					subheader={new Date(Number(data.startDateTime)).toLocaleString()}
				/>
				<CardContent className={classes.cardContainer}>
					<div className={classes.icon3}>
						<Badge>
							<AccessTimeOutlinedIcon color="action" fontSize="large" />
							{<Typography className={classes.cardContainerFont} />}
						</Badge>
						{data.duration} min
					</div>
					<div>
						<Badge>
							<AttachMoneyOutlinedIcon color="action" fontSize="large" />
							{<Typography className={classes.cardContainerFont} />}
						</Badge>
						{data.price} yen
					</div>
					<div>
						<Badge>
							<PersonOutlineOutlinedIcon color="action" fontSize="large" />
							{<Typography className={classes.cardContainerFont} />}
						</Badge>
						{data.type === "pair" ? "Private Chat" : "Virtual Tour"}
					</div>
				</CardContent>
				{view === "listener" ? status === "pending" ? (
					<div>
						<CardActions>
							<Button
								size="small"
								variant="outlined"
								color="secondary"
								onClick={() => removeReservation(data.id)}
							>
								Cancel
							</Button>
						</CardActions>
					</div>
				) : status === "approved" ? (
					<div>
						<CardActions>
							<Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
								Pay
							</Button>

							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby="form-dialog-title"
								fullWidth="true"
							>
								<DialogTitle id="form-dialog-title">Payment</DialogTitle>
								<DialogContent>
									<CheckoutForm
										user={user}
										confirmReservation={approvedToConfirmed}
										reservation={data}
									/>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color="primary">
										Close
									</Button>
								</DialogActions>
							</Dialog>

							<Button
								size="small"
								variant="outlined"
								color="secondary"
								onClick={() => removeReservation(data.id)}
							>
								Cancel
							</Button>
						</CardActions>
					</div>
				) : status === "confirmed" ? (
					<div>
						<CardActions>
							<Button
								id="1" // reservation.id
								size="small"
								variant="outlined"
								color="primary"
								onClick={(e) => {
									console.log("user");
									console.log(user);
									const newVideo = {
										isActive: true,
										identity: user.username,
										roomName: data.id, // need to pass later
										type: data.type,
										userID: user.id,
										tellerID: data.tellerID,
									};
									console.log("new video");
									console.log(newVideo);
									setVideo(newVideo);
								}}
							>
								Go to video chat
							</Button>
						</CardActions>
					</div>
				) : (
					<span />
				) : status === "pending" ? (
					<div>
						<CardActions>
							<Button
								size="small"
								variant="outlined"
								className={classes.accept}
								onClick={() => pendingToApproved(data.id)}
							>
								Accept
							</Button>
							<Button
								size="small"
								variant="outlined"
								color="secondary"
								onClick={() => removeReservation(data.id)}
							>
								Reject
							</Button>
						</CardActions>
					</div>
				) : status === "approved" ? (
					<div>
						<CardActions>
							<Typography size="small" className={classes.title} color="textSecondary" gutterBottom>
								Waiting for the payment
							</Typography>
							<Button
								size="small"
								variant="outlined"
								color="secondary"
								onClick={() => removeReservation(data.id)}
							>
								Cancel
							</Button>
						</CardActions>
					</div>
				) : status === "confirmed" ? (
					<div>
						<CardActions>
							<Button
								size="small"
								variant="outlined"
								color="primary"
								onClick={(e) => {
									console.log("user");
									console.log(user);
									const newVideo = {
										isActive: true,
										identity: user.username,
										roomName: data.id, // need to pass later
										type: data.type,
										userID: user.id,
										tellerID: data.tellerID,
									};
									setVideo(newVideo);
								}}
							>
								Go to video chat
							</Button>
						</CardActions>
					</div>
				) : (
					<span />
				)}
			</Card>
		</div>
	);
}

export default Reservation;
