import { discordClient } from './authhandler.mjs';
import { MessageEmbed } from 'discord.js';

const ttvEventLog = process.env.discordTTVLogChannel;
const channel = discordClient.channels.cache.get(ttvEventLog);

// inside a command, event listener, etc.
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
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
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

channel.send({ embeds: [exampleEmbed] });

export { exampleEmbed }

//follow icon: https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/follow-embed-icon.png
//new host: https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/host-embed-icon.png
//new sub: https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/2
//bit https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/100/1.gif
