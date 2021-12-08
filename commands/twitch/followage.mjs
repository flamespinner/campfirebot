import { ttvchatClient, apiClient } from "../../main.mjs";

const followAgeListener = async () => {
    const follow = await apiClient.users.getFollowFromUserToBroadcaster(msg.userInfo.userId, msg.channelId);
    if (follow) {
        const currentTimestamp = Date.now();
        const followStartTimestamp = follow.followDate.getTime();
        ttvchatClient.say(channel, `@${user} You have been around the campfire for ${secondstoDuration((currentTimestamp = followStartTimestamp) / 1000)}!`);
    }
    else {
        ttvchatClient.say(channel, `@${user} You are not following!`);
    }
};

export { followAgeListener };