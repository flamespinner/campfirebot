import { discordClient } from './authhandler.mjs';
import { MessageEmbed } from 'discord.js';



//msg embed test
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle("title")
	.setURL('https://discord.js.org/')
	.setAuthor('Test Name', 'https://i.imgur.com/AfFp7pu.png')
	.setDescription("hmmm")
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addField('Inline fiewld title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

//end embed test
//channel.send({ embeds: [exampleEmbed] });
export { exampleEmbed }