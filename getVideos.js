require('dotenv').config();

// const got = require('got');
const billboard = require("billboard-top-100").getChart;
const YouTube = require("youtube-node");
const youTube = new YouTube();

youTube.setKey(process.env.YOUTUBE_KEY);

// gets youtube links
const getYoutubeLink = (rank, title, artist, cover, songName) => {
	return new Promise((resolve, reject) => {
		youTube.search(songName + ' Official Music Video', 2, function(error, result) {

			if (error) {
				reject(console.log(error));
			}
			else {
				let data = [];
				data.push(rank, title, artist, cover);

				if(result.items[0].id.kind === 'youtube#channel'){
						data.push(result.items[1].snippet.title);
						data.push(result.items[1].id.videoId);
						data.push(result.items[1].snippet.thumbnails.high.url);
				} else {
						data.push(result.items[0].snippet.title);
						data.push(result.items[0].id.videoId);
						data.push(result.items[0].snippet.thumbnails.high.url);
				}
				resolve(data);
			}
		});
	});
};

// gets the song data from billboard
const gotTop100 = chart => {
	var songs = new Promise((resolve,reject) => {
		billboard(chart, function(error, songs){
			if (error) {
				reject(error);
			} else {
				resolve(songs);
			}
		});
	});
	return songs;
};

// creates the data object of songs and their youtube links
const getVideos = (chart = 'hot-100') => {
	var data = new Promise((resolve,reject) => {
		// lets get the songs
		gotTop100(chart).then(function(result){
			console.log(typeof result);
			console.log("---------");
			console.log( result.songs);
			// holder for getYouTube links promises
			let data = [];

			for (let i = 0; i < result.songs.length; i++){
				// get youtube link for each of the songs
				// console.log(result.songs[i].rank);
				data.push(getYoutubeLink(result.songs[i].rank, result.songs[i].title, result.songs[i].artist, result.songs[i].cover, "" + result.songs[i].artist + " - " + result.songs[i].title));
			}

			// chain all the youtube link promises
			Promise.all(data)
				.then(function(data){
					// when the promises of all objects of song names and video links is done
					// console.log(data);
					resolve(data);
				})
				.catch(function(error){
					reject(error);
				});
		});
	});
	return data;
};

module.exports = getVideos;
