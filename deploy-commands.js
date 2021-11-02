import fs from 'fs-extra';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';
dotenv.config();

// These lines make "require" available
//QUICK PATCH
//TODO: FIX
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const commands = [];
const commandFiles = fs.readdirSync('./commands/discord').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/discord/${file}`); //TODO: FIX
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENTID, process.env.DISCORD_GUILDID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);