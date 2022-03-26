exports.run = (ttvchatClient, message, args, user, channel, self) => {
    ttvchatClient.ping().then(function(data) {
        let ping = Math.floor(Math.round(data*1000))
        ttvchatClient.say(channel, `@${user}, your ping is ${ping}`)
    })
}