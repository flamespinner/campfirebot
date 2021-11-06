//Config Import
import dotenv from 'dotenv';
dotenv.config()
//End Config import

//twitch auth
import { ApiClient } from 'twitch';
import { ChatClient } from 'twitch-chat-client';
import { StaticAuthProvider } from 'twitch-auth';

const clientId = process.env.TTV_CLIENT_ID;
const accessToken = process.env.TTV_SECRET;
const twitchChannel = process.env.TTV_CHANNEL;


const authProvider = new StaticAuthProvider(clientId, accessToken);
const chatClient = new ChatClient(authProvider, { channels: [twitchChannel] }); //Join What Chat
//listen for events
await chatClient.connect();

const apiClient = new ApiClient({ authProvider });
//end twitch auth

//Discord
import { promisify } from 'util';
import DiscordJS, { Intents, Message, Collection, Client } from 'discord.js';
import fs from 'fs-extra'
//end Discord Imports

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log('Campfire Bot Is Connected');
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/discord').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    //const command = await import('./commands/discord/${file}');
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
	//client.commands.set(command.default.name, command);
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'beep') {
		await interaction.reply('Boop!');
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error executing this command', ephemeral: true});
	}
});

client.login(process.env.DISCORD_TOKEN)
