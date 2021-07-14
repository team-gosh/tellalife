const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const apiKey = process.env.REACT_APP_TWILIO_APIKEY;
const apiSecret = process.env.REACT_APP_TWILIO_API_SECRET;

// twilio
const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
console.log(twilio, "twilio module");
console.log(AccessToken, "AccessToken");
console.log(VideoGrant, "VideoGrant");

const generateToken = (config) => {
	// const accessToken = new AccessToken(accountSid, apiKey, apiSecret);
	// console.log(accessToken, "accessToken from generatetoken func");

	// return accessToken;
	return new AccessToken(accountSid, apiKey, apiSecret);
};

const getVideo = () => {
	const videoToken = (identity, room, config) => {
		console.log(identity, "This is identity in getVideo func");
		console.log(room, "This is room in getVideo func");
		console.log(config, "This is config in getVideo func");
		let videoGrant;
		if (typeof room !== "undefined") {
			videoGrant = new VideoGrant({ room });
		} else {
			videoGrant = new VideoGrant();
		}
		console.log(videoGrant, "This is video grant in getVideo func");
		const token = generateToken(config);
		console.log(token, "This is token in getVideo func");
		token.addGrant(videoGrant);
		console.log(token, "This is token in getVideo func after addGrant");
		token.identity = identity;

		return token;
	};
	return videoToken;
};

exports.handler = async (event, context, callback) => {
	console.log("this is inside of handler");
	const videoToken = getVideo();
	const token = videoToken(event.arguments.input.identity, event.arguments.input.room, generateToken());

	const jwtToken = { token: token.toJwt() };

	callback(null, jwtToken.token);
};
