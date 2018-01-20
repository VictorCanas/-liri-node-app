//reads and set any environment variables with the dotenv package
require("dotenv").config();

// Include the npm packages (Don't forget to run "npm install" in this folder first!)
// done importing
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");

//code required to import the keys.js file and store it in a variable
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Workflow process
//1. let's try to get input from a movie first and put that inside a function- DONE
//2. let's do else if statemets to run different functions - DONE
//3. Test each else if statement by doing console.log on each individually based on an command argument
//4. Create my-tweets function - DONE
//5. Crate mySpotify function 

//test to run when process argv is movie-this
var command = process.argv[2];
//console.log(command);
var nodeArgs = process.argv.slice(3).join(" ");
//console.log(nodeArgs);

if (command === "my-tweets") {
	myTweets();
	//testing
	//console.log("twitter");
} else if (command === "spotify-this-song") { 
	mySpotify();
	//testing
	//console.log("spotify");
} else if (command === "movie-this") {
	movieThis();
	//testing
	//console.log("movies");
} else if (command === "do-what-it-says") {
	//doThis();
	//testing
	//console.log("do");
}


function myTweets() {

	//only gets the last 20 tweets
	var params = {screen_name: 'V70051141', count: 20};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				for (var i = 0; i < tweets.length; i++) {
					console.log("\n" + tweets[i].text);
				}
			} else {
			console.log(error);
		}
	});
};


//movie funciton 
function movieThis() {

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + nodeArgs + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and export information 
	    console.log("Title of the movie: " + JSON.parse(body).Title);
	    console.log("Released year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
	    console.log("Country the movie was released: " + JSON.parse(body).Country);
	    console.log("Language of the movie: " + JSON.parse(body).Language);
	    console.log("Plot of the movie: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	  }

	});
};













