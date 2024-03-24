import { RefreshingAuthProvider } from "@twurple/auth";
import { ChatClient } from '@twurple/chat';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.ttvClientId;
const clientSecret = process.env.ttvClientSecret;
const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
const authProvider = new RefreshingAuthProvider(
    {
        logger: {
            minLevel: 'error'
        },
        clientId,
        clientSecret,
        onRefresh: async (userId, newTokenData) => await fs.writeFile(`./tokens.${userId}.json`, JSON.stringify(newTokenData, null, 4), 'UTF-8') 
    },
);

await authProvider.addUserForToken(tokenData, ['chat'])

const ttvchatClient = new ChatClient(
    {
        logger: {
            minLevel: 'error'
        },
        authProvider,
        channels: ['Agent_Flame'] 
    }
);


export {
    authProvider,
    ttvchatClient
}