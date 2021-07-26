import React, { useEffect, useState } from "react";
import Video from "twilio/lib/rest/Video";
import Participant from "./Participant";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	button: {
		background: "#28345a",
		border: 0,
		borderRadius: 3,
		color: "white",
		height: 48,
		marginTop: 5,
	},
}));

const RoomTour = (props) => {
	const { roomName, username, room, handleLogout, guestRoom, video } = props;
	const [ participants, setParticipants ] = useState([]);
	const [ windowSize, setWindowSize ] = useState({
		width: undefined,
		height: undefined,
	});

	const classes = useStyles();

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(
		() => {
			const participantConnected = (participant) => {
				setParticipants((prevParticipants) => [ ...prevParticipants, participant ]);
			};

			const participantDisconnected = (participant) => {
				setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
			};

			room.on("participantConnected", participantConnected);
			room.on("participantDisconnected", participantDisconnected);
			room.participants.forEach(participantConnected);
			return () => {
				room.off("participantConnected", participantConnected);
				room.off("participantDisconnected", participantDisconnected);
			};
		},
		[ room ]
	);

	const remoteParticipants = participants.map((participant) => {
		return <Participant key={participant.sid} participant={participant} roomType={video.type} userType="remote" />;
	});

	const tourView = () => {
		if (video.userID === video.tellerID) {
			console.log("this is the teller");
			return (
				<Participant
					key={room.localParticipant.sid}
					participant={room.localParticipant}
					roomType={video.type}
					userType="local"
					windowSize={windowSize}
					tellerHeight={Math.floor(windowSize * 0.75)}
					listenerHeight={Math.floor(windowSize * 0.15)}
					video={video}
				/>
			);
		} else {
			console.log("this is a listener");
			return participants.map((participant) => {
				return (
					<Participant
						key={participant.sid}
						participant={participant}
						roomType={video.type}
						userType="remote"
						video={video}
					/>
				);
			});
		}
	};

	console.log("video in room");
	console.log(video);

	return (
		<div className="room">
			<div className="remote-participants" style={{ height: `${Math.floor(windowSize.height * 0.75)}px` }}>
				{tourView()}
				{/* <div className="local-participant" style={{height: `${Math.floor(windowSize.height * .15)}px`}}>
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            roomType={video.type}
            userType="local"
            windowSize={windowSize}
            tellerHeight={Math.floor(windowSize * .75)}
            listenerHeight={Math.floor(windowSize * .15)}
          />
        ) : (
          ""
        )} */}
				<button onClick={handleLogout} className={classes.button}>
					Leave Room
				</button>
			</div>
		</div>
	);
};

export default RoomTour;
