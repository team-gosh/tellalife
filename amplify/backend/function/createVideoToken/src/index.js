require("dotenv").config();

const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const apiKey = process.env.REACT_APP_TWILIO_APIKEY;
const apiSecret = process.env.REACT_APP_TWILIO_API_SECRET;

// twilio
const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = (config) => {
	return new AccessToken(accountSid, apiKey, apiSecret);
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
	const token = videoToken(event.queryStringParameters.identity, event.queryStringParameters.room, generateToken());

	const jwtToken = { token: token.toJwt() };

	const response = {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "OPTIONS,POST,GET",
		},
		body: JSON.stringify(jwtToken),
		isBase64Encoded: false,
	};

	console.log(response);

	callback(null, response);
};
