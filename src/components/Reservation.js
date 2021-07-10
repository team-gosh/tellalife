import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
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
}));

function Reservation (props) {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	const { user, data, status, view } = props;

	return (
		<div className="Reservation">
			{/* consumer view */}
			{view === "listener" ? status === "pending" ? (
				<div>
					<Card className={classes.root}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Word of the Day
							</Typography>
							<Typography variant="h5" component="h2">
								be{bull}nev{bull}o{bull}lent
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								adjective
							</Typography>
							<Typography variant="body2" component="p">
								well meaning and kindly.
								<br />
								{'"a benevolent smile"'}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Cancel</Button>
						</CardActions>
					</Card>
				</div>
			) : status === "approved" ? (
				<div>
					<p>{data.title}</p>
					<button>Pay via Stripe</button>
					<button>Cancel</button>
				</div>
			) : status === "confirmed" ? (
				<div>
					<p>{data.title}</p>
					<button>Go to Video Chat</button>
				</div>
			) : (
				<p>{data.title}</p>
			) : status === "pending" ? (
				<div>
					<p>{data.title}</p>
					<button>Accept</button>
					<button>Reject</button>
				</div>
			) : status === "confirmed" ? (
				<div>
					<p>{data.title}</p>
					<button>Go to Video Chat</button>
				</div>
			) : (
				<p>{data.title}</p>
			)}
		</div>
	);
}

export default Reservation;
