import { model, Schema } from 'mongoose';

const settingsSchema = new Schema({
    active: Boolean,
    alerts_active: Boolean,
    sub_alert: Boolean,
    resub_alert: Boolean,
    giftsub_alert: Boolean,
    raid_alert: Boolean,
    host_alert: Boolean,
    charity_alert: Boolean,
});

const channelSchema = new Schema({
    channel_name: {

    },
    channel_id: {

    },
    date_created: {

    },
    settings: {
        type: settingsSchema,
        default: {
            active: true,
            alerts_active: true,
            sub_alert: true,
            resub_alert: true,
            giftsub_alert: false,
            raid_alert: true,
            host_alert: false,
            charity_alert: true,
        }
    }
})

module.exports = Channel = mongoose.model('channel', channelSchema);