var cool = require("cool-ascii-faces");

var express = require("express");

var bodyParser = require("body-parser");

var app= express();

var port = (process.env.PORT || 10000);

var path = require("path");

var BASE_API_PATH = "/api/v1";

app.use("/",express.static(path.join(__dirname , "public")));
app.use(bodyParser.json());

app.get("/cool",(request,response)=>{
	response.send(cool());
	console.log("New request to /cool has arrived");
});

app.get("/info/television-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Television Stats</h2> <table style=\"width:60%\"> <tr> <th>Group TV</th><th>country</th> <th>year</th> <th>cable/tv broadcast avg-audience-year</th> <th>Avg age</th> <th>avg-audience-month</th> </tr> <tr> <td>Telecinco</td> <td>Spain</td> <td>2019</td> <td align='center'>18.200.000</td> <td align='center'>58</td> <td align='center'>2.164.000</td> </tr> <tr> <td>Antena 3</td> <td>Spain</td> <td>2019</td> <td align='center'>19.800.000</td> <td align='center'>57</td> <td align='center'>2.330.000</td> </tr> <tr>  <td>La 1</td> <td>Spain</td> <td>2019</td> <td align='center'>10.500.000</td> <td align='center'>60</td> <td align='center'>1.725.000</td> </tr> </table><br></br><table style=\"width:60%\"><tr> <th>Group TV</th><th>country</th> <th>year</th> <th>cable/tv broadcast avg-audience-year</th> <th>Avg age</th> <th>avg-audience-month</th> </tr> <tr> <td>Telecinco</td> <td>Spain</td> <td>2019</td> <td align='center'>18.200.000</td> <td align='center'>58</td> <td align='center'>2.164.000</td> </tr> <tr> <td>Antena 3</td> <td>Spain</td> <td>2019</td> <td align='center'>19.800.000</td> <td align='center'>57</td> <td align='center'>2.330.000</td> </tr> <tr>  <td>La 1</td> <td>Spain</td> <td>2019</td> <td align='center'>10.500.000</td> <td align='center'>60</td> <td align='center'>1.725.000</td> </tr> </table> </body> </html>");
});

app.get("/info/onlinemedia-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Payment Platform Stats</h2> <table style=\"width:100%\"> <tr>  <th>name</th> <th>country</th> <th>year</th> <th>account price</th> <th>GPS mark</th> <th>subs</th> </tr> <tr> <td>Netflix</td> <td>Spain</td> <td>2020</td> <td>7,99€/month</td> <td>4,5</td> <td>4,2M</td> </tr> <tr> <td>HBO</td> <td>Spain</td> <td>2020</td> <td>8,99€/month</td> <td>2,5</td> <td>731k</td> </tr> <tr>  <td>Amazon Prime</td> <td>Spain</td> <td>2020</td> <td>3,99€/month</td> <td>4,4</td> <td>1,2M</td> </tr> <tr> <td>Disney Plus</td> <td>Spain</td>  <td>2020</td> <td>6,99€/month</td> <td>4,4</td> <td>1,2M</td> </tr> <tr>  <td>Rakuten</td> <td>Spain</td> <td>2020</td> <td>6,99€/month</td> <td>4,0</td> <td>2,2M</td> </tr> </table> </body> </html>");
	
});


