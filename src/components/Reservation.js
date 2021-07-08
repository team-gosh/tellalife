import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";

function Reservation (props) {
	const { user, data, status } = props;
	const [ view, setView ] = useState("consumer");

	return (
		<div className="Reservation">
			{view === "consumer" ? status === "approved" ? (
				<div>
					<p>{data.title}</p>
					<button>pay</button>
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
					<button>Approved</button>
					<button>Denied</button>
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
