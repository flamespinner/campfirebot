import { ApiClient } from '@twurple/api';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import { EventSubListener } from '@twurple/eventsub';
import { ClientCredentialsAuthProvider } from '@twurple/auth';

import dotenv from 'dotenv';
dotenv.config();


const ttvClientID = process.env.ttvAppID;
const ttvClientSecret = process.env.ttvClientSecret;

const authProvider = new ClientCredentialsAuthProvider(
    ttvClientID,
    ttvClientSecret
);

const apiClient = new ApiClient({ authProvider });

const listener = new EventSubListener( apiClient, new NgrokAdapter(), 'xxxxxxxxxxxxx');
/*

const listener = new EventSubListener(
    apiClient, 
    new NgrokAdapter(), 
    'xxxxddddsssssaaaa'
);

await listener.listen();
export default EventSubHandler;*/