// API Streaming stats
app.get("/info/digitalstreaming-stats",(request,response)=>{
	response.send("<!DOCTYPE html> <html> <body> <h2>Digital media stats</h2> <table style=\"width:100%\"> <tr> <th>country</th> <th>year</th>  <th>hours-viewed</th> <th>avg-age</th> <th>avg-audience</th> </tr> <tr> <td>Twitch</td> <td>spain</td> <td>2020</td> <td>18 410 000 000</td> <td>21</td> <td>2 500 000</td> </tr> <tr> <td>Twitch</td> <td>spain</td> <td>2019</td> <td>11 000 000 000</td> <td>21</td> <td>1 200 000</td> </tr> <tr> <td>YouTube</td> <td>spain</td> <td>2020</td> <td>6 190 000 000</td> <td>30</td> <td>871 000</td> </tr> <tr> <td>YouTube</td> <td>spain</td> <td>2019</td> <td>3 190 000 000</td> <td>30</td> <td>443 256</td> </tr> <tr> <td>Facebook</td> <td>spain</td> <td>2020</td> <td>3 100 000 000</td> <td>26</td> <td>408 000</td> </tr> <tr> <td>Facebook</td> <td>spain</td> <td>2019</td> <td>1 090 000 000</td> <td>26</td> <td>136 000</td> </tr> </table> </body></html>");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var television = [];

var televisionInitial = [
	{
		"groupTV" : "Telecinco",
		"country" : "Spain",
		"year" : 2019,
		"cable/tv broadcast avg-audience-year" : 18200000,
		"avg-age" : 58,
		"avg-audience-month" : 2164000
	},
	{
		"groupTV" : "Antena3",
		"country" : "Spain",
		"year" : 2020,
		"cable/tv broadcast avg-audience-year" :  19800000,
		"avg-age" : 57,
		"avg-audience-month" : 2330000
	}
	
];

app.get(BASE_API_PATH+"/television-stats/loadInitialData",(req,res)=>{
 for(var i=0;i<televisionInitial.length;i++){
        television.push(televisionInitial[i]);
    }
    console.log("Loaded Initial Data");
    res.sendStatus(200);
});

//GET a la lista de recursos
app.get(BASE_API_PATH +"/television-stats", (req,res)=>{ 
	res.send(JSON.stringify(television,null,2));
});

//POST a la lista de recursos
app.post(BASE_API_PATH +"/television-stats", (req,res)=>{ 
	var newGroupTV = req.body;
	console.log(`new GroupTV to be added: <${JSON.stringify(newGroupTV,null,2)}>`);
	television.push(newGroupTV);
	res.sendStatus(201);
});

//GET a un recurso 
app.get(BASE_API_PATH +"/television-stats/:groupTV/:year", (req,res)=>{ 
	groupTV = req.params.groupTV;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i < television.length; i++){
        if(television[i].groupTV == groupTV && television[i].year== year){
            newGroupTV.push(television[i]);
        }
	}
	res.send(JSON.stringify(newGroupTV,null,2));
	res.sendStatus(201);
});

//DELETE a un recurso
app.delete(BASE_API_PATH+"/television-stats/:groupTV/:year",(req, res)=>{
    groupTV = req.params.groupTV;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i < television.length; i++){
        if(television[i].groupTV == groupTV && television[i].year==year){
            newGroupTV = television.splice(i, 1);
            console.log(newGroupTV);
        }
    }
    res.sendStatus(204);
    res.send("Deleted " +groupTV+" "+year);
    
});

//PUT a un recurso 
app.put(BASE_API_PATH+"/television-stats/:groupTV/:year",(req, res)=>{
    groupTV = req.params.groupTV;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i<television.length; i++){
		if(television[i].groupTV==groupTV && television[i].year==year){
			television[i]=req.body;
		}
	}
	res.send("Updated "+groupTV+" "+year);
	res.sendStatus(200);
});

//POST a un recurso 
app.post(BASE_API_PATH+"/television-stats/:groupTV/:year",(req, res)=>{
    res.sendStatus(405);
});

// PUT a la lista de recursos 
app.put(BASE_API_PATH+"/television-stats",(req, res)=>{
    res.sendStatus(405);
});

