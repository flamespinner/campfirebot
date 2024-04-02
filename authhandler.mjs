import { ttvchatClient } from "./authhandler/ttvChatAuth.mjs";
import { tvPubSubClient } from "./authhandler/ttvPubSubAuth.mjs";
import { discordClient, discordToken } from "./authhandler/discordAuth.mjs";
import { apiClient, eventListener } from "./authhandler/ttvEventSub.mjs";


discordClient.login(discordToken);
//await eventListener.start().then(() => console.log('Event Listener Listening'));
await ttvchatClient.connect();
//await apiClient.eventSub.deleteAllSubscriptions();
ttvchatClient.onConnect((channel, msg) => {
    console.log('Connected to Twitch')
    ttvchatClient.say('Agent_Flame', 'The Campfire is Lit')
});

ttvchatClient.onDisconnect((channel, msg) => {
    console.log('Disconnected from Twitch')
    ttvchatClient.say('Agent_Flame', 'The Campfire has been putout')
});

ttvchatClient.onJoinFailure((channel, msg) => {
    console.log('Failed to connect to Twitch')
});

export {
    discordClient,
    ttvchatClient,
    eventListener
}