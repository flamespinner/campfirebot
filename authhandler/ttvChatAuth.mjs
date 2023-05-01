import { RefreshingAuthProvider } from "@twurple/auth";
import { ChatClient } from '@twurple/chat';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { userId } from "./ttvPubSubAuth.mjs";

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
        /*onRefresh: async (newTokenData) => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')*/
        onRefresh: async(userId, newTokenData) => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8'),
    },
    /*tokenData*/
);

await authProvider.addUserForToken(tokenData);

const ttvchatClient = new ChatClient(
    {
        logger: {
            minLevel: 'error'
        },
        authProvider,
        channels: ['Agent_Flame'] 
    });

export {
    authProvider,
    ttvchatClient
}