import mongoose from 'mongoose';
const Schema = mongoose.Schema

export const botSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    tvClientID: {
        type: String,
        required: true
    },
    tvAccessToken: {
        type: String,
        required: true
    },
    tvClientSecret: {
        type: String,
        required: true
    },
    tvClientRefreshToken: {
        type: String,
        required: true
    },
    obtainmentTimestamp: {
        type: String,
        required: true
    }
});

// const botModel = model('Bot', botSchema);
// model.exports = botModel;
// export {
//     botModel
// }

//model.exports = mongoose.model('Bot', botSchema);