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

app.get("/info/digitalstreaming-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Digital media stats</h2> <table style=\"width:100%\"> <tr> <th>country</th> <th>year</th>  <th>hours-viewed</th> <th>avg-age</th> <th>avg-audience</th> </tr> <tr> <td>Twitch</td> <td>spain</td> <td>2020</td> <td>18 410 000 000</td> <td>21</td> <td>2 500 000</td> </tr> <tr> <td>Twitch</td> <td>spain</td> <td>2019</td> <td>11 000 000 000</td> <td>21</td> <td>1 200 000</td> </tr> <tr> <td>YouTube</td> <td>spain</td> <td>2020</td> <td>6 190 000 000</td> <td>30</td> <td>871 000</td> </tr> <tr> <td>YouTube</td> <td>spain</td> <td>2019</td> <td>3 190 000 000</td> <td>30</td> <td>443 256</td> </tr> <tr> <td>Facebook</td> <td>spain</td> <td>2020</td> <td>3 100 000 000</td> <td>26</td> <td>408 000</td> </tr> <tr> <td>Facebook</td> <td>spain</td> <td>2019</td> <td>1 090 000 000</td> <td>26</td> <td>136 000</td> </tr> </table> </body></html>");
});

app.get("/info/television-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Television Stats</h2> <table style=\"width:100%\"> <tr> <th></th>  <th>Groups TV</th><th>country</th> <th>year</th> <th>cable/tv broadcast avg-audience-year</th> <th>Avg age</th> <th>avg-audience-month</th> </tr> <tr> <td>Telecinco</td> <td>Spain</td> <td>2019</td> <td>18.200.000</td> <td>58</td> <td>2.164.000</td> </tr> <tr> <td>Antena 3</td> <td>Spain</td> <td>2019</td> <td>19.800.000</td> <td>57</td> <td>2.330.000</td> </tr> <tr>  <td>La 1</td> <td>Spain</td> <td>2019</td> <td>10.500.000</td> <td>60</td> <td>1.725.000</td> </tr> <tr> <th></th>  <th>Groups TV</th><th>country</th> <th>year</th> <th>cable/tv broadcast avg-audience-year</th> <th>Avg age</th> <th>avg-audience-month</th> </tr> <tr> <td>Telecinco</td> <td>Spain</td> <td>2019</td> <td>18.200.000</td> <td>58</td> <td>2.164.000</td> </tr> <tr> <td>Antena 3</td> <td>Spain</td> <td>2019</td> <td>19.800.000</td> <td>57</td> <td>2.330.000</td> </tr> <tr>  <td>La 1</td> <td>Spain</td> <td>2019</td> <td>10.500.000</td> <td>60</td> <td>1.725.000</td> </tr> </table> </body> </html>");
	console.log("New request to /cool has arrived");
});

app.listen(port,() => {
	console.log("Server ready listening on port" + port)
});
		
console.log(cool());