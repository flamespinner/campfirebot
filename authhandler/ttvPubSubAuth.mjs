import { PubSubClient } from "@twurple/pubsub";
import { authProvider } from "./ttvChatAuth.mjs";
import dotenv from "dotenv";

dotenv.config();

const tvPubSubClient = new PubSubClient();
const userId = await tvPubSubClient.registerUserListener(authProvider);

export {
    tvPubSubClient,
    userId
}