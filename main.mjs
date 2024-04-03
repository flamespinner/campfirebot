import { EventSubChannelHypeTrainBeginEvent, EventSubChannelFollowEvent } from '@twurple/eventsub';
import countdown from 'countdown';
//import { followerage } from './commands/twitch/followage.mjs';
import process from 'process';
import { ttvchatClient, eventListener, discordClient } from './authhandler.mjs';
import * as fs from 'fs';
import { ping } from './commands/twitch/ping.mjs';
import { twitchWebhooks } from './twitch/twitchwebhook.mjs'
import { subAlert } from './discord/embed.mjs';
//import { connectDB } from './authhandler/mongodb.mjs';
//import { run } from './script.mjs'


import dotenv from 'dotenv';
import { apiClient } from './authhandler/ttvEventSub.mjs';
dotenv.config();

const prefix = "!";
const category = await apiClient.games.getGameByName;

const ttvLiveChannel = process.env.discordTTVLiveChannel;

async function main() {
	ttvchatClient.onMessage((channel, user, message, broadcasterID, userDisplayName) => {
		if (message === '!ping') {
			ping();
		}
		else if (message === '!dice') {
			const diceRoll = Math.floor(Math.random() * 6) + 1;
			ttvchatClient.say(channel, `@${user} rolled a ${diceRoll}`)
			console.log(`@${user} ran command !dice`);
		} else if (message === '!costream') {
			ttvchatClient.say(channel, 'Tonight we are surviving in the forest together. Joining me we have Askesienne http://twitch.tv/askesienne and Lantheos http://twitch.tv/lantheos. Go check them out and say Hi! You can see all of our views here: https://multistre.am/agent_flame/askesienne/lantheos/layout7/');
			console.log(` @${user} ran command !costream`);
		} else if (message === '!pronouns') {
			ttvchatClient.say(channel, '/me I use they/them! If you would like to be able to set your pronouns on Twitch, I will be able to see them directly in chat using a browser extension. Your pronouns will show up next to your name for anyone to read! Log in with Twitch at https://pronouns.alejo.io/ to adjust your settings. <3');
			console.log(` @${user} ran command !pronouns`);
		} else if (message === '!hello') {
			ttvchatClient.say(channel, `Heya! @${user} My name is Campfirebot! Nice to meet you!`);
			console.log(` @${user} ran command !hello`);
		} else if (message === '!discord') {
			ttvchatClient.say(channel, 'Join us on Discord for in-game voice, going live alerts, and other chit-chat! https://discord.gg/TbUtUjY');
			console.log(` @${user} ran command !discord`);
		} else if (message === '!lurk') {
			ttvchatClient.say(channel, `@${user} has decided to minimize instead of quit! See you later!`);
			console.log(` @${user} ran command !lurk`);
		} else if (message === '!unlurk') {
			ttvchatClient.say(channel, `Welcome Back @${user}! We saved a spot for you`);
			console.log(` @${user} ran command !unlurk`);
		} else if (message === '!commands') {
			ttvchatClient.say(channel, '!ping, !dice, !costream, !pronouns, !hello, !discord, !stjude, !zoomzoom, !lurk, !zoomzoom2, !unlurk, !commands');
			console.log(`@${user} ran command !commands`);
		} else if (message === '!raidcall') {
			ttvchatClient.say(channel, `"/me RAID FROM THE CAMPFIRE"`);
			console.log(`@${user} ran command !raidcall`);
		}
		else if (message === 'hey' || message === 'Hey') {
			ttvchatClient.say(channel, `hello @${user}`);
		}
		else if (message === '!rdrp' || message === '!calico') {
			ttvchatClient.say(channel, `Learn more about Calico County RP on their Discord! https://discord.gg/calicocounty`);
		}
		else if (message === '!socials') {
			ttvchatClient.say(channel, `Instagram: Agent_Flame Twitter: Agent_Flame Youtube: Agent_FlameTV VOD Archive: Agent Flame Archive`)
		}
		else if (message === '!lurk') {
			ttvchatClient.say(channel, `@${user} has decided to minimize instead of quit! Catch you later!`)
		} else if (message === '!followage') {
			async (follow) => {
				await apiClient.users.getFollowFromUserToBroadcaster(msg.userInfo.userId, msg.channelId);
			}
			if (follow) {
				const currentTimestamp = Date.now();
				const followStartTimestamp = follow.followDate.getTime();
				ttvchatClient.say(channel, `@${user} You have been following for ${countdown(new Date(followStartTimestamp))}!`);
			}
			else {
				ttvchatClient.say(channel, `@${user} You are now Following!`);
			}
		} else if (message === `!uptime`) {
			//something
		}/*  else if (message === '!caster') {
			ttvchatClient.say(channel, `if you like me, then you'll like my friend ____, they where last seen playing ____ at https://twitch.tv/______`)
		} */
		});
		const userId = process.env.userID;
/* 
		const onlineSubscription = await eventListener.subscribeToStreamOnlineEvents(userId, e => {
			console.log(`${e.broadcasterDisplayName} just went live!`);
			discordClient.channels.cache.get(ttvEventLog).send(`${e.broadcasterDisplayName} just went live!`);
			discordClient.channels.cache.get(ttvLiveChannel).send(`${e.broadcasterDisplayName} just went live! https://twitch.tv/${e.broadcasterDisplayName}`);
		}); */

		/*const FollowEvent = await eventListener.EventSubChannelFollowEvent(userDisplayName, e => {
			console.log(`${e.userDisplayName} just followed`);
			discordClient.channels.cache.get(ttvEventLog).send(`${e.userDisplayName} just followed!`);
			fs.writeFile('./twitch/events/follower.txt', userDisplayName, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		});*/

		ttvchatClient.onSub((channel, user) => {
			ttvchatClient.say(channel, `Welcome around the campfire @${user}!`);
			discordClient.channels.cache.get(ttvEventLog).send(`@${user} just subscribed`);
			fs.writeFile(`./twitch/events/subscriber.txt`, user, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		});

		ttvchatClient.onRaid((channel, user, raidInfo) => {
			discordClient.channels.cache.get(ttvEventLog).send(`@${user} just raided, ${raidInfo}`);
		});

		ttvchatClient.onBan((channel, user) => {
			ttvchatClient.say(channel, `${user}... I litterally have no idea who you are. Have a good one!`)
		});

		ttvchatClient.onResub((channel, user, subInfo) => {
			ttvchatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
			discordClient.channels.cache.get(ttvEventLog).send(`@${user} just resubscribed`);
			fs.writeFile(`./twitch/events/subscriber.txt`, user, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		});

		ttvchatClient.onSubGift((channel, user, subInfo) => {
			ttvchatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}! ${user} welcome around the campfire!`);
			discordClient.channels.cache.get(ttvEventLog).send(`@${subInfo.gifter} just gifed a subscription to ${user}!`);
			fs.writeFile(`./twitch/events/subscriber.txt`, user, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		});
}
main();
//run();
//connectDB();
twitchWebhooks();
//exampleEmbed;
//apiClient.eventSub.deleteAllSubscriptions() //https://twurple.js.org/docs/migration/ DO NOT RE-ENABLE

export { };