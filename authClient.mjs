import { ClientCredentialsAuthProvider, RefreshingAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { PubSubClient } from '@twurple/pubsub';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { ChatClient } from '@twurple/chat';
import { Client } from 'discord.js';

dotenv.config();

const clientId = process.env.ttvClientID;
const clientSecret = process.env.ttvClientSecret;
const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
const authProvider = new ClientCredentialsAuthProvider(
    {
        clientId,
        clientSecret,
    onRefresh: async (newTokenData) => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
}, tokenData);

const apiClient = new ApiClient({ authProvider });

const ttvchatClient = new ChatClient({
    authProvider, 
    channels: [process.env.ttvChannel] 
});

const ttvPubSubClient = new PubSubClient();
const userId = await ttvPubSubClient.registerUserListener(authProvider);

await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('Connected to Twitch')
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
