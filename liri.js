//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//set variables
var keys = require("./keys")
var fs = require('fs')
var request = require('request')
var Spotify = require('node-spotify-api');

//Add the code required to import the keys.js file and store it in a variable.
var spotify = new Spotify(keys.spotify);



// Make it so liri.js can take in one of the following commands:

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var command = process.argv[2]
var item = process.argv.slice(3);

switch (command) {
    case "concert-this":
        console.log("concert")
        url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        request(URL, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
        break;
    case "spotify-this song":
        spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });
        break;
    case "movie-this":
        console.log("movie")
        break;
    case "do-what-it-says":
        console.log("whatever you want")
        break;
    default:
        console.log("Enter a valid command")
}