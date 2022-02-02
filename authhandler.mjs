import { ttvchatClient } from "./ttvChatAuth.mjs";
import { tvPubSubClient } from "./ttvPubSubAuth.mjs";
import { discordClient, discordToken } from "./discordAuth.mjs";
import { eventListener } from "./ttvEventSub.mjs";


discordClient.login(discordToken);
await eventListener.listen();
await ttvchatClient.connect();
ttvchatClient.onRegister((channel, msg) => {
    console.log('Connected to Twitch')
    ttvchatClient.say('Agent_Flame', 'The Campfire is Lit')
});

export {
    discordClient,
    ttvchatClient
}