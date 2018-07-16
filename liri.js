

var dotenv = require("dotenv").config();

var request = require("request");
var keys = require ("./keys.js")
var fs = require("fs");
console.log(keys)
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
if (process.argv[2]== "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  process.argv[2] = dataArr[0];
  process.argv[3] = dataArr[1];
    // We will then re-display the content as an array for later use.
    console.log(dataArr);
  accessAPI();
  });


}
else{
  accessAPI();
}
function accessAPI(){
if (process.argv[2]== "my-tweets"){
console.log("Here are the most recent tweets on your feed")
  var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret,

  });
   
  var params = {screen_name: 'imjustanimage'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      //console.log(tweets);
    }
    for (var i=0; i<10; i++){
      console.log("Username: "+ tweets[i].user.screen_name+ ".")
      console.log("Tweet: " + tweets[i].text);
      console.log("-----------------------------------------------");
    }
    

  });
  //console.log(tweets);
}


if (process.argv[2]== "spotify-this-song"){

  var songName = "";
  for (i = 3; i < process.argv.length; i++){
    if(process.argv[i] !== undefined)
    {
      //console.log("thing")
      songName = songName + process.argv[i] + " ";
      //console.log(songName)
    }

  }
  console.log(songName);
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
 
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 var artistNames =[];
 var artistsArr = data.tracks.items[0].artists;
console.log(data.tracks.items[0]); 
console.log("Song Name: " + data.tracks.items[0].name); 
console.log("-----------------------------------------------");
//console.log(data.tracks.items[0])
for (i = 0; i < artistsArr.length; i++){
artistNames.push(" "+artistsArr[i].name)
}
console.log("Artists: " + artistNames); 
console.log("-----------------------------------------------");
console.log("Album: "+data.tracks.items[0].album.name); 
console.log("-----------------------------------------------");
console.log("Track Link: "+data.tracks.items[0].external_urls.spotify); 
console.log("-----------------------------------------------");


});
}
if (process.argv[2]== "movie-this"){
    var request = require("request");

    // Grab the movieName which will always be the third node argument .
    var movieName = "";
    for (i = 3; i < process.argv.length; i++){
      if(process.argv[i] !== undefined)
      {
        //console.log("thing")
        movieName = movieName + process.argv[i] + " ";
        //console.log(movieName)
      }

    }
    console.log(movieName);
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    // This line is just to help us debug against the actual URL.
    //console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    if (body.response == false){
console.log("We could not find your movie");
    }
      // If the request is successful
      else if (!error && response.statusCode === 200) {
        console.log(body)
        // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Title: " + JSON.parse(body).Title)
        console.log("-----------------------------------------------");
        console.log("Release Year: " + JSON.parse(body).Year)
        console.log("-----------------------------------------------");
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
        console.log("-----------------------------------------------");
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
        console.log("-----------------------------------------------");
        console.log("Actors: " + JSON.parse(body).Country)
        console.log("-----------------------------------------------");
        console.log("Language: " + JSON.parse(body).Language)
        console.log("-----------------------------------------------");
        console.log("Plot: " + JSON.parse(body).Plot)
        console.log("-----------------------------------------------");
        console.log("Actors: " + JSON.parse(body).Actors)
        console.log("-----------------------------------------------");
       

        
      }
    });
}

}