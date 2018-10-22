var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "700dc7351ad64643a5591df5eb526c66",
  secret: "831c95d40b364a2aa9854d766a675adf"
});


var command = process.argv[2];


if( command == "spotify-this-song") {
   var song = process.argv.slice(3, process.argv.length).join(' ');
  
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
} else if (command == "band"){

}
else if (command == "band"){

}
