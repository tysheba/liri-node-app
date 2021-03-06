//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//set variables
var keys = require("./keys")
var fs = require('fs')
var request = require('request')
var Spotify = require('node-spotify-api');
var moment = require('moment')
var chalk = require('chalk')
var userCommand = process.argv[2]
var userCommand2 = process.argv.slice(3);
var movie = userCommand2;

//Add the code required to import the keys.js file and store it in a variable.
var spotify = new Spotify(keys.spotify);


// Make it so liri.js can take in one of the following commands:

// 1. concert-this
// Function for running concert search using the Bands in Town Artist Events API
var getConcerts = function () {
    console.log ("executing this function")
    var artist = userCommand2;
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    request(URL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //   console.log('body:', JSON.parse(body));
        console.log("Upcoming Events for " + artist + "\n")
        for (i = 0; i < 6; i++) {
            var bandsInfo = JSON.parse(body)
            var venueName = bandsInfo[i].venue.name
            var venueLocation = (bandsInfo[i].venue.city + ", " + bandsInfo[i].venue.region)
            var eventDate = moment(bandsInfo[i].datetime).format('L')

            console.log(chalk.yellow("Venue Name: ") + venueName)
            console.log(chalk.yellow("Location: ") + venueLocation)
            console.log(chalk.yellow("Date of Event: ") + eventDate)
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
            // console.log(data)

            for (i = 0; i < 5; i++) {
                var songs = data.tracks.items;
                console.log(chalk.blue("artist(s): ") + songs[i].artists[0].name);//try to get all artist names
                console.log(chalk.blue("song name: ") + songs[i].name);
                console.log(chalk.blue("preview link: ") + songs[i].preview_url);
                console.log(chalk.blue("album: ") + songs[i].album.name);
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
        var movieInfo = JSON.parse(body);
        var movieThis = movieInfo
        // console.log(movieThis);
        console.log(`
        ${chalk.green("Movie Title: ")} ${movieThis.Title}
        ${chalk.green("Year : ")} ${movieThis.Year}
        ${chalk.green("IMDB Rating : ")} ${movieThis.Ratings[0].Value}
        ${chalk.green("Rotten Tomatoes Rating: ")} ${movieThis.Ratings[1].Value}
        ${chalk.green("Country where the movie was produced: ")} ${movieThis.Country}
        ${chalk.green("Language of the movie: ")} ${movieThis.Language}
        ${chalk.green("Movie Plot: ")} ${movieThis.Plot}
        ${chalk.green("Actors in the movie: ")} ${movieThis.Actors}
        ____________________________________________` )

        // console.log(movieInfo)

    });
    console.log("movie")
}
// 4. do-what-it-says
// Take the text inside of random.txt and then use it to call one of LIRI's commands
function doWhatever() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // set values to user commands
        userCommand = dataArr[0];
        userCommand2 = dataArr[1];

        // We will then re-display the content as an array for later use.
        // console.log(dataArr[0]);
        // console.log(dataArr[1]);
        
        //next log data into a text file
        fs.appendFile("log.txt", "\n" + data, function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
              return console.log(err);
            }
          
            // Otherwise, it will print: "log.txt was updated!"
            console.log("log.txt was updated!");
          
          });
          
        liri();

    });
}
// Create a function to run LIRI

function liri () {
    switch (userCommand) {
    case "concert-this":
        console.log("concert")
        var artist = userCommand2;
        getConcerts ();
        break;
    case "spotify-this-song":
        var songName = userCommand2;
        getSpotify();
        break;
    case "movie-this":
        var movie = userCommand2;
        getMovie();
        break;
    case "do-what-it-says":
        console.log("whatever you want")
        doWhatever();
        break;
    default:
        console.log("Enter a valid command")
};
}

liri ();

