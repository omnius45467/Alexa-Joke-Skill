/**
 * Created by jeremyrobles on 8/16/16.
 */

var rp = require('request-promise');
//
// Request('https://www.reddit.com/r/cleanjokes/.json').then(function (data) {
//     var parsed = JSON.parse(data).data.children,
//         l = parsed.length,
//         n = Math.floor(Math.random() * (l - 1)) + 1,
//         title = parsed[n].data.title,
//         selftext = parsed[n].data.selftext;
//     console.log(title);
//     console.log(selftext);
//     // console.log("\n" + clor.blue.underline(title));
//     // console.log(clor.yellow(selftext) + "\n\n\n");
//     process.exit(1);
// }).catch(function (err) {
//     console.warn(err);
//     process.exit(0);
// });

var options = {
    uri: 'https://www.reddit.com/r/cleanjokes/.json',
    simple: false
};

rp(options)
    .then(function (data) {
        var parsed = JSON.parse(data).data.children,
            l = parsed.length,
            n = Math.floor(Math.random() * (l - 1)) + 1,
            title = parsed[n].data.title,
            selftext = parsed[n].data.selftext;
        console.log(title);
        console.log(selftext);
        // response.say(title);
        // response.shouldEndSession(false);
        // response.send();
    }).catch(function (err) {
    console.log(err);
    // response.say(err);
    // response.shouldEndSession(false);
    // response.send();
});