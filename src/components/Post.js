import React, { useState, useEffect } from "react";
import MakeReservation from "./MakeReservation";

function Post (props) {
	const { postData, user } = props;
	console.log("in Post");
	console.log(postData);
	console.log(user);

	return (
		<div>
			<h3>{postData.title}</h3>
			<p>{postData.text}</p>
			{user && postData.userID === user.id ? <div /> : <MakeReservation teller={postData.user} user={user} />}
		</div>
	);
}

export default Post;
