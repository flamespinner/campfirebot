import { mongoose } from 'mongoose';
require('./models/bot');
//require('./models/commands');

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}authSource=${process.env.MONGO_AUTHSRC}`);
const { connection: db } = mongoose;

db.on('connected', () => 
    { console.log('Database Connected'); }
);

db.on('disconnected', () => 
    { console.log('Database Disconnected'); }
);

db.on('error', err =>
    { console.log(err); }
);

module.exports = db;