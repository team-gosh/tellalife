import React, { useEffect, useState } from "react";
import Participant from "./Participant";

const Room = ({ roomName, username, room, handleLogout, guestRoom }) => {
  const [participants, setParticipants] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} roomType="pair" userType="remote"/>
  ));

  return (
    <div className="room">
      
      {/* <h5>Remote Participants</h5> */}
      {/* <div className="remote-participants" style={{height: '480px'}}>{remoteParticipants}</div> */}
      <div className="remote-participants" style={{height: `${Math.floor(windowSize.height * .75)}px`}}>{remoteParticipants}</div>
      {/* <div className="local-participant" style={{height: '120px'}}> */}
      <div className="local-participant" style={{height: `${Math.floor(windowSize.height * .15)}px`}}>
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            roomType="pair"
            userType="local"
            windowSize={windowSize}
            tellerHeight={Math.floor(windowSize * .75)}
            listenerHeight={Math.floor(windowSize * .15)}
          />
        ) : (
          ""
        )}
        <button onClick={handleLogout}>Leave Room</button>
      </div>
    </div>
  );
};

export default Room;
