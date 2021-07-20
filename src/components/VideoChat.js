import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";
import axios from "axios";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

const VideoChat = (props) => {
	// const { guestName, guestRoom, setRoomID } = props;
	const {
    guestName,
    guestRoom,
    setVideo
  } = props;
	const [ username, setUsername ] = useState(guestName ? guestName : "");
	const [ roomName, setRoomName ] = useState(guestRoom ? guestRoom : "");
	const [ room, setRoom ] = useState(null);
	const [ connecting, setConnecting ] = useState(false);

	// const handleUsernameChange = useCallback((event) => {
	// 	setUsername(event.target.value);
	// }, []);

	// const handleRoomNameChange = useCallback((event) => {
	// 	setRoomName(event.target.value);
	// }, []);

	// const handleSubmit = useCallback(
	// 	async (event) => {
	// 		event.preventDefault();
	// 		setConnecting(true);

	// 		const response = await API.graphql({
	// 			query: mutations.generateVideoToken,
	// 			variables: {
	// 				input: { id: "1", identity: username, room: roomName },
	// 			},
	// 		});

	// 		console.log(response.data.generateVideoToken, " this is token");

	// 		Video.connect(response.data.generateVideoToken, {
	// 			name: roomName,
	// 			audio: true,
	// 			video: true,
	// 		})
	// 			.then((room) => {
	// 				setConnecting(false);
	// 				setRoom(room);
	// 			})
	// 			.catch((err) => {
	// 				console.error(err);
	// 				setConnecting(false);
	// 			});
	// 	},
	// 	[ roomName, username ]
	// );

	const handleLogout = useCallback(() => {
		setRoom((prevRoom) => {
			if (prevRoom) {
				prevRoom.localParticipant.tracks.forEach((trackPub) => {
					trackPub.track.stop();
				});
				prevRoom.disconnect();
			}
			// setRoomID();
			return null;
		});
    setVideo({
      isActive: false,
      username: "",
      roomName: "",
    })
	}, []);

	useEffect(
		async () => {
			if (room) {
				const tidyUp = (event) => {
					if (event.persisted) {
						return;
					}
					if (room) {
						handleLogout();
					}
				};
				window.addEventListener("pagehide", tidyUp);
				window.addEventListener("beforeunload", tidyUp);
				return () => {
					window.removeEventListener("pagehide", tidyUp);
					window.removeEventListener("beforeunload", tidyUp);
				};
			} else {
        const response = await API.graphql({
          query: mutations.generateVideoToken,
          variables: {
            input: { id: "1", identity: username, room: roomName },
          },
        });
  
        console.log(response.data.generateVideoToken, " this is token");
  
        Video.connect(response.data.generateVideoToken, {
          name: roomName,
          audio: true,
          video: true,
        })
          .then((room) => {
            setConnecting(false);
            setRoom(room);
          })
          .catch((err) => {
            console.error(err);
            setConnecting(false);
          });
      }
		},
		[ room, handleLogout ]
	);

	let render;
	if (room) {
		render = (
			<Room
				roomName={roomName}
				username={username}
				room={room}
				handleLogout={handleLogout}
				guestRoom={guestRoom}
			/>
		);
	} else {
		render = (
			// <Lobby
			// 	username={username}
			// 	roomName={roomName}
			// 	handleUsernameChange={handleUsernameChange}
			// 	handleRoomNameChange={handleRoomNameChange}
			// 	handleSubmit={handleSubmit}
			// 	connecting={connecting}
			// />
      <div></div>
		);
	}
	return render;
};

export default VideoChat;
