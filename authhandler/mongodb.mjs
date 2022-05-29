/*import { express } from 'express';
import { mongoose } from 'mongoose';
import dotenv from "dotenv";
const Bot = require("../database/models/bot");

const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        console.error(err);
    }
}

const readAuth = async () => {
    try {
        const TwitchID = await Bot.find({ tvClientID: })
        const TwitchToken = await Bot.find({ tvAccessToken })
        const TwitchClientSecret = await Bot.find({ tvClientSecret })
        const TwitchRefreshToken = await Bot.find({ tvClientRefreshToken })
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
}*/