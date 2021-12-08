import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { DirectConnectionAdapter, EventSubListener } from '@twurple/eventsub';
import dotenv from 'dotenv';
dotenv.config();

const ttvClientId = process.env.ttwClientId;
const ttvClientSecret = process.env.ttvClientSecret;

const authProvider = new ClientCredentialsAuthProvider(ttvClientId, ttvClientSecret);
const apiClient = new ApiClient({ authProvider });
const adapter = new DirectConnectionAdapter({
    hostName: 'example.com',
    sslCert: {
        key: 'aaaaaaaaaaaaaaa',
        cert: 'bbbbbbbbbbbbbbb'
    }
});
const secret = 'thisShouldBeARandomlyGeneratedFixedString';
const listener = new EventSubListener({ apiClient, adapter, secret });
await listener.listen();

export {}