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
var televisionInitial = [];

var television = [
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

app.get(BASE_API_PATH +"/streaming-stats/loadInitialData", (req,res)=>{ 
	if (televisionInitial.length == 0){
		for (var i=0;i <television.length;i++){
			televisionInitial.push(television[i]);
		}
		console.log('Datos cargados correctamente')
		return res.sendStatus(200).json(televisionInitial);
	}
});

//GET a la lista de recursos
app.get(BASE_API_PATH +"/television", (req,res)=>{ 
	res.send(JSON.stringify(television,null,2));
});

//POST a la lista de recursos
app.post(BASE_API_PATH +"/television", (req,res)=>{ 
	var newGroupTV = req.body;
	console.log(`new GroupTV to be added: <${JSON.stringify(newGroupTV,null,2)}>`);
	television.push(newGroupTV);
	res.sendStatus(201);
});

//GET a un recurso 
app.get(BASE_API_PATH +"/television/:groupTV/:year", (req,res)=>{ 
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
app.delete(BASE_API_PATH+"/television/:groupTV/:year",(req, res)=>{
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
app.put(BASE_API_PATH+"/television/:groupTV/:year",(req, res)=>{
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
app.post(BASE_API_PATH+"/television/:groupTV/:year",(req, res)=>{
    res.sendStatus(405);
});

// PUT a la lista de recursos 
app.put(BASE_API_PATH+"/television",(req, res)=>{
    res.sendStatus(405);
});

//DELETE a la lista de recursos 
app.delete(BASE_API_PATH+"/television", (req,res)=>{
    for(var i=0; i < television.length+1; i++){
       television.pop();
    }
    res.send("Delete GroupTV data")
    res.sendStatus(204); 
});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


var strstats = [];



//5,2
app.get(BASE_API_PATH +"/streaming-stats/loadInitialData", (req,res)=>{ 
	//res.send(JSON.stringify(streaming,null,2));
	if (strstats.length == 0){
		for (var i=0;i <strstats.length;i++){
			strstats.push(streaming[i]);
		}
		console.log('Datos cargados correctamente')
		return res.sendStatus(200).json(strstats);
	}
});
//6.1
app.get(BASE_API_PATH +"/streaming", (req,res)=>{ 
	res.send(JSON.stringify(streaming,null,2));
});

//6.2
app.post(BASE_API_PATH +"/streaming-stats", (req,res)=>{ 
	var newStat = req.body;
	console.log(`new stat to be added: <${JSON.stringify(newStat,null,2)}>`);
	streaming.push(newStat);
	res.sendStatus(201);
});

//6.3
app.get(BASE_API_PATH +"/streaming-stats/:country/:year", (req,res)=>{
	var pais = req.params.country;
	var ano = req.params.year;
	
	for (var stat of streaming){
		if (stat.country == pais && stat.ano == year){
			return res.sendStatus(200).json(stat);
		}
		else {
			res.sendStatus(404);
		}
	}
});

//6.4
app.delete(BASE_API_PATH+"/streaming-stats/:country/:year", (req,res)=>{
	var pais = req.params.country;
	var ano = req.params.year;
	
	if (streaming.length != 0){
		for (var i=0; i<streaming.length;i++){
			if(streaming[i].country == pais && streaming[i].year == ano){
				streaming.splice(i,1);
				return res.sendStatus(200);
			}
		}
	}
	return res.sendStatus(404);
});

//6.5
app.put(BASE_API_PATH+"/streaming-stats/:country/:year", (req,res)=>{
	var pais = req.params.country;
	var ano = req.params.year;
	var newStat = req.body;
	
	for(var i = 0; i<streaming.length;i++){
		streaming[i]["country"] = pais;
		streaming[i]["year"] = ano;
		streaming[i]["hours-viewed"] = newStat['hours-viewed'];
		streaming[i]["avg-age"] = newStat['avg-age'];
		streaming[i]["avg-audience"] = newStat['avg-audience'];
		res.sendStatus(200);
	}
	
});

//6.6

app.post(BASE_API_PATH+"streaming-stats/:country/:year", (req, res) => {
	console.log("Metodo no permitido");
	res.sendStatus(405);
});

//6.7
app.put(BASE_API_PATH + "/streaming-stats", (req,res)=>{
	console.log("Metodo no permitido");
	res.sendStatus(405);
});

//6.8
app.delete(BASE_API_PATH+"/streaming-stats", (req,res)=>{
	if (streaming.length == 0){
		console.log("No hay datos para borrar");
		res.sendStatus(405);
	} else {
		streaming.length = 0;
		console.log("Datos borrados correctamente");
		res.sendStatus(200);
	}
});


/////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port,() => {
	console.log("Server ready listening on port" + port)
});
		
console.log(cool());