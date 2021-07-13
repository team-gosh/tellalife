import React, { useState, useEffect } from "react";
import MakeReservation from "./MakeReservation";

function Post (props) {
	const { data, user } = props;
  console.log("in Post")
  console.log(data)
  console.log(user)

	return (
		<div>
			<h3>{data.title}</h3>
      <p>{data.text}</p>
      {data.userID === user.id         ? <div></div>
        : <MakeReservation user={data.user} />
      }
		</div>
	);
}

export default Post;
