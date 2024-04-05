import { NgrokAdapter } from "@twurple/eventsub-ngrok";
import { EventSubWsListener } from '@twurple/eventsub-ws'
import { EventSubHttpListener } from '@twurple/eventsub-http';
import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from "@twurple/auth";

import dotenv from "dotenv";


dotenv.config();

const clientId = process.env.ttvClientId;
const clientSecret = process.env.ttvClientSecret

const apiAuth = new AppTokenAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({authProvider: apiAuth})

const eventListener = new EventSubWsListener({
    apiClient
});

/* const eventListener = new EventSubHttpListener({
    apiClient,
    adapter: new NgrokAdapter({
        ngrokConfig: {
            authtoken: process.env.NGROKTOKEN
        }
    }),
    secret: 'TheCampFire'
}); */

eventListener.start();


export {
    eventListener,
    apiClient,
    apiAuth
}