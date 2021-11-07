import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { getExtFiles } from './utils.js'
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.DISCORD_CLIENTID;
const guildId = process.env.DISCORD_GUILDID;
const discordToken = process.env.DISCORD_TOKEN;

const commands = []
const files = getExtFiles('./commands/discord', '.js')
for (const file of files) {
  const command = await import(`./commands/discord/${file}`)
  commands.push(command.default.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(discordToken)

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => { console.log('thecampfirebot has successfully registered its commands with Discord') })
  .catch(err => console.error(err))