//DELETE a la lista de recursos 
app.delete(BASE_API_PATH+"/television-stats", (req,res)=>{
    if (television.length == 0){
        console.log("Nothing to delete");
        res.sendStatus(405);
    } else {
        television.length = 0;
        console.log("Deleted data");
        res.sendStatus(200);
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var stream = require("./indexStream.js");

stream.register(app);

/////////////////////////////////////////////////////////////////////////////////////////////////////
var onlinemedia = [];

var onlinemediaInitial = [
	{
		"onlineMedia": "Netflix",
		"country": "Spain",
		"year": 2020,
		"account price": "7,99 €/month",
		"mark": 4.5,
		"audience": "4,2M",

},
{
		"onlineMedia": "HBO",
		"country": "Spain",
		"year": 2020,
		"account price": "8,99 €/month",
		"mark": 2.5,
		"audience": "731k",

},
{
		"onlineMedia": "Amazon Prime",
		"country": "Spain",
		"year": 2020,
		"account price": "3,99 €/month",
		"mark": 4.4,
		"audience": "1,2M",

},
{
		"onlineMedia": "Disney Plus",
		"country": "Spain",
		"year": 2020,
		"account price": "6,99 €/month",
		"mark": 4.4,
		"audience": "1,2M",

},
{
		"onlineMedia": "Rakuten",
		"country": "Spain",
		"year": 2020,
		"account price": "6,99 €/month",
		"mark": 4.0,
		"audience": "2,2M",

},

];

app.get(BASE_API_PATH+"/onlinemedia-stats/loadInitialData",(req,res)=>{
 for(var i=0;i<onlinemediaInitial.length;i++){
        onlinemedia.push(onlinemediaInitial[i]);
    }
    console.log("Loaded Initial Data");
    res.sendStatus(200);
});

//GET a la lista de recursos
app.get(BASE_API_PATH +"/onlinemedia-stats", (req,res)=>{ 
	res.send(JSON.stringify(onlinemedia,null,2));
});

//POST a la lista de recursos
app.post(BASE_API_PATH +"/onlinemedia-stats", (req,res)=>{ 
	var newOnlineMedia = req.body;
	console.log(`new OnlineMedia to be added: <${JSON.stringify(newOnlineMedia,null,2)}>`);
	onlinemedia.push(newOnlineMedia);
	res.sendStatus(201);
});

//GET a un recurso 
app.get(BASE_API_PATH +"/onlinemedia-stats/:onlineMedia/:year", (req,res)=>{ 
	onlineMedia = req.params.onlineMedia;
    year = req.params.year;
    var newOnlineMedia = [];
    for(var i=0; i < onlinemedia.length; i++){
        if(onlinemedia[i].onlineMedia == onlineMedia && onlinemedia[i].year== year){
            newOnlineMedia.push(onlinemedia[i]);
        }
	}
	res.send(JSON.stringify(newOnlineMedia,null,2));
	res.sendStatus(201);
});

//DELETE a un recurso
app.delete(BASE_API_PATH+"/onlinemedia-stats/:onlineMedia/:year",(req, res)=>{
    onlineMedia = req.params.onlineMedia;
    year = req.params.year;
    var newOnlineMedia = [];
    for(var i=0; i < onlinemedia.length; i++){
        if(onlinemedia[i].onlineMedia == onlineMedia && onlinemedia[i].year==year){
            newOnlineMedia = onlinemedia.splice(i, 1);
            console.log(newOnlineMedia);
        }
    }
    res.sendStatus(204);
    res.send("Deleted " +onlineMedia+" "+year);
    
});

//PUT a un recurso 
app.put(BASE_API_PATH+"/onlinemedia-stats/:onlineMedia/:year",(req, res)=>{
    onlineMedia = req.params.onlineMedia;
    year = req.params.year;
    var newOnlineMedia = [];
    for(var i=0; i<onlinemedia.length; i++){
		if(onlinemedia[i].onlineMedia==onlineMedia && onlinemedia[i].year==year){
			onlinemedia[i]=req.body;
		}
	}
	res.send("Updated "+onlineMedia+" "+year);
	res.sendStatus(200);
});

//POST a un recurso 
app.post(BASE_API_PATH+"/onlinemedia-stats/:onlineMedia/:year",(req, res)=>{
    res.sendStatus(405);
});

// PUT a la lista de recursos 
app.put(BASE_API_PATH+"/onlinemedia-stats",(req, res)=>{
    res.sendStatus(405);
});

//DELETE a la lista de recursos 
app.delete(BASE_API_PATH+"/onlinemedia-stats", (req,res)=>{
	if (onlinemedia.length == 0){
		console.log("No hay datos para borrar");
		res.sendStatus(405);
	} else {
		onlinemedia.length = 0;
		console.log("Datos borrados correctamente");
		res.sendStatus(200);
	}
});





/////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port,() => {
	console.log("Server ready listening on port" + port)
});
		
console.log(cool());