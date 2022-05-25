import { express } from 'express';
import { mongoose } from 'mongoose';
import dotenv from "dotenv";

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

export {
    connectDB
}