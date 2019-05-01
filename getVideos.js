//jshint esversion:6
require('dotenv').config();

const got = require('got');
const billboard = require("billboard-top-100").getChart;
const YouTube = require('youtube-node');
const youTube = new YouTube();

youTube.setKey(process.env.YOUTUBE_KEY);

// gets youtube links
const getYoutubeLink = (rank, songName) => {
	return new Promise((resolve, reject) => {
		youTube.search(songName + ' music video', 2, function(error, result) {

			if (error) {
				reject(console.log(error));
			}
			else {
				let data = [];
				data.push(rank, songName);

				if(result.items[0].id.kind === 'youtube#channel'){
						data.push(result.items[1].snippet.title);
						data.push(result.items[1].id.videoId);
						data.push(result.items[1].snippet.thumbnails.high.url);
				} else {
						data.push(result.items[0].snippet.title);
						data.push(result.items[0].id.videoId);
						data.push(result.items[0].snippet.thumbnails.high.url);
				}

				// console.log("data",data);
				resolve(data);
			}
		});
	});
};

// gets the song data from billboard
const gotTop100 = chart => {
	console.log('gotTop100 = ',chart);
	var songs = new Promise((resolve,reject) => {
		console.log("chart is ", chart);
		billboard(chart, function(error, songs){
			// console.log(error);
			if (error) {
				reject(error);
			} else {
				// console.log("SENDING SONGS")
				resolve(songs);
			}
		});
	});

	// console.log("CHEK");
	return songs;
};

// creates the data object of songs and their youtube links
const getBillboardDataObject = (chart = 'hot-100') => {

	var data = new Promise((resolve,reject) => {
		// lets get the songs
		console.log('getBillboardDataObject =', chart);
		gotTop100(chart);
		gotTop100(chart).then(function(songs){
			console.log(songs);
			// holder for getYouTube links promises
			let data = [];

			for (let i = 0; i < songs.length; i++){
				// get youtube link for each of the songs
				console.log(songs);
				data.push(getYoutubeLink(songs[i].rank, "" + songs[i].artist + " - " + songs[i].title));
			}

			// chain all the youtube link promises
			Promise.all(data)
				.then(function(data){
					// when the promises of all objects of song names and video links is done
					// console.log(data)
					resolve(data);

				})
				.catch(function(error){
					reject(error);
				});

		});
	});
	return data;
};

module.exports = getBillboardDataObject
