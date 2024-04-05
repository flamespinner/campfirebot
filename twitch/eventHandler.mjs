import { EventSubHttpListener } from "@twurple/eventsub-http";
import { eventListener, ttvchatClient } from "../authhandler.mjs";
import { userId } from "../authhandler/ttvPubSubAuth.mjs";

const hypeTrainBegin = await eventListener.subscribeToChannelHypeTrainBeginEvents(userId, e => {
    console.log(`Hypetrain just started`);
});

const hypeTrainEnd = await eventListener.subscribeToChannelHypeTrainEndEvents(userId, e => {
    console.log(`Hypetrain has ended`);
});

const onlineSubscription = listener.onStreamOnline(userId, e => {
	console.log(`${e.broadcasterDisplayName} just went live! playing ${broadcasterID.gameName}`);
});

const offlineSubscription = listener.onStreamOffline(userId, e => {
	console.log(`${e.broadcasterDisplayName} just went offline`);
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