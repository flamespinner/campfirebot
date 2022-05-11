import { express } from 'express';
import { mongoose } from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.dbURI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> console.log("MongoDB Connected..."))
.catch((err)=> console.log(err));
