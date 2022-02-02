import { StaticAuthProvider } from "@twurple/auth";
import dotenv from 'dotenv';
import { ChatClient } from '@twurple/chat';
dotenv.config();

const clientId = process.env.ttvClientID;
const accesstoken = process.env.ttvAppAccessToken;

const authProvider = new StaticAuthProvider(
    clientId,
    accesstoken
);

const ttvchatClient = new ChatClient({ authProvider, channels: ['Agent_Flame']});
await ttvchatClient.connect();

/*import { RefreshingAuthProvider } from '@twurple/auth';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { ChatClient } from '@twurple/chat';

dotenv.config();

const clientId = process.env.ttvClientID;
const clientSecret = process.env.ttvClientSecret;
const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
const chatAuthProvider = new RefreshingAuthProvider(
    {
        clientId,
        clientSecret,
        onRefresh: async (newTokenData) => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
    }, 
    tokenData
);

const ttvchatClient = new ChatClient({ chatAuthProvider, channels: ['Agent_Flame']});

await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('Connected to Twitch')
    ttvchatClient.say('Agent_Flame', 'Connected')
});
*/
export {
    ttvchatClient
}
