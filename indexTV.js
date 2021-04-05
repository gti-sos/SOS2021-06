var express = require("express");

var PORT = (process.env.PORT || 1807);
var BASE_API_PATH = "/api/v1";

var app= express();

app.use("/",express.static("./public"));

var television = [
	{
		"GroupTV" : "Telecinco",
		"country" : "Spain",
		"year" : 2020,
		"cable/tv broadcast avg-audience-year" : 18200000,
		"avg-age" : 58,
		"avg-audience-month" : 2164000
	},
	{
		"GroupTV" : "Antena3",
		"country" : "Spain",
		"year" : 2020,
		"cable/tv broadcast avg-audience-year" :  19800000,
		"avg-age" : 57,
		"avg-audience-month" : 2330000
	}
	
];
	
app.get(BASE_API_PATH +"/television", (req,res)=>{ 
	res.send(JSON.stringify(television,null,2));
});

app.listen(PORT,()=>{
	console.log("Server ready at "+PORT);
});