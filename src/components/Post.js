import React, { useState, useEffect } from "react";
import MakeReservation from "./MakeReservation";

function Post (props) {
	const { data, user } = props;
	console.log("in Post");
	console.log(data);
	console.log(user);

	return (
		<div>
			<h3>{data.title}</h3>
<<<<<<< HEAD
			<p>{data.text}</p>
			{user && data.userID === user.id ? <div /> : <MakeReservation user={data.user} />}
=======
      <p>{data.text}</p>
      {user && data.userID === user.id 
        ? <div></div>
        : <MakeReservation user={data.user} />
      }
>>>>>>> be50ff5bff9766ee3989b87869d582252499817f
		</div>
	);
}

export default Post;
