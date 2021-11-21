import * as fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';
dotenv.config();

const discordToken = process.env.discordToken;
const discordClientId = process.env.discordClientId;
const discordGuildId = process.env.discordGuildId;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const discordCommand = require(`./commands/${file}`);
	commands.push(discordCommand.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(discordToken);

rest.put(Routes.applicationGuildCommands(discordClientId, discordGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);