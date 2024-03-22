import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const discordToken = process.env.discordToken;
const discordStatus = process.env.discordActivity
const discordClient = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

discordClient.once('ready', () => {
    console.log('Discord Connected');
    discordClient.user.setPresence({ activities: [{ name: discordStatus, type: 'STREAMING', url: "https://twitch.tv/agent_flame"}], status: 'live'});
});

export {
    discordClient,
    discordToken
}
