import dotenv from 'dotenv';
dotenv.config()

import { promisify } from 'util';
import DiscordJS, { Intents, Message, Collection, Client } from 'discord.js';
import fs from 'fs-extra'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('Bot is ready');
});

client.commands = new Collection();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'beep') {
		await interaction.reply('Boop!');
	}
});

client.login(process.env.DISCORD_TOKEN)
