<<<<<<< HEAD
=======
require("dotenv").config();

>>>>>>> 4643bb0e4c8201b52e22c318bde945ebbc2a3f64
const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const apiKey = process.env.REACT_APP_TWILIO_APIKEY;
const apiSecret = process.env.REACT_APP_TWILIO_API_SECRET;

// twilio
const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = (config) => {
<<<<<<< HEAD
	return new AccessToken(accountSid, apiKey, apiSecret);
=======
	return new AccessToken(
		accountSid,
		apiKey,
		apiSecret
	);
>>>>>>> 4643bb0e4c8201b52e22c318bde945ebbc2a3f64
};

const getVideo = () => {
	const videoToken = (identity, room, config) => {
		let videoGrant;
		if (typeof room !== "undefined") {
			videoGrant = new VideoGrant({ room });
		} else {
			videoGrant = new VideoGrant();
		}
		const token = generateToken(config);
		token.addGrant(videoGrant);
		token.identity = identity;

		return token;
	};
	return videoToken;
};

exports.handler = async (event, context, callback) => {
	const videoToken = getVideo();
	console.log(event.arguments.input, "this is event in lambda func");
	const token = videoToken(event.arguments.input.identity, event.arguments.input.room, generateToken());

	const jwtToken = { token: token.toJwt() };

	callback(null, jwtToken.token);
};
