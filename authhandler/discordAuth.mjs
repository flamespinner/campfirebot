import { Client, GatewayIntentBits, ActivityType, Events } from 'discord.js';
import dotenv from 'dotenv';
import { connectAlert } from '../discord/embed.mjs'

dotenv.config();

const discordToken = process.env.discordToken;

const discordClient = new Client ({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		//GatewayIntentBits.GuildMembers,
    ],
});

discordClient.once('ready', () => {
    console.log(`Discord: ${discordClient.user.tag} Connected`); 
    const channel = discordClient.channels.cache.get(process.env.discordTTVLogChannel)
    //console.log(channel)
    discordClient.user.setPresence({ 
        activities: [{ name: "Tending to the Fire", type: ActivityType.Streaming, url: "https://twitch.tv/agent_flame"}],
        status: 'dnd'
    });
/*     channel.send({ embeds: [connectAlert] });
 */
});

export {
    discordClient,
    discordToken,
}
