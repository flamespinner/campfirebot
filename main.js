//Config Import
import dotenv from 'dotenv';
dotenv.config()
//End Config import

//twitch
import { ApiClient } from 'twitch';
import { StaticAuthProvider } from 'twitch-auth';
import { PubSubClient } from 'twitch-pubsub-client';
import { EventSubListener } from 'twitch-eventsub';
import { PubSubSubscriptionMessage } from 'twitch-pubsub-client';
import tmi from 'twitch-auth-tmi';

const clientId = process.env.TTV_CLIENT_ID;
const accessToken = process.env.TTV_SECRET;
const twitchChannel = process.env.TTV_CHANNEL;
const pubSubClient = new PubSubClient();


const authProvider = new StaticAuthProvider(clientId, accessToken);
const twitch_client = new tmi.client({
	options: { debug: true, messageLogLevel: 'info' },
	connection: {
		reconnect: true,
		secure: true
	},
	authProvider: authProvider,
	channels: [twitchChannel]
});
twitch_client.connect().catch(console.error);
twitch_client.on('message', (channel, tags, message, self) => {
	if (self) return;
	if (message.toLowerCase() == '!hello') {
		client.say(channel, '@${tags.username}, heya!');
	} 
});

//const userId = await pubSubClient.registerUserListener(apiClient);
//const listener = await pubSubClient.onSubscription(userId, (message: PubSubSubscriptionMessage) => {
//	console.log(`${message.userDisplayName} just subscribed!`);
//});



const apiClient = new ApiClient({ authProvider });
//end twitch auth





//Discord
import { promisify } from 'util';
import DiscordJS, { Intents, Message, Collection, Client } from 'discord.js';
import fs from 'fs-extra'
//end Discord Imports

const discord_client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

discord_client.on('ready', () => {
    console.log('Campfire Bot Is Connected');
});

discord_client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/discord').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    //const command = await import('./commands/discord/${file}');
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
	//client.commands.set(command.default.name, command);
}


discord_client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'beep') {
		await interaction.reply('Boop!');
	}
});

discord_client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = discord_client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error executing this command', ephemeral: true});
	}
});

discord_client.login(process.env.DISCORD_TOKEN)
