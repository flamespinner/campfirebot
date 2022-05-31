import { ttvchatClient } from '../../authhandler.mjs';
import process from 'process';

async function lurk() {
  ttvchatClient.say(channel, `@${user} has decided to minimize instead of quit! Catch you later!`);
}

async function unlurk() {
  ttvchatClient.say(channel, `Welcome Back @${user}`);
}

export {
    lurk,
    unlurk
};
