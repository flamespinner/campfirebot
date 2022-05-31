import { apiClient, apiAuth, eventListener } from '../authhandler/ttvEventSub.mjs';
import { MessageEmbed, WebhookClient } from 'discord.js';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import dotenv from "dotenv";
dotenv.config();


async function twitchWebhooks() {
    // const twitchWebhooks = async () => {
    //     const webhook = new WebhookClient('WebhookClientData', 'WebhookClientOptions');
    //     apiClient.eventSub.deleteAllSubscriptions();
    //     await listener.listen();

    //     const userId = process.env.userID;
    //     const onlineSubscription = await listener.subscribeToStreamOnlineEvents(userId, e => {
    //         console.log(`${e.broadcasterDisplayName} just went live!`);
    //         getStreamData(e);

    //     });

    //     const offlineSubscription = await listener.subscribeToStreamOfflineEvents(userId, e => {
    //         console.log(`${e.broadcasterDisplayName} just went offline`);
    //         console.log(e);
    //         console.dir(e);
    //     });

    //     const getStreamData = async (e) => {
    //         const userStream = await apiClient.helix.streams.getStreamByUserId(userId);
    //         const userGame = await userStream.getGame();
    //         const embed = new MessageEmbed()
    //             .setColor(3021383)
    //             .setTitle(userStream.title)
    //             .setURL('https://www.twitch.tv/agent_flame')
    //             .setImage(userStream.getThumbnailUrl(400, 300))
    //             .addField('Game', userGame.name, true)
    //             .addField('Viewers', userStream.viewers, true)
    //             .setTimestamp();
    //         webhook.send(embed);
    //     };
    // };
};

export {
    twitchWebhooks
};