import { discordClient } from './authhandler.mjs';
import { EmbedBuilder } from 'discord.js';
import { uptime } from './commands/twitch/ping.mjs';
import dotenv from 'dotenv';

dotenv.config();

//const ttvEventLog = process.env.discordTTVLogChannel;
//const channel = discordClient.channels.cache.get("911283197730521150");
const channel = discordClient.channels.cache.get("911283197730521150")

console.log(process.env.discordTTVLogChannel)
console.log(channel)

// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

//channel.send({ embeds: [exampleEmbed] });

/* 
// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png' }
);

//channel.send({ embeds: [exampleEmbed] });

const connectAlert = new EmbedBuilder()
	.setColor(0x99FF00)
	.setTitle('Campfirebot is Connected!')
	.setURL('https://twitch.tv/agent_flame')
	.setAuthor({ name: 'Campfire Bot', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png', url: 'https://twitch.tv/agent_flame' })
	.setDescription('The Campfire has been lit and the bot is connecting to Discord and Twitch...')
	.setThumbnail('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.addFields(
		//{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Ping Status', value: `Coming Soon...`, inline: true },
		{ name: 'UpTime', value: `${uptime} ms`, inline: true },
	)
	//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	//.setImage('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.setTimestamp()
	.setFooter({ text: 'CampfireBot V2', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png' }
);

const disconnectAlert = new EmbedBuilder()
	.setColor(0xFF0000)
	.setTitle('Campfire Has Been Putout!')
	.setURL('https://twitch.tv/agent_flame')
	.setAuthor({ name: 'Campfire Bot', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png', url: 'https://discord.js.org' })
	.setDescription('The Campfire has been putout and the bot is disconnecting...')
	.setThumbnail('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.addFields(
		//{ name: 'Regular field title', value: 'Some value here' },
		//{ name: '\u200B', value: '\u200B' },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	//.setImage('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.setTimestamp()
	.setFooter({ text: 'CampfireBot V2', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png' }
);

//Log Embeds

const followerAlert = new EmbedBuilder()
	.setColor(0xFF0000)
	.setTitle('New Follower')
	.setURL('https://twitch.tv/agent_flame')
	.setAuthor({ name: 'Campfire Bot', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png', url: 'https://discord.js.org' })
	.setDescription('Some Text')
	.setThumbnail('https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/follow-embed-icon.png')
	.addFields(
		//{ name: 'Regular field title', value: 'Some value here' },
		//{ name: '\u200B', value: '\u200B' },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	//.setImage('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.setTimestamp()
	.setFooter({ text: 'CampfireBot V2', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png' }
);

const subAlert = new EmbedBuilder()
	.setColor(0xFF0000)
	.setTitle('New Subscriber')
	.setURL('https://twitch.tv/agent_flame')
	.setAuthor({ name: 'Campfire Bot', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png', url: 'https://discord.js.org' })
	.setDescription('Some Text')
	.setThumbnail('https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/2')
	.addFields(
		//{ name: 'Regular field title', value: 'Some value here' },
		//{ name: '\u200B', value: '\u200B' },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	//.setImage('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.setTimestamp()
	.setFooter({ text: 'CampfireBot V2', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png' }
);

const hostAlert = new EmbedBuilder()
	.setColor(0xFF0000)
	.setTitle('New Subscriber')
	.setURL('https://twitch.tv/agent_flame')
	.setAuthor({ name: 'Campfire Bot', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png', url: 'https://discord.js.org' })
	.setDescription('Some Text')
	.setThumbnail('https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/host-embed-icon.png')
	.addFields(
		//{ name: 'Regular field title', value: 'Some value here' },
		//{ name: '\u200B', value: '\u200B' },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	//.setImage('https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png')
	.setTimestamp()
	.setFooter({ text: 'CampfireBot V2', iconURL: 'https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png' }
);
 */

//end log embeds

//channel.send({ embeds: [disconnectAlert] });
//channel.send({ embeds: [followerAlert]});
//channel.send({ embeds: [subAlert]});
//channel.send({ embeds: [startAlert] });

export { 
	exampleEmbed,
/* 	connectAlert,
	disconnectAlert, */
	//channel,
}

//follow icon: https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/follow-embed-icon.png
//new host: https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/host-embed-icon.png
//new sub: https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/2
//bit https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/100/1.gif
//logo https://raw.githubusercontent.com/flamespinner/CampFireBot/2.0/logo.png
