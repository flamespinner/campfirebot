import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const authSchema = new Schema({
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
    }
}, { timestamps: true });

const tvAuth = mongoose.model('auth', authSchema);
export {
    tvAuth
}