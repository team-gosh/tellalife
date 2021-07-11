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
}));

function Reservation (props) {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	const { user, data, status, view } = props;

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
							<Button size="small" variant="outlined" color="primary">
								Pay
							</Button>
							<Button size="small" variant="outlined" color="secondary">
								Cancel
							</Button>
						</CardActions>
					</div>
				) : status === "confirmed" ? (
					<div>
						<CardActions>
							<Button size="small" variant="outlined" color="primary">
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
							<Button size="small" variant="outlined" color="primary">
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
