const charts = require("billboard-top-100").getChart

const billboardChart = () => {
	return new Promise((resolve, reject) => {
		charts((error, chart) => {
			if (!error) {
				resolve({
					status: "OK",
					data: chart.songs
				})
			} else {
				reject({
					status: "Error",
					data: error
				})
			}
		})
	})
}

billboardChart().then(result => {
	if (result.status == "OK") {
		// console.log(result);sd
	} else {
		// console.log(error)
	}
})
