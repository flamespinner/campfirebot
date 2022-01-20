import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { apiClient } from './authhandler.mjs';
//import { apiClient } from './authClient.mjs';
import dotenv from 'dotenv';
import { EventSubListener } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
dotenv.config();


const listener = new EventSubListener({
    apiClient,
    adapter: new NgrokAdapter(),
    secret: 'thisshouldbeaRandomlyGeaefgneratedFixedString1111'
});
await listener.listen();

export {

}

/**
 * node:internal/process/esm_loader:94
    internalBinding('errors').triggerUncaughtException(
                              ^
 *[InvalidTokenTypeError: EventSub requires app access tokens to work; please use the ClientCredentialsAuthProvider in your API client.]

 */