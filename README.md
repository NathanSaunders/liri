# LIRI Bot

## Overview

LIRI is like iPhone's SIRI. While SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters that search 'Spotify' for songs, 'Bands in Town' for concerts, and 'OMDB' for movies and provides the requested data.

### How it works

Using specific commands in node.js, LIRI Bot will return information collected from the API and return data to your terminal.

`spotify-this-song` command pulls data from Spotify
<img width="685" alt="spotify-this-song-screenshot" src="https://user-images.githubusercontent.com/43506553/56073170-beb9e280-5d54-11e9-804c-8d82ba7138db.png">

'movie-this' command draws from OMDB
<img width="785" alt="movie-this-screenshot" src="https://user-images.githubusercontent.com/43506553/56073174-c8434a80-5d54-11e9-93b9-0032cfc8f9c6.png">

`concert-this` command uses the Bands In Town API
<img width="452" alt="concert-this-screenshot" src="https://user-images.githubusercontent.com/43506553/56073171-c4afc380-5d54-11e9-96ae-88bad085a577.png">

While the `do-what-it-says` will pull from the random.txt file. In this case, it's populated with Frank.
<img width="685" alt="rando-do-what-it-says-screenshot" src="https://user-images.githubusercontent.com/43506553/56073317-96cb7e80-5d56-11e9-8921-31b1812d6970.png">

### Technologies Used

*Node.js
*JavsScript
*Request
*Moment
*Dotenv
*Spotify Node API
*OMDB API
*Bands In Town API
