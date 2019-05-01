const charts = require("billboard-top-100").getChart;

const BCPromise = async() =>{
	return new Promise((resolve, reject) => {
		charts((error, chart) => {
			if (!error) {
				resolve({
					status: "OK",
					data: chart.songs
				});
			} else {
				reject({
					status: "Error",
					data: error
				});
			}
		});
	});
};

const foo = async() =>{   
	const data = await BCPromise();
	console.log("DATA ",data);
};

foo();