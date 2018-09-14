//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//set variables
var keys = require("./keys")
var fs = require('fs')
var request = require('request')
var Spotify = require('node-spotify-api');
var moment = require('moment')
var userCommand = process.argv[2]
var userCommand2 = process.argv.slice(3);
var movie = userCommand2;

//Add the code required to import the keys.js file and store it in a variable.
var spotify = new Spotify(keys.spotify);


// Make it so liri.js can take in one of the following commands:

// 1. concert-this
// Function for running concert search using the Bands in Town Artist Events API
var getConcerts = function () {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    request(URL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //   console.log('body:', JSON.parse(body));
        console.log ("Upcoming Events for " + artist + "\n")
        for (i = 0; i < 6; i++) {
            var bandsInfo = JSON.parse(body)
            var venueName = bandsInfo[i].venue.name
            var venueLocation = (bandsInfo[i].venue.city + ", " + bandsInfo[i].venue.region)
            var eventDate = moment(bandsInfo[i].datetime).format('L')
            
            console.log("Venue Name: " + venueName)
            console.log("Location: " + venueLocation)
            console.log("Date of Event: " + eventDate)
            console.log("-----------------------------------");
        }

    });
}
// 2. spotify-this-song
// Function for running a Spotify search - Command is spotify-this-song
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "The sign";
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
            console.log(data)

            for (i = 0; i < songs.length; i++) {
                var songs = data.tracks.items;
                console.log("artist(s): " + songs[i].artists[0].name);//try to get all artist names
                console.log("song name: " + songs[i].name);
                console.log("preview link: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

// 3. movie-this
// function to retrieve movie information. the command is movie-this

var getMovie = function (movie) {
    movie = userCommand2;
    if (movie === undefined) {
        movie = "Mr. Nobody";
    }
    var URL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&apikey=trilogy"
    // "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy"
    
    request(URL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        var movieInfo = JSON.parse(body);
        var movieThis = movieInfo
        console.log(movieThis);
        console.log(`
        Movie Title: ${movieThis.Title}
        Year : ${movieThis.Year}
        IMDB Rating : ${movieThis.Ratings[0].Value}
        Rotten Tomatoes Rating: ${movieThis.Ratings[1].Value}
        Country where the movie was produced: ${movieThis.Country}
        Language of the movie: ${movieThis.Language}
        Movie Plot: ${movieThis.Plot}
        Actors in the movie: ${movieThis.Actors}` )
        
        // console.log(movieInfo)

    });
    console.log("movie")
}
// do-what-it-says


switch (userCommand) {
    case "concert-this":
        console.log("concert")
        var artist = userCommand2;
        getConcerts();
        break;
    case "spotify-this-song":
        var songName = userCommand2;
        getSpotify();
        break;
    case "movie-this":
        var movie = userCommand2;
        getMovie ();
        break;
    case "do-what-it-says":
        console.log("whatever you want")
        break;
    default:
        console.log("Enter a valid command")
}