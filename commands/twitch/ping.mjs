import { ttvchatClient } from '../../authhandler.mjs';

async function ping() {
    ttvchatClient.say(`Agent_Flame`, `Pong!`);
}

export {
    ping
};