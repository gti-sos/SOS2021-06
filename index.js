var cool = require("cool-ascii-faces");

var express = require("express");

var app= express();

var port = (process.env.PORT || 10000);

var path = require("path");

app.use("/",express.static(path.join(__dirname , "public")));

app.get("/cool",(request,response)=>{
	response.send(cool());
	console.log("New request to /cool has arrived");
});

app.get("/info/digitalstreaming-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Digital media stats</h2> <table style=\"width:100%\"> <tr> <th>country</th> <th>year</th>  <th>hours-viewed</th> <th>avg-age</th> <th>avg-audience</th> </tr> <tr> <td>Twitch</td> <td>spain</td> <td>2020</td> <td>18 410 000 000</td> <td>21</td> <td>2 500 000</td> </tr> <tr> <td>Twitch</td> <td>spain</td> <td>2019</td> <td>11 000 000 000</td> <td>21</td> <td>1 200 000</td> </tr> <tr> <td>YouTube</td> <td>spain</td> <td>2020</td> <td>6 190 000 000</td> <td>30</td> <td>871 000</td> </tr> <tr> <td>YouTube</td> <td>spain</td> <td>2019</td> <td>3 190 000 000</td> <td>30</td> <td>443 256</td> </tr> <tr> <td>Facebook</td> <td>spain</td> <td>2020</td> <td>3 100 000 000</td> <td>26</td> <td>408 000</td> </tr> <tr> <td>Facebook</td> <td>spain</td> <td>2019</td> <td>1 090 000 000</td> <td>26</td> <td>136 000</td> </tr> </table> </body></html>");
});

app.get("/info/television-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Television Stats</h2> <table style=\"width:60%\"> <tr> <th>Group TV</th><th>country</th> <th>year</th> <th>cable/tv broadcast avg-audience-year</th> <th>Avg age</th> <th>avg-audience-month</th> </tr> <tr> <td>Telecinco</td> <td>Spain</td> <td>2019</td> <td align='center'>18.200.000</td> <td align='center'>58</td> <td align='center'>2.164.000</td> </tr> <tr> <td>Antena 3</td> <td>Spain</td> <td>2019</td> <td align='center'>19.800.000</td> <td align='center'>57</td> <td align='center'>2.330.000</td> </tr> <tr>  <td>La 1</td> <td>Spain</td> <td>2019</td> <td align='center'>10.500.000</td> <td align='center'>60</td> <td align='center'>1.725.000</td> </tr> </table><br></br><table style=\"width:60%\"><tr> <th>Group TV</th><th>country</th> <th>year</th> <th>cable/tv broadcast avg-audience-year</th> <th>Avg age</th> <th>avg-audience-month</th> </tr> <tr> <td>Telecinco</td> <td>Spain</td> <td>2019</td> <td align='center'>18.200.000</td> <td align='center'>58</td> <td align='center'>2.164.000</td> </tr> <tr> <td>Antena 3</td> <td>Spain</td> <td>2019</td> <td align='center'>19.800.000</td> <td align='center'>57</td> <td align='center'>2.330.000</td> </tr> <tr>  <td>La 1</td> <td>Spain</td> <td>2019</td> <td align='center'>10.500.000</td> <td align='center'>60</td> <td align='center'>1.725.000</td> </tr> </table> </body> </html>");
});

app.get("/info/onlinemedia-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Payment Platform Stats</h2> <table style=\"width:100%\"> <tr>  <th>name</th> <th>country</th> <th>year</th> <th>account price</th> <th>GPS mark</th> <th>subs</th> </tr> <tr> <td>Netflix</td> <td>Spain</td> <td>2020</td> <td>7,99€/month</td> <td>4,5</td> <td>4,2M</td> </tr> <tr> <td>HBO</td> <td>Spain</td> <td>2020</td> <td>8,99€/month</td> <td>2,5</td> <td>731k</td> </tr> <tr>  <td>Amazon Prime</td> <td>Spain</td> <td>2020</td> <td>3,99€/month</td> <td>4,4</td> <td>1,2M</td> </tr> <tr> <td>Disney Plus</td> <td>Spain</td>  <td>2020</td> <td>6,99€/month</td> <td>4,4</td> <td>1,2M</td> </tr> <tr>  <td>Rakuten</td> <td>Spain</td> <td>2020</td> <td>6,99€/month</td> <td>4,0</td> <td>2,2M</td> </tr> </table> </body> </html>");
	console.log("New request to /cool has arrived");
});

app.listen(port,() => {
	console.log("Server ready listening on port" + port)
});
		
console.log(cool());

var express = require("express");

var PORT = (process.env.PORT || 1808);
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

app.listen(port,()=>{
	console.log("Server ready at "+PORT);
});