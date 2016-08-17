var alexa = require('alexa-app'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    joke = require('jokesearch');
var app = new alexa.app();

// getUrl.then = Promise;
mongoose.Promise = Promise;

//establish connection to the database

mongoose.connect('mongodb://alexa:asdf@ds161225.mlab.com:61225/jokes6000');

//database schema for jokes
var JokeSchema = new Schema({
    joke_id: Number,
    title: String,
    selftext: String
});

//provide a model
var JokeModel = mongoose.model('jokes', JokeSchema);

/**
 * LaunchRequest.
 */
app.launch(function (request, response) {

    /**
     * Solution #1
     */
    joke.getJoke(function(joke) {
        response.say(joke);
        response.shouldEndSession(false);
        response.send();

    });

    //check DB for the joke

    //tell joke if it is not in the database

    //saves joke that was spoken to the DB
    return false;
});


/**
 * IntentRequest w/ asynchronous response.
 */
app.intent('checkStatus',
    {
        'utterances': [
            'status check', 'what is the status', 'tell me the status'
        ]
    },
    function (request, response) {
        setTimeout(function () {		// simulate an async request
            response.session("test", "omnius");
            // This is async and will run after a brief delay
            response.say('Status is operational, mam!');

            // Must call send to end the original request
            response.send();

        }, 250);

        // Return false immediately so alexa-app doesn't send the response
        return false;
    }
);


/**
 * Error handler for any thrown errors.
 */
app.error = function (exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
