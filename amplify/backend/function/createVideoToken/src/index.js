require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_APIKEY;
const apiSecret = process.env.TWILIO_API_SECRET;

// twilio
const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = (config) => {
	return new AccessToken(
		"AC279350ed9469ed0b3f128b39865384ac",
		"SK53bb5f7f0406e4d81eeeb647c682df9a",
		"X6Dan53akV8IPz9Tg4yjfaILPwhflE2b"
	);
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
