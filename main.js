const tmi = require('tmi.js');
require('dotenv').config();


const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.TWITCHUSERNAME,
		password: process.env.TWITCHOAUTH 
	},
	channels: [ 'agent_flame' ]
});
client.connect().catch(console.error);
client.on('message', (channel, userstate, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userstate.username}, heya!`);
	}
});