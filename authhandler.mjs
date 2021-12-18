import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import { Client } from 'discord.js';
import { ApiClient } from '@twurple/api';
import { PubSubClient } from '@twurple/pubsub';


import dotenv from 'dotenv';
dotenv.config();

//twitch
const ttvclientId = process.env.ttvClientId;
const ttvaccessToken = process.env.ttvClienttokenAcc;

const authProvider = new StaticAuthProvider(ttvclientId, ttvaccessToken);
const apiClient = new ApiClient({ authProvider });

const ttvchatClient = new ChatClient({ authProvider, channels: [process.env.ttvChannel] });

const ttvPubSubClient = new PubSubClient();
const userId = await ttvPubSubClient.registerUserListener(authProvider);

//connect twitch
await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('TTVconnected');
});

//discord
const discordToken = process.env.discordToken;
const discordActivity = process.env.discordActivity;
const discordClient = new Client ({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

//when discordclient is ready set discord user activity and status
discordClient.once('ready', () => {
	console.log('Discord Connected');
	discordClient.user.setPresence({ activities: [{ name: discordActivity, type: 'STREAMING', url: "https://twitch.tv/agent_flame" }], status: 'live' });
});

//login discord
discordClient.login(discordToken);

export { 
    authProvider,
    discordClient,
    discordToken,
    ttvchatClient,
    apiClient,
    userId 
}
