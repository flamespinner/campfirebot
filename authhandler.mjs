import { ttvchatClient } from "./authhandler/ttvChatAuth.mjs";
import { tvPubSubClient } from "./authhandler/ttvPubSubAuth.mjs";
import { discordClient, discordToken } from "./authhandler/discordAuth.mjs";
import { eventListener } from "./authhandler/ttvEventSub.mjs";


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