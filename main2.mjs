import { ttvchatClient } from './authnew.mjs';

import dotenv from 'dotenv';
dotenv.config();

ttvchatClient.onMessage((channel, user, message) => {
	if (message === '!ping') {
		ttvchatClient.say(channel, 'Pong!');
		console.log(`@${user} ran command !ping`);
	} else if (message === '!dice') {
		const diceRoll = Math.floor(Math.random() * 6) + 1;
		ttvchatClient.say(channel, `@${user} rolled a ${diceRoll}`)
		console.log(`@${user} ran command !dice`);
	}
});