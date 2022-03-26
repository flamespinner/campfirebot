import { ttvchatClient } from "../../authhandler.mjs";
import { apiClient } from "../../authhandler/ttvEventSub.mjs";

const followAgeListener = ttvchatClient.onMessage(async (channel, user, message, msg) => {
    if (message === '!followage') {
        const follow = await apiClient.users.getFollowFromUserToBroadcaster(msg.userInfo.userId, msg.channelId);
        if (follow) {
            const currentTimestamp = Date.now();
            const followStartTimestamp = follow.followDate.getTime();
            ttvchatClient.say(channel, `@${user} You have been following for ${secondsToDuration((currentTimestamp - followStartTimestamp) / 1000)}!`);
        }
        else {
            ttvchatClient.say(channel, `@${user} You are not following!`);
        }
    }
});
// later, when you don't need this command anymore:
ttvchatClient.removeListener(followAgeListener);
export { followAgeListener };