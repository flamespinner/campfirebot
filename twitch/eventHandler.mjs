import { EventSubHttpListener } from "@twurple/eventsub-http/lib";
import { eventListener, ttvchatClient } from "../authhandler.mjs";
import { userId } from "../authhandler/ttvPubSubAuth.mjs";

const hypeTrainBegin = await eventListener.subscribeToChannelHypeTrainBeginEvents(userId, e => {
    console.log(`Hypetrain just started`);
});

const hypeTrainEnd = await eventListener.subscribeToChannelHypeTrainEndEvents(userId, e => {
    console.log(`Hypetrain has ended`);
});

const redeem = await EventSubHttpListener.subscribeToChannelRedemptionAddEvents(userId, cp => {
    switch (cp.rewardTitle) {
        case 'Stand Up':
            console.log(`${cp.rewardTitle} has been redeemed by ${cp.userName}`);
            break;
        case 'Hydrate!':
            console.log(`${cp.rewardTitle} has been redeemed by ${cp.userName}`);
            break;
        case 'Posture Check!':
            console.log(`${cp.rewardTitle} has been redeemed by ${cp.userName}`);
    }
});

/*const online = await EventSubHttpListener.subscribeToStreamOnlineEvents(userId, o => {
    // console.log(broadcasterID.name, `${o.broadcasterDisplayName} has just gone live playing ${broadcasterID.gameName}`);
    ttvchatClient.say(broadcasterID.name, `${o.broadcasterDisplayName} has just gone live playing ${broadcasterID.gameName}`);
    ttvchatClient.disableEmoteOnly(broadcasterID.name);
});*/