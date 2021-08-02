import React, { useEffect, useState } from "react";
// import Video from "twilio/lib/rest/Video";
import Video from "twilio-video";
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
    marginLeft: 50,
    marginRight: 50
  },

  cameraButton: {
    background: "red",
    border: 0,
    borderRadius: "50%",
    color: "white",
    height: 48,
    width: 48,
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50
  },
}));

const RoomTour = (props) => {
  const { roomName, username, room, handleLogout, guestRoom, video } = props;
  const [participants, setParticipants] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const classes = useStyles();

  const takePicture = () => {
    const videoFeed = document.getElementsByTagName('video')[0];
    const canvas = document.createElement('canvas');
    canvas.width = videoFeed.videoWidth;
    canvas.height = videoFeed.videoHeight;
    canvas.getContext('2d').drawImage(videoFeed, 0, 0, videoFeed.videoWidth, videoFeed.videoHeight);
    const imgData = canvas.toDataURL()
    const a = document.createElement('a');
    a.href = imgData;
    a.download = `TourPicture_${new Date().getTime()}`
    a.click();
  }

  const gotDevices = mediaDevices => {
    const select = document.getElementById('video-devices');
    select.innerHTML = '';
    select.appendChild(document.createElement('option'));
    let count = 1;
    mediaDevices.forEach(mediaDevice => {
      if (mediaDevice.kind === 'videoinput') {
        const option = document.createElement('option');
        option.value = mediaDevice.deviceId;
        const label = mediaDevice.label || `Camera ${count}`;
        const textNode = document.createTextNode(label);
        option.appendChild(textNode);
        select.appendChild(option);
      }
    });
  }

  const attachTracks = (tracks, container) => {
    tracks.forEach(function(track) {
      if (track) {
        container.appendChild(track.attach());
      }
    });
  }
  
  
  const detachTracks = tracks => {
    tracks.forEach(function(track) {
      if (track) {
        track.detach().forEach(function(detachedElement) {
          detachedElement.remove();
        });
      }
    });
  }

  const stopTracks = tracks => {
    tracks.forEach(function(track) {
      if (track) { track.stop(); }
    })
  }

  const updateVideoDevice = event => {
    const select = event.target;
    const localParticipant = room.localParticipant;
    if (select.value !== '') {
      Video.createLocalVideoTrack({
        deviceId: { exact: select.value }
      }).then(function (localVideoTrack) {
        const tracks = Array.from(localParticipant.videoTracks.values())
          .map(publication => publication.track);
        console.log('tracks in updateVideoDevice')
        console.log(tracks)
        console.log('localParticipant in updateVideoDevice');
        console.log(localParticipant)
        localParticipant.unpublishTracks(tracks);
        detachTracks(tracks);

        localParticipant.publishTrack(localVideoTrack);
        // const previewContainer = document.getElementById('local-media');
        // const previewContainer = document.getElementsByClassName('remote-participants')[0];
        const previewContainer = document.getElementsByClassName('participant')[0];
        console.log('previewContainer')
        console.log(previewContainer)
        attachTracks([localVideoTrack], previewContainer);
      });
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    if (video.userID === video.tellerID) {
      // Get Video devices
      navigator.mediaDevices.enumerateDevices().then(gotDevices)
      // Change Video device
      const select = document.getElementById('video-devices');
      select.addEventListener('change', updateVideoDevice);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(
    () => {
      const participantConnected = (participant) => {
        setParticipants((prevParticipants) => [...prevParticipants, participant]);
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
    [room]
  );

  const remoteParticipants = participants.map((participant) => {
    return <Participant key={participant.sid} participant={participant} roomType={video.type} userType="remote" />;
  });

  const tourView = () => {
    if (video.userID === video.tellerID) {
      console.log("this is the teller");
      return (
        <React.Fragment>
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
          <select id="video-devices"></select>
        </React.Fragment>
      );
    } else {
      console.log("this is a listener");
      console.log("participants")
      console.log(participants.length)
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

  // console.log("video in room");
  // console.log(video);
  // console.log("Media Devices")
  // navigator.mediaDevices.enumerateDevices().then(gotDevices => console.log(gotDevices.filter(e => e.kind === "videoinput")))
  // console.log("room")
  // console.log(room)

  return (
    <div className="room">
      <div className="remote-participants" style={{ height: `${Math.floor(windowSize.height * 0.75)}px` }}>
        {tourView()}
        <button onClick={handleLogout} className={classes.button}>
          Leave Room
        </button>
        {video.type === "tour"
          ? <button onClick={takePicture} className={classes.cameraButton}>📷</button>
          : <></>
        }
      </div>
    </div>
  );
};

export default RoomTour;
