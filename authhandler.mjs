import { ttvchatClient } from "./authhandler/ttvChatAuth.mjs";
import { tvPubSubClient } from "./authhandler/ttvPubSubAuth.mjs";
import { discordClient, discordToken } from "./authhandler/discordAuth.mjs";
import { apiClient, eventListener } from "./authhandler/ttvEventSub.mjs";


discordClient.login(discordToken);
//await eventListener.start().then(() => console.log('Event Listener Listening'));
await ttvchatClient.connect();
await apiClient.eventSub.deleteAllSubscriptions();
/* ttvchatClient.onRegister((channel, msg) => {
    console.log('Connected to Twitch')
    //ttvchatClient.say('Agent_Flame', 'The Campfire is Lit')
}); */

export {
    discordClient,
    ttvchatClient,
    eventListener
}