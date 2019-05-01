const getVideos = require('./getVideos');

// console.log(getVideo

getVideos().then( (result) => {
	console.log(result);
}).catch( (error) => console.log(error));