import React, { useEffect, useState } from "react";
import Video from "twilio/lib/rest/Video";
import Participant from "./Participant";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

const useStyles = makeStyles((theme) => ({
	room: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	button: {
		background: "#28345a",
		border: 0,
		borderRadius: 3,
		color: "white",
		height: 48,
		marginTop: 5,
	},
	remoteContainer: {
		minWidth: "250",
		minHeight: "250",
		marginBottom: 50,
		marginTop: 10,
		[theme.breakpoints.up("md")]: {
			minWidth: "500",
			minHeight: "500",
			marginBottom: 100,
		},
	},
	localContainer: {
		maxWidth: "200",
		maxHeight: "200",
		marginBottom: 50,
		[theme.breakpoints.up("md")]: {
			minWidth: "200",
			minHeight: "200",
		},
	},
}));

const Room = (props) => {
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
		return (
			<Participant
				key={participant.sid}
				participant={participant}
				roomType={video.type}
				userType="remote"
				video={video}
				className={classes.remoteContainer}
			/>
		);
	});

	console.log("video type in room");
	console.log(video.type);

	return (
		<div className={classes.room}>
			<div className={classes.remoteContainer}>{remoteParticipants}</div>
			<div className={classes.localContainer}>
				{room ? (
					<Participant
						key={room.localParticipant.sid}
						participant={room.localParticipant}
						roomType={video.type}
						userType="local"
						windowSize={windowSize}
						// tellerHeight={Math.floor(windowSize * 0.75)}
						// listenerHeight={Math.floor(windowSize * 0.3)}
						video={video}
					/>
				) : (
					""
				)}
			</div>

			<button onClick={handleLogout} className={classes.button}>
				Leave Room
			</button>
		</div>
	);
};

export default Room;
