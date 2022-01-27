import { RefreshingAuthProvider, ClientCredentialsAuthProvider } from '@twurple/auth';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import { DirectConnectionAdapter, EventSubListener } from '@twurple/eventsub';
import { ApiClient } from '@twurple/api';
import { PubSubClient } from '@twurple/pubsub';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { ChatClient } from '@twurple/chat';
import { Client } from 'discord.js';

dotenv.config();

const clientId = process.env.ttvClientID;
const clientSecret = process.env.ttvClientSecret;
const apiSecret = process.env.ttvAppAccessToken;
const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
const chatAuthProvider = new RefreshingAuthProvider(
    {
        clientId,
        clientSecret,
        onRefresh: async (newTokenData) => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
    }, 
    tokenData
);

const subAuthProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider: subAuthProvider });

const eventListener = new EventSubListener({
    apiClient,
    adapter: new NgrokAdapter,
    secret: process.env.secret
});

const ttvchatClient = new ChatClient({
    chatAuthProvider, 
    channels: [process.env.ttvChannel] 
});

const ttvPubSubClient = new PubSubClient();
const userId = await ttvPubSubClient.registerUserListener(chatAuthProvider);

await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('Connected to Twitch')
});
await eventListener.listen();

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
    apiClient,
    ttvchatClient,
    discordClient,
    discordToken,
    eventListener,
    userId
}
