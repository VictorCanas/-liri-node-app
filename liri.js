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
//4. Create myTweets function - DONE
//5. Create mySpotify function - DONE
//6. Create doThis function - DONEt

//test to run when process argv is movie-this
var command = process.argv[2];
//console.log(command);
var nodeArgs = process.argv.slice(3).join(" ");
//console.log(nodeArgs);

//tesint this argument to see how it works
// if (!command) {
// 		if (command == "spotify-this-song") {
// 			nodeArgs = "The Sign Ace of Base";
// 		} else if (cmd == "movie-this") {
// 			nodeArgs = "Mr. Nobody";
// 		}
// 	}

if (command === "my-tweets") {
	myTweets();
} else if (command === "spotify-this-song") { 
	mySpotify();
} else if (command === "movie-this") {
	movieThis();
} else if (command === "do-what-it-says") {
	doThis();
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



function mySpotify() {

	spotify
		.search({type: 'track', query: nodeArgs})
		.then(function(response) {

			var obj = response.tracks.items[0];

			//get more than one artist to not get this error - Artist(s): [object Object],[object Object],[object Object],[object Object]
			var arr = [];

			for (var i = 0; i < obj.artists.length; i++) {
				arr.push(obj.artists[i].name);
			}

			console.log("Artist(s): " + arr);
			console.log("Song name: " + obj.name);
			console.log("Preview Link: " + obj.external_urls.spotify);
			console.log("Album: " + obj.album.name);

		})
		.catch(function(err) {
			console.log(err);
		});

};

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

function doThis() {
	fs.readFile("random.txt", "utf8", (err, data) => {
		if (err) {
			console.log(err);
		}
		var text = data.split(",");
		//command = text[0];
		nodeArgs = text[1];
		mySpotify();
	});
}
