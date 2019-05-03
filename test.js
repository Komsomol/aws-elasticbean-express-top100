const getVideos = require('./getVideos');
const jsonfile = require('jsonfile');
 
const file = 'data/data.json'
// console.log(getVideo
getVideos()
	.then((result) => {
		console.log(result);
		jsonfile.writeFile(file, result,{ spaces: 2 }, function (err) {
			if (err) console.error(err);
			console.log("done");

		});
	})
	.catch( (error) => {
		console.log(error)
	});