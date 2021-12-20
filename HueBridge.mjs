import { StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { ChatClient } from '@twurple/chat';
import { PubSubClient } from '@twurple/pubsub';
import * as axios from 'axios';

import dotenv from 'dotenv';
import { FollowerAlertSequance, setLightsForStream, setLightsToRandomColors, controlAllLights } from './hue.mjs';
dotenv.config();

//Hue
const HUEBRIDGEIP = process.env.bridgeIP;
const HUEUSER = process.env.hueUsername;

const controlLight = async(lightId, on, hue, sat, bri) => {
	try {
		return await axios.put(
			`http://${HUEBRIDGEIP}/api/${HUEUSER}/lights/${lightId}/state`,
			{
				on,
					... (sat && { sat}),
					... (bri && { bri }),
					... (hue && { hue }),
			}
		);
	}catch (err) {
		//console.error(error);
	}
};

//create auth const
const ttvClientId = process.env.ttwClientId;
const ttvClientSecret = process.env.ttvClientSecret;
const ttvClientToken = process.env.ttvClientTokenAcc;
const ttvRefreshtoken = process.env.ttvRefreshtoken;

//auth twitch
const authProvider = new StaticAuthProvider(ttvClientId, ttvClientToken);


const apiClient = new ApiClient({ authProvider });
const ttvpubSubClient = new PubSubClient();
const userId = await ttvpubSubClient.registerUserListener(authProvider);
const ttvchatClient = new ChatClient({ authProvider, channels: [process.env.ttvChannel] });


//connect to chat
await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('TTVconnected');
	console.log('Hue Online');
});
setLightsForStream();

ttvchatClient.onMessage((channel, user, message) => {
	if (message === '!systestHUE') {
		ttvchatClient.say(channel, 'Sending Hue Test');
		FollowerAlertSequance();
		//SubAlertSequance();
		console.log("testing Hue");
	}
/*	else if (message === 'hey') {
		ttvchatClient.say(channel, `hello @${user}`);
	} */
});


ttvchatClient.onSub((channel, user) => {
	FollowerAlertSequance();
});

ttvchatClient.onResub((channel, user, subInfo) => {
	FollowerAlertSequance();
});

/*ttvchatClient.onSubGift((channel, user, subInfo) => {
//	ttvchatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
});*/
export { };