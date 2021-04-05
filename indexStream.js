var express = require("express");

var PORT = (process.env.PORT || 1807);
var BASE_API_PATH = "/api/v1";

var app= express();

app.use("/",express.static("./public"));

var streaming = [
	{
		"Platform" : "Twitch",
		"country" : "Spain",
		"year" : 2020,
		"hours-viewed" : 18410000000,
		"avg-age" : 21,
		"avg-audience" : 2500000
	},
	{
		"Platform" : "Twitch",
		"country" : "Spain",
		"year" : 2019,
		"hours-viewed" : 11000000000,
		"avg-age" : 21,
		"avg-audience" : 1200000
	},
	{
		"Platform" : "YouTube",
		"country" : "Spain",
		"year" : 2020,
		"hours-viewed" : 61900000000,
		"avg-age" : 30,
		"avg-audience" : 871000
	},
	{
		"Platform" : "YouTube",
		"country" : "Spain",
		"year" : 2019,
		"hours-viewed" : 31900000000,
		"avg-age" : 30,
		"avg-audience" : 443256
	},
	{
		"Platform" : "Facebook",
		"country" : "Spain",
		"year" : 2020,
		"hours-viewed" : 31000000000,
		"avg-age" : 26,
		"avg-audience" : 408000
	},
	{
		"Platform" : "Facebook",
		"country" : "Spain",
		"year" : 2019,
		"hours-viewed" : 1090000000,
		"avg-age" : 26,
		"avg-audience" : 136000
	}
	
];
	
app.get(BASE_API_PATH +"/streaming", (req,res)=>{ 
	res.send(JSON.stringify(streaming,null,2));
});

app.listen(PORT,()=>{
	console.log("Server ready at "+PORT);
});