const request = require("request");
const async = require("async");

    const options = {
        url: 'https://id.twitch.tv/oauth2/token',
        json:true,
        body: {
        client_id: '',
        client_secret: '',
        grant_type: 'client_credentials'
        }
    };



request.post(options, (err,res,body)=>{
    if(err){
        return console.log(err);
    }
    console.log('Status: ${res.statusCode}');
    console.log(body.access_token);
});
