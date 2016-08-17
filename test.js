/**
 * Created by jeremyrobles on 8/16/16.
 */

var Request = require('request');

Request('https://www.reddit.com/r/cleanjokes/.json', function (error, Response, data) {
    if (!error && Response.statusCode == 200) {
        var parsed = JSON.parse(data).data.children,
            l = parsed.length,
            n = Math.floor(Math.random() * (l - 1)) + 1,
            title = parsed[n].data.title,
            selftext = parsed[n].data.selftext;

        if(typeof title === 'string'){
            console.log(title);
        }
        // console.log(title, selftext);
    } else {
        console.log(error);//log the error
    }
});