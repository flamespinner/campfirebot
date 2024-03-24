import { NgrokAdapter } from "@twurple/eventsub-ngrok";
import { EventSubHttpListener } from '@twurple/eventsub-http';
import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from "@twurple/auth";

import dotenv from "dotenv";


dotenv.config();
const clientId = process.env.ttvClientId;
const clientSecret = process.env.ttvClientSecret

const apiAuth = new AppTokenAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({authProvider: apiAuth})
const eventListener = new EventSubHttpListener({
    apiClient,
    adapter: new NgrokAdapter,
    secret: 'TheCampFire',
    strictHostCheck: true,
    legacySecrets: 'true'
});

apiClient.eventSub.deleteAllSubscriptions()

export {
    eventListener,
    apiClient,
    apiAuth
}