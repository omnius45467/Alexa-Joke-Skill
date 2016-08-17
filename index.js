var alexa = require('alexa-app'),
	mongoose = require('mongoose'),

	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,

	getUrl = require('request');

var app = new alexa.app();

//establish connection to the database

// mongoose.connection('mongodb://alexa:asdf@ds161225.mlab.com:61225/jokes6000');

//database schema for jokes
var JokeSchema = new Schema({
	joke_id	  : Number,
	title     : String,
	selftext  : String
});

//provide a model
var JokeModel = mongoose.model('jokes', JokeSchema);


function getJoke(json){
	getUrl(json, function (error, Response, data) {

		if (!error && Response.statusCode == 200) {

			var parsed = JSON.parse(data).data.children,
				l = parsed.length,
				n = Math.floor(Math.random() * (l - 1)) + 1,
				title = parsed[n].data.title,
				selftext = parsed[n].data.selftext;
			console.log(title);
			return title;

		} else {
			console.log(error);//log the error
		}
	});
}


/**
 * LaunchRequest.
 */
app.launch(function(request,response) {

	response.say(getJoke('https://www.reddit.com/r/cleanjokes/.json'));

	//check DB for the joke

	//tell joke if it is not in the database

	//saves joke that was spoken to the DB
});


/**
 * IntentRequest.
 */
app.intent('number',
  {
    'slots':{'number':'NUMBER'},
    'utterances':[ 'say the number {1-100|number}' ]
  },
  function(request,response) {
    var number = request.slot('number');
	  response.session("test", 42);
    response.say('You asked for the number '+number);
    response.shouldEndSession(true);
    response.send();
  }
);


/**
 * IntentRequest w/ asynchronous response.
 */
app.intent('checkStatus', 
	{
    	'utterances':[ 
    		'status check', 'what is the status', 'tell me the status'
    	]
  	},
	function(request,response) {
		setTimeout(function() {		// simulate an async request
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
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
