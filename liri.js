require('dotenv').config();

// Grab the packages...
var request = require("request");
var moment = require('moment');
var Spotify = require('node-spotify-api');
// fs is a core Node package for reading and writing files
var fs = require('fs');

// to import the `keys.js` file and store it in a variable.
var keys = require('./keys');
// to access keys information
var spotify = new Spotify(keys.spotify); 

// Get element in process.argv for index 2 and assign it to var "command"
var command = process.argv[2];

        // to look for songs
if( command == "spotify-this-song") {
  // Get element in process.argv, starting from index 3 to the end, 
  // joint them into a string to get the title of the song, and
  // store it in variable "song".
  var song = process.argv.slice(3, process.argv.length).join(' ');
  if (song==="") {
    console.log ("Please enter a song name, while you think, here is my option: ");
    song = "Let it go";
    console.log(song);
  };
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
      }
   //console.log(data.tracks.items[0]); 
   console.log("Song Name : " + data.tracks.items[0].name);
   console.log("Preview URL : " + (data.tracks.items[0].preview_url ? data.tracks.items[0].preview_url : "Not Available") );
   console.log("Album Name: " + data.tracks.items[0].album.name);
   console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name );
   
   });
} 

        // to look for concerts

else if (command == "concert-this"){ 
  // to store artist inquire argument in an array
  var artist = process.argv.slice(3, process.argv.length).join(' ');
    if (artist==="") {
      console.log ("Please enter a concert/artist name, while you think, here is my option: ");
      artist = "Los tigres del norte";
      console.log(artist);
    };
  // Run the request function...
  // The request function takes in a URL then returns three arguments:
  // 1. It provides an error if one exists.
  // 2. It provides a response (usually that the request was successful)
  // 3. It provides the actual body text from the website <---- what actually matters.
  queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  request(queryUrl, function(error, response, body) {
    // If the request was successful...
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just what is needed
      var jsonBody = JSON.parse(body);
      //  console.log(JSON.stringify(jsonBody,null,2));
      for (i=0; i<jsonBody.length; i++) {
        console.log("Venue Name : " + JSON.parse(body)[i].venue.name);
        city = JSON.parse(body)[i].venue.city;
        state= JSON.parse(body)[i].venue.region;
        console.log("Location : " + city + ", " + state);
        date = moment(JSON.parse(body)[i].datetime).format('DD MM YYYY');
        console.log("Date: " + date);
        console.log("**********************************");
      }
    } 
  }); 
}

        // to look for movies

else if (command === "movie-this"){ 
  // to store movie inquire argument in an array
  var movie = process.argv.slice(3, process.argv.length).join(' ');
  if (movie==="") {
    console.log ("Please enter a movie name, while you think, here is my option: ");
    movie = "Frozen";
  }
  queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;   
  request(queryUrl, function(error, response, body) {
    // If the request was successful...
    if (!error && response.statusCode === 200) {
    console.log("Title : " + JSON.parse(body).Title );
    console.log("The movie came out in " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Produced in: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: "+ JSON.parse(body).Actors);
    }
  }); 
}
else if (command === "do-what-it-says"){       //  to look for "do-what-it-says"
  // This block of code will read from the "random.txt" file.
  // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // split it by commas (to make it more readable)
    var dataArr = data.split(",");
    
    var song = dataArr[1];
    spotify.search({ type: 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //console.log(data.tracks.items[0]); 
      console.log("Song Name : " + data.tracks.items[0].name);
      console.log("Preview URL : " + (data.tracks.items[0].preview_url ? data.tracks.items[0].preview_url : "Not Available") );
      console.log("Album Name: " + data.tracks.items[0].album.name);
      console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name );
      
      });
    
                 //  movie
    // var movie = dataArr[1];
    // queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;   
    // request(queryUrl, function(error, response, body) {
    //   // If the request was successful...
    //   if (!error && response.statusCode === 200) {
    //   console.log("Title : " + JSON.parse(body).Title );
    //   console.log("The movie came out in " + JSON.parse(body).Year);
    //   console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    //   console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    //   console.log("Produced in: " + JSON.parse(body).Country);
    //   console.log("Language: " + JSON.parse(body).Language);
    //   console.log("Plot: " + JSON.parse(body).Plot);
    //   console.log("Actors: "+ JSON.parse(body).Actors);
    //   }
    // });
      
              //  concert
    // var artist = dataArr[1];            
    // queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // request(queryUrl, function(error, response, body) {
    //   // If the request was successful...
    //   if (!error && response.statusCode === 200) {
    //     // Parse the body of the site and recover just what is needed
    //     var jsonBody = JSON.parse(body);
    //     //  console.log(JSON.stringify(jsonBody,null,2));
    //     for (i=0; i<jsonBody.length; i++) {
    //       console.log("Venue Name : " + JSON.parse(body)[i].venue.name);
    //       city = JSON.parse(body)[i].venue.city;
    //       state= JSON.parse(body)[i].venue.region;
    //       console.log("Location : " + city + ", " + state);
    //       date = moment(JSON.parse(body)[i].datetime).format('DD MM YYYY');
    //       console.log("Date: " + date);
    //       console.log("**********************************");
    //     }
    //   } 
    // }); 
  
  });
};
             // For the log.text
fs.writeFileSync("log.txt", 'here goes the text to log', "UTF-8",{'flags': 'a+'});          




