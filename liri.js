//reads and set any environment variables with the dotenv package
require("dotenv").config();

//code required to import the keys.js file and store it in a variable
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

//Make it so liri.js can take in one of the following commands
//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says

//let's try to get input from a movie first 

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Store all of the arguments in an array
var command = process.argv[2];

//testing the output of command to see if it works with a -
//console.log(command);

var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}



// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and export information 
    console.log("Title of the movie: " + JSON.parse(body).Title);
    console.log("Released year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    //fix exporting rotten tomatoes 
    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country the movie was released: " + JSON.parse(body).Country);
    console.log("Language of the movie: " + JSON.parse(body).Language);
    console.log("Plot of the movie: " + JSON.parse(body).Plot);
    console.log("Plot of the movie: " + JSON.parse(body).Actors);
  }
  
});










