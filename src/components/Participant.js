import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	remoteVideo: {
		maxHeight: 250,
		[theme.breakpoints.up("md")]: {
			maxHeight: 600,
		},
	},
	localVideo: {
		maxHeight: 150,
		[theme.breakpoints.up("md")]: {
			maxHeight: 200,
		},
	},
}));

const Participant = (props) => {
	const {
		participant,
		roomType,
		userType,
		windowSize,
		// tellerHeight,
		// listenerHeight,
		video,
	} = props;
	const [ videoTracks, setVideoTracks ] = useState([]);
	const [ audioTracks, setAudioTracks ] = useState([]);
	const [ height, setHeight ] = useState(1); // testing for screen size
	const classes = useStyles();

	const videoRef = useRef();
	const audioRef = useRef();

	const trackpubsToTracks = (trackMap) =>
		Array.from(trackMap.values()).map((publication) => publication.track).filter((track) => track !== null);

  useEffect(() => {
		setHeight(windowSize ? windowSize.height : 1);
	}, []);

	useEffect(
		() => {
			setVideoTracks(trackpubsToTracks(participant.videoTracks));
			setAudioTracks(trackpubsToTracks(participant.audioTracks));

			const trackSubscribed = (track) => {
				if (track.kind === "video") {
					setVideoTracks((videoTracks) => [ ...videoTracks, track ]);
					// videoTracks.push(track);
				} else if (track.kind === "audio") {
					setAudioTracks((audioTracks) => [ ...audioTracks, track ]);
					// audioTracks.push(track);
				}
			};

			const trackUnsubscribed = (track) => {
				if (track.kind === "video") {
					setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
				} else if (track.kind === "audio") {
					setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
				}
			};

			participant.on("trackSubscribed", trackSubscribed);
			participant.on("trackUnsubscribed", trackUnsubscribed);

			return () => {
				setVideoTracks([]);
				setAudioTracks([]);
				participant.removeAllListeners();
			};
		},
		[ participant ]
	);

	useEffect(
		() => {
			const videoTrack = videoTracks[0];
      console.log("Video Tracks")
      console.log(videoTracks)
      console.log("participant")
      console.log(participant)
			if (videoTrack) {
				videoTrack.attach(videoRef.current);
				return () => {
					videoTrack.detach();
				};
			}
		},
		[ videoTracks ]
	);

	useEffect(
		() => {
			const audioTrack = audioTracks[0];
			if (audioTrack) {
				audioTrack.attach(audioRef.current);
				return () => {
					audioTrack.detach();
				};
			}
		},
		[ audioTracks ]
	);

	return (
		<div className="participant">
			{participant.videoTracks.size
        ? <video
				  className={userType === "remote" || video.type === "tour" ? classes.remoteVideo : classes.localVideo}
				  ref={videoRef}
				  autoPlay={true}
			  />
        : <></>
      }
			<audio ref={audioRef} autoPlay={true} />
		</div>
	);
};

export default Participant;
