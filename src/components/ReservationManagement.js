import React, { useState, useEffect } from "react";
import Reservation from "./Reservation";

function ReservationManagement (props) {
	const { user } = props;
	const [ view, setView ] = useState("teller");

	const [ reservations, setReservations ] = useState([
		{
			title: "Iceland",
			status: "pending",
		},
		{
			title: "Iceland2",
			status: "pending",
		},
		{
			title: "US",
			status: "finished",
		},
		{
			title: "China",
			status: "confirmed",
		},
		{
			title: "Australia",
			status: "approved",
		},
	]);
	// const [ pending, setPending ] = useState([]);
	// const [ approved, setApproved ] = useState([]);
	// const [ confirmed, setConfirmed ] = useState([]);
	// const [ finished, setFinished ] = useState([]);

	useEffect(async () => {
		// const reservations = (await axios.get(.....)).data
		// setReservations(reservations);
	}, []);

	function createReservation (status) {
		return reservations.map((data) => {
			if (data.status === status) {
				return <Reservation data={data} status={data.status} view={view} />;
			}
		});
	}

	return (
		<div>
			<div>
				{/* this h2 is just for testing purpose */}
				<h2 >Current view is {view}</h2>
				<button
					onClick={() => {
						setView("teller");
					}}
				>
					Teller
				</button>
				<button
					onClick={() => {
						setView("listener");
					}}
				>
					Listener
				</button>
			</div>
			<h3>Pending</h3>
			{createReservation("pending")}
			<h3>Approved</h3>
			{createReservation("approved")}
			<h3>Confirmed</h3>
			{createReservation("confirmed")}
			<h3>Finished</h3>
			{createReservation("finished")}
		</div>
	);
}

export default ReservationManagement;
