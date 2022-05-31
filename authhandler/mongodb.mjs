import express from 'express';
import { mongoose } from 'mongoose';
import dotenv from "dotenv";
//import Bot from '../database/models/bot';


const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Connected');
    } catch (err) {
        console.error(err);
    }
}

const readAuth = async () => {
    try {
        const TwitchID = await Bot.findByID({ tvClientID })
        const TwitchToken = await Bot.findByID({ tvAccessToken })
        const TwitchClientSecret = await Bot.findByID({ tvClientSecret })
        const TwitchRefreshToken = await Bot.findByID({ tvClientRefreshToken })
        console.log(TwitchID);
        console.log(TwitchToken);
        console.log(TwitchClientSecret);
        console.log(TwitchRefreshToken);
        //some things here
        //console.log(test);
    } catch (e) {
        console.log(e.messasge)
    }
}

export {
    connectDB,
    readAuth
}