const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8081;

const charts = require("billboard-top-100").getChart;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

// test end point
app.get("/test", (req, res) => {
	res.send({
		status: "Server is up"
	});
});

// serve route
app.get("/", function(req, res) {
	billboardChart().then(result => {
		if (result.status == "OK") {
			res.render("index", {
				title: "Billboard Top 100",
				message: "Billboard Top 100",
				songs: result.data
			});
		} else {
			res.send(`Error ${result.data}`);
		}
	});
});

// listen server
app.listen(port, () => {
	console.log(`Server running on ${port}`);
});

const billboardChart = () => {
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
