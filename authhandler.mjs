import { RefreshingAuthProvider } from '@twurple/auth';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
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
        logger: {
            minLevel: 'debug'
        },
        clientId,
        clientSecret,
        onRefresh: async (newTokenData) => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
    },
    tokenData
);

const ttvchatClient = new ChatClient(
    {
        logger: {
            minLevel: 'debug'
        },
        chatAuthProvider,
        channels: ['Agent_Flame']
    });

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider, logger: {minLevel: "DEBUG"} });

const eventListener = new EventSubListener({
    logger: {
        minLevel: 'debug'
    },
    apiClient,
    adapter: new NgrokAdapter,
    secret: 'TheCampFire'
});

const ttvPubSubClient = new PubSubClient();
const userId = await ttvPubSubClient.registerUserListener(chatAuthProvider);





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
await eventListener.listen();
await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('Connected to Twitch')
    ttvchatClient.say('Agent_Flame', 'Connected')
});

export {
    apiClient,
    ttvchatClient,
    ttvPubSubClient,
    discordClient,
    eventListener,
    userId
}
