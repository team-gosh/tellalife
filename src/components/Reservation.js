import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";

function Reservation (props) {
	const { user, data, status, view } = props;

	return (
		<div className="Reservation">
			{/* consumer view */}
			{view === "listener" ? status === "pending" ? (
				<div>
					<p>{data.title}</p>
					<button>Cancel</button>
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
