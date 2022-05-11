import { ttvchatClient } from '../../authhandler.mjs';
import process from 'process';

async function ping() {
    ttvchatClient.say(`Agent_Flame`, `Pong! The CampFire has burning for ${process.uptime()} seconds`);
}

export {
    ping
};