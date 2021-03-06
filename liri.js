require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var keys = module.require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment");
var command = process.argv[2];
var callerName;

concertThis = function() {
  var artist = process.argv[3];

  // runs a request to bandintown api
  request(
    "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp",
    function(error, response) {
      console.log("error:", error); // Print the error if one occurred
      data = JSON.parse(response.body);
      callerName = "concert";
      parseData(data, callerName);
    }
  );
};

spotifyThis = function(callerName, songName) {
  // if spotifyThis is being called by doWhatItSays
  if (callerName === "doWhatItSays") {
    songName = songName;
  } else if (callerName === undefined) {
    songName = process.argv[3];

    if (process.argv[3] === undefined) {
      songName = "The Sign";
    }
  }

  // runs the spotify search method to make an api call
  spotify
    .search({ type: "track", query: songName })
    .then(function(response) {
      var data = response;
      callerName = "track";
      parseData(data, callerName);
    })
    .catch(function(err) {
      console.log(err);
    });
};

movieThis = function() {
  var movieName = process.argv[3];
  if (!movieName) {
    movieName = "Mr. Nobody";
  } else {
    // runs a request to the OMDB API with the movie specified
    request(
      "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=short&apikey=trilogy",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var data = response.body;
          callerName = "movie";
          parseData(data, callerName);
        }
      }
    );
  }
};

doWhatItSaysThis = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // error handling
    if (error) {
      return console.log(error);
    }

    callerName = "doWhatItSays";
    parseData(data, callerName);
  });
};

switch (true) {
  case command === "concert-this":
    concertThis();
    break;
  case command === "spotify-this-song":
    spotifyThis();
    break;
  case command === "movie-this":
    movieThis();
    break;
  case command === "do-what-it-says":
    doWhatItSaysThis();
    break;
  default:
    "no command given";
}

parseData = function(data, callerName) {
  if (callerName === "concert") {
    data.forEach(function(element) {
      var date = element.datetime;
      date = moment(date, "YYYY-MM-DD").format("MM/DD/YYYY");

      console.log("--------------------------------------");
      console.log(`Venue: ${element.venue.name}`);
      console.log(`Location: ${element.venue.city}, ${element.venue.region}`);
      console.log(date);
    });
  } else if (callerName === "track") {
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log("--------------------------------------");
      console.log(`Artist: ${data.tracks.items[i].artists[0].name}`);
      console.log(`Song Name: ${data.tracks.items[i].name}`);
      console.log(`Preview URL: ${data.tracks.items[i].preview_url}`);
      console.log(`Album: ${data.tracks.items[i].album.name}`);
    }
  } else if (callerName === "movie") {
    data = JSON.parse(data);

    var title = data.Title;
    var year = data.Year;
    var imdbRating = data.imdbRating;
    var rottenTomatoesRating = data.Ratings[1].Value;
    var country = data.Country;
    var language = data.Language;
    var plot = data.Plot;
    var actors = data.Actors;

    console.log(`------------------------------------
            \r\n
            \rTitle: ${title},
            \rYear: ${year}, 
            \rIMDB Rating: ${imdbRating}, 
            \rRotten Tomatoes Rating: ${rottenTomatoesRating}
            \rProduced In: ${country}
            \rLanguage: ${language}
            \rPlot: ${plot}
            \rActors: ${actors}
            \r\n\r\n`);
  } else if (callerName === "doWhatItSays") {
    // splits data by commas (to make it more readable)
    var dataArr = data.split(",");
    songName = dataArr[1];
    callerName = "doWhatItSays";
    spotifyThis(callerName, songName);
  }
};
