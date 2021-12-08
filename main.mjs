import { StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { ChatClient } from '@twurple/chat';
import { PubSubClient } from '@twurple/pubsub';
import { followAgeListener } from './commands/twitch/followage.mjs';
import * as axios from 'axios';
import * as fs from 'fs';
//import { client } from 'websocket'; //TODO
//import { WebSocketServer } from 'w';
import { Client, Collection, MessageEmbed } from 'discord.js';
//import { Chatbox, ChatboxMessage } from './modules/chatBox.js'

import dotenv from 'dotenv';
import { channel } from 'diagnostics_channel';
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
const ttvAccessToken = process.env.ttvClientTokenAcc;
const ttvRefreshtoken = process.env.ttvRefreshtoken;
const ttvEventLog = process.env.discordTTVLogChannel;

const discordToken = process.env.discordToken;
const discordClientId = process.env.discordClientId;
const discordGuildId = process.env.discordGuildId;
//const commandFilesTwitch = fs.readdirSync("commands/twitch").filter(file => file.endsWith(".js"));


//auth twitch
const authProvider = new StaticAuthProvider(ttvClientId, ttvAccessToken);


const apiClient = new ApiClient({ authProvider });
const ttvpubSubClient = new PubSubClient();
const userId = await ttvpubSubClient.registerUserListener(authProvider);
const ttvchatClient = new ChatClient({ authProvider, channels: [process.env.ttvChannel] });
const discordClient = new Client ({
	intents: ["GUILDS", "GUILD_MESSAGES"],
});
const discordbotlog = discordClient.channels.cache.get(ttvEventLog);


//connect to chat
await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('TTVconnected');
	console.log('Hue Online');
});
setLightsForStream();

discordClient.once('ready', () => {
	console.log('Discord Connected');
	discordClient.user.setPresence({ activities: [{ name: 'Tending to the Fire', type: 'STREAMING', url: "https://twitch.tv/agent_flame" }], status: 'live' });
});
discordClient.login(discordToken);


//start of command handler
discordClient.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/discord').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
//	const discordCommand = require(`./commands/discord/${file}`);
//	discordClient.commands.set(command.data.name, discordCommand);
}

//End Command Handlers



ttvchatClient.onMessage((channel, user, message) => {
	if (message === '!ping') {
		ttvchatClient.say(channel, 'Pong!');
	} else if (message === '!dice') {
		const diceRoll = Math.floor(Math.random() * 6) + 1;
		ttvchatClient.say(channel, `@${user} rolled a ${diceRoll}`)
	} else if (message === '!costream') {
		ttvchatClient.say(channel, 'Tonight we are surviving in the forest together. Joining me we have Askesienne http://twitch.tv/askesienne and Lantheos http://twitch.tv/lantheos. Go check them out and say Hi! You can see all of our views here: https://multistre.am/agent_flame/askesienne/lantheos/layout7/');
	} else if (message === '!pronouns') {
		ttvchatClient.say(channel, '/me I use they/them! If you would like to be able to set your pronouns on Twitch, I will be able to see them directly in chat using a browser extension. Your pronouns will show up next to your name for anyone to read! Log in with Twitch at https://pronouns.alejo.io/ to adjust your settings. <3');
	} else if (message === '!hello') {
		ttvchatClient.say(channel, `Heya! @${user} My hame is Campfirebot! Nice to meet you!`);
	} else if (message === '!discord') {
		ttvchatClient.say(channel, 'Join us on Discord for in-game voice, going live alerts, and other chit-chat! https://discord.gg/TbUtUjY');
	} else if (message === '!stjude') {
		ttvchatClient.say(channel, "This month we are fundraising for St. Jude Children's Research Hospital. It is St. Jude's mission to provide treatment and care to all regardless of race, religion. As well as never leave the family with a bill. https://tiltify.com/@agent_flame/the-campfire-x-st-jude-play-live-2021");
	} else if (message === '!zoomzoom') {
		ttvchatClient.say(channel, 'Lets !Race');
	} else if (message === '!lurk') {
		ttvchatClient.say(channel, `@${user} has decided to minimize instead of quit! Catch you later!`);
	} else if (message === '!zoomzoom2') {
		ttvchatClient.say(channel, '!boost');
	} else if (message === '!unlurk') {
		ttvchatClient.say(channel, `Welcome Back @${user}`);
	} else if (message === '!commands') {
		ttvchatClient.say(channel, '!ping, !dice, !costream, !pronouns, !hello, !discord, !stjude, !zoomzoom, !lurk, !zoomzoom2, !unlurk, !commands');
	}
	else if (message === '!systest') {
		discordClient.channels.cache.get(ttvEventLog).send(`@${user} is testing`);
		ttvchatClient.say(channel, 'Test Sent');
		FollowerAlertSequance();
		//SubAlertSequance();
	}
	else if (message === 'hey') {
		ttvchatClient.say(channel, `hello @${user}`);
	}
	else if (message === 'Hey') {
		ttvchatClient.say(channel, `Hello @${user}!`);
	}
	else if (message === '!followage') {
		followAgeListener();
	}
});

ttvchatClient.onSub((channel, user) => {
	ttvchatClient.say(channel, `Welcome around the campfire @${user}!`);
	discordClient.channels.cache.get(ttvEventLog).send(`@${user} just subscribed`);

});

ttvchatClient.onResub((channel, user, subInfo) => {
	ttvchatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
	discordClient.channels.cache.get(ttvEventLog).send(`@${user} just resubscribed`);
});

ttvchatClient.onSubGift((channel, user, subInfo) => {
//	ttvchatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
	discordClient.channels.cache.get(ttvEventLog).send(`@${subInfo.gifter} just gifed a subscription to ${user}!`);
});


/*//Listening for PubSub Sub event
const listener = await ttvpubSubClient.onSubscription(userId, (message) => {
    console.log(`${message.userDisplayName} just subscribed!`);
});*/
export { ttvchatClient, apiClient };

/*
async function isStreamLive(userName: string) {
	const user = await apiClient.users.getUserByName(userName);
	if (!user) {
		return false;
	}
	return await user.getStream() !== null;
}*/