import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const discordToken = process.env.discordToken;
const discordStatus = process.env.discordActivity
const discordActivity = process.env

const discordClient = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

discordClient.once('ready', () => {
    console.log(`Discord: ${discordClient.user.tag} Connected`);
    discordClient.user.setPresence({ 
        activities: [{ name: "Tending to the Fire", type: ActivityType.Streaming, url: "https://twitch.tv/agent_flame"}],
        status: 'dnd'
    });
});


export {
    discordClient,
    discordToken
}
