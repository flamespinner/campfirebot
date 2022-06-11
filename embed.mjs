import { discordClient, ttvchatClient } from './authhandler.mjs';
import { MessageEmbed } from 'discord.js';

const ttvEventLog = process.env.discordTestChannel;
const channel = discordClient.channels.cache.get(ttvEventLog);

const followEmbed = new MessageEmbed()
	.setColor('#00FF00')
	.setTitle('New Follower!')
	.setDescription('Some description here')
	.setThumbnail('https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/follow-embed-icon.png')
	.setTimestamp()
	.setFooter({ text: 'Twitch'});
channel.send({ embeds: [followEmbed] });


const hostEmbed = new MessageEmbed()
	.setColor('#ff0000')
	.setTitle('New Host!')
	.setDescription('Some description here')
	.setThumbnail('https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/host-embed-icon.png')
	.setTimestamp()
	.setFooter({ text: 'Twitch'});
channel.send({ embeds: [hostEmbed] });


const subEmbed = new MessageEmbed()
	.setColor('#6441a5')
	.setTitle('New Subscriber!')
	.setDescription('Some description here')
	.setThumbnail('https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/2')
	.setTimestamp()
	.setFooter({ text: 'Twitch'});
channel.send({ embeds: [subEmbed] });


const bitEmbed = new MessageEmbed()
	.setColor('#6441a5')
	.setTitle('New Cheer!')
	.setDescription('Some description here')
	.setThumbnail('https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/100/1.gif')
	.setTimestamp()
	.setFooter({ text: 'Twitch'	});
channel.send({ embeds: [bitEmbed] });

export { followEmbed, hostEmbed, subEmbed, bitEmbed }
