import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import { EventSubListener } from '@twurple/eventsub';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.ttvClientID;
const clientSecret = process.env.ttvClientSecret;
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

const listener = new EventSubListener({
	apiClient,
	adapter: new NgrokAdapter(),
	secret: 'TheCampFireIsLit'
});

await listener.listen();