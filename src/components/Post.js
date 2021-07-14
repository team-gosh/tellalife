import React, { useState, useEffect } from "react";
import MakeReservation from "./MakeReservation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	post: {
		marginTop: 50,
		maxWidth: 500,
		alignSelf: "center",
		textAlign: "left",
	},
}));

function Post (props) {
	const classes = useStyles();

	const { postData, user } = props;

	return (
		<div className={classes.post}>
			<h3>{postData.title}</h3>
			<p>{postData.text}</p>
			{user && postData.userID === user.id ? <div /> : <MakeReservation teller={postData.user} user={user} />}
		</div>
	);
}

export default Post;
