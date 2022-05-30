import { NgrokAdapter } from "@twurple/eventsub-ngrok";
import { EventSubListener } from '@twurple/eventsub';
import { ApiClient } from '@twurple/api';
import { ClientCredentialsAuthProvider } from "@twurple/auth";

import dotenv from "dotenv";


dotenv.config();
const clientId = process.env.ttvClientId;
const clientSecret = process.env.ttvClientSecret

const apiAuth = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({authProvider: apiAuth})
const eventListener = new EventSubListener({
    apiClient,
    adapter: new NgrokAdapter,
    secret: 'TheCampFire',
    strictHostCheck: true
});

export {
    eventListener,
    apiClient,
    apiAuth
}