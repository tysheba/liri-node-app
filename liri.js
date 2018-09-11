//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//set variables
var keys = require("./keys")
var fs = require('fs')
var request = require('request')
var Spotify = require('node-spotify-api');
var userCommand = process.argv[2]
var userCommand2 = process.argv.slice(3);

//Add the code required to import the keys.js file and store it in a variable.
var spotify = new Spotify(keys.spotify);



// Make it so liri.js can take in one of the following commands:

// concert-this
// spotify-this-song
    // Function for running a Spotify search - Command is spotify-this-song
    var getSpotify = function (songName) {
        if (songName === undefined) {
            songName = "Poison";
        }
    
        spotify.search(
            {
                type: "track",
                query: userCommand2
            },
            function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                }
    
                var songs = data.tracks.items;
    
                for (var i = 0; i < songs.length; i++) {
                    console.log(i);
                    console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                    console.log("song name: " + songs[i].name);
                    console.log("preview song: " + songs[i].preview_url);
                    console.log("album: " + songs[i].album.name);
                    console.log("-----------------------------------");
                }
            }
        );
    };
    
// movie-this
// do-what-it-says


switch (userCommand) {
    case "concert-this":
        console.log("concert")
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        request(URL, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
        break;
    case "spotify-this song":
        var songName = userCommand2;
        getSpotify ();
        break;
    case "movie-this":
        var URL = "https://www.omdbapi.com"
        request(URL, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
        console.log("movie")
        break;
    case "do-what-it-says":
        console.log("whatever you want")
        break;
    default:
        console.log("Enter a valid command")
}