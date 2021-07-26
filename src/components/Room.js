import React, { useEffect, useState } from "react";
import Video from "twilio/lib/rest/Video";
import Participant from "./Participant";

const Room = (props) => {
  const {
    roomName,
    username,
    room,
    handleLogout,
    guestRoom,
    video
  } = props;
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

  const remoteParticipants = participants.map((participant) => {
      return (
      <Participant key={participant.sid} participant={participant} roomType={video.type} userType="remote"/>
      );
  });
  
  console.log('video type in room')
  console.log(video.type)

  return (
    <div className="room">
      
      {/* <h5>Remote Participants</h5> */}
      {/* <div className="remote-participants" style={{height: '480px'}}>{remoteParticipants}</div> */}
      <div className="remote-participants" style={{height: `${Math.floor(windowSize.height * .75)}px`}}>{remoteParticipants}</div>
      {/* <div className="local-participant" style={{height: '120px'}}> */}
      <div className="local-participant" style={{height: `${Math.floor(windowSize.height * .15)}px`}}>
        {/* {room ? ( */}
        {room && (video.type !== "tour" || video.userID === video.tellerID) ? (
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
        )}
        <button onClick={handleLogout}>Leave Room</button>
      </div>
    </div>
  );
};

export default Room;
