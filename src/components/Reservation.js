import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

import axios from "axios";
import App from "../App";
import CheckoutForm from "./CheckoutForm";

import { useStripe } from "@stripe/react-stripe-js";

// material ui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		maxWidth: 280,
		minHeight: 200,
		margin: 5,
		alignSelf: "center",
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
}));

function Reservation (props) {
	const stripe = useStripe();

	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	const { user, data, status, view, setVideo, video } = props;
	console.log("console.log after props");
	console.log(user);

	const [ open, setOpen ] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const payment = async () => {
		// need to change later
		const response = await API.graphql({
			query: mutations.processOrder,
			variables: {
				input: {
					id: "1",
					payment_method_type: [ "card" ],
					amount: 1000,
					currency: "JPY",
					application_fee_amount: 123,
					stripeAccount: "acct_1JAqYHRN8v3zy7ya",
				},
			},
		});
		console.log(response);
	};

	// input PaymentIntent {
	// 	id: String!
	// 	payment_method_type: [String!]
	// 	amount: Int!
	// 	currency: String!
	// 	application_fee_amount: Int!
	// 	transfer_data: [Destination]
	// }

	return (
		<div className="Reservation">
			{/* consumer view */}
			<Card className={classes.root}>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{data.teller}
					</Typography>
					<Typography variant="h5" component="h2">
						{data.title}
					</Typography>
					<Typography variant="body2" component="p" className={classes.text}>
						dsadfafsdasdfasdfasfd
						{data.description}
					</Typography>
				</CardContent>
				{view === "listener" ? status === "pending" ? (
					<div>
						<CardActions>
							<Button size="small" variant="outlined" color="secondary">
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
									<div>
										<CheckoutForm />
									</div>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color="primary">
										Close
									</Button>
								</DialogActions>
							</Dialog>

							<Button size="small" variant="outlined" color="secondary">
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
										roomName: "pluto", // need to pass later
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
				) : status === "pending" ? (
					<div>
						<CardActions>
							<Button size="small" variant="outlined" className={classes.accept}>
								Accept
							</Button>
							<Button size="small" variant="outlined" color="secondary">
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
							<Button size="small" variant="outlined" color="secondary">
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
								onClick={() => {
									video.isActive = true;
									setVideo(video);
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
