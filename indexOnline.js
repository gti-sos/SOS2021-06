var express = require("express");

var PORT = (process.env.PORT || 1807);
var BASE_API_PATH = "/api/v1";

var app= express();

app.use("/",express.static("./public"));

var onlinemedia = [
	{
		"name": "Netflix",
		"country": "Spain",
		"year": 2020,
		"account price": "7,99 €/month",
		"mark": 4.5,
		"audience": "4,2M",

},
{
		"name": "HBO",
		"country": "Spain",
		"year": 2020,
		"account price": "8,99 €/month",
		"mark": 2.5,
		"audience": "731k",

},
{
		"name": "Amazon Prime",
		"country": "Spain",
		"year": 2020,
		"account price": "3,99 €/month",
		"mark": 4.4,
		"audience": "1,2M",

},
{
		"name": "Disney Plus",
		"country": "Spain",
		"year": 2020,
		"account price": "6,99 €/month",
		"mark": 4.4,
		"audience": "1,2M",

},
{
		"name": "Rakuten",
		"country": "Spain",
		"year": 2020,
		"account price": "6,99 €/month",
		"mark": 4.0,
		"audience": "2,2M",

},

];
	
app.get(BASE_API_PATH +"/onlinemedia", (req,res)=>{ 
	res.send(JSON.stringify(onlinemedia,null,2));
});

app.listen(PORT,()=>{
	console.log("Server ready at "+PORT);
});