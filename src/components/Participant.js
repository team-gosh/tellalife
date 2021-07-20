import React, { useState, useEffect, useRef } from "react";

const Participant = (props) => {
  const {
    participant,
    roomType,
    userType,
    windowSize,
    tellerHeight,
    listenerHeight
  } = props
	const [ videoTracks, setVideoTracks ] = useState([]);
	const [ audioTracks, setAudioTracks ] = useState([]);
  const [ height, setHeight ] = useState(1)

	const videoRef = useRef();
	const audioRef = useRef();

	const trackpubsToTracks = (trackMap) =>
		Array.from(trackMap.values()).map((publication) => publication.track).filter((track) => track !== null);

  useEffect(() => {
    setHeight(windowSize ? windowSize.height : 1)
  }, [])

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

  // console.log('tellerHeight')
  // console.log(tellerHeight)
  // console.log('listenerHeight')
  // console.log(listenerHeight);
  // console.log('windowSize')
  // console.log(windowSize)


	return (
		<div className="participant">
			{/* <h5>{participant.identity}</h5> */}
			{/* <video width={userType === "remote" ? "640" : "160"} height={userType === "remote" ? "480" : "120"} ref={videoRef} autoPlay={true} /> */}
			<video height={userType === "remote" ? "480" : "120"} ref={videoRef} autoPlay={true} />
			{/* <video height={userType === "remote" ? tellerHeight : listenerHeight} ref={videoRef} autoPlay={true} /> */}
			{/* <video height={windowSize ? Math.floor(windowSize.height * (userType === "remote" ? .75 : .15)) : "120"} ref={videoRef} autoPlay={true} /> */}
			{/* <video height={Math.floor(height * (userType === "remote" ? .75 : .15))} ref={videoRef} autoPlay={true} /> */}
			<audio ref={audioRef} autoPlay={true} />
		</div>
	);
};

export default Participant;
