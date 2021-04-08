var express = require("express");

var bodyParser = require("body-parser");

var PORT = (process.env.PORT || 1807);
var BASE_API_PATH = "/api/v1";

var app= express();

app.use(bodyParser.json());
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
	
app.get(BASE_API_PATH+"/onlinemedia/loadInitialData",(req,res)=>{
    res.send(JSON.stringify(onlinemedia,null,2)); 

});

//GET a la lista de recursos
app.get(BASE_API_PATH +"/onlinemedia", (req,res)=>{ 
	res.send(JSON.stringify(onlinemedia,null,2));
});

//POST a la lista de recursos
app.post(BASE_API_PATH +"/onlinemedia", (req,res)=>{ 
	var newOnline = req.body;
	console.log(`new OnlineMedia to be added: <${JSON.stringify(newOnline,null,2)}>`);
	onlinemedia.push(newOnline);
	res.sendStatus(201);
});

//GET a un recurso 
app.get(BASE_API_PATH +"/onlinemedia/:country/:year", (req,res)=>{ 
	country = req.params.country;
    year = req.params.year;
    var newOnline = [];
    for(var i=0; i < onlinemedia.length; i++){
        if(onlinemedia[i].country == country && onlinemedia[i].year== year){
            newOnline.push(onlinemedia[i]);
        }
	}
	res.send(JSON.stringify(newOnline,null,2));
	res.sendStatus(201);
});

//DELETE a un recurso
app.delete(BASE_API_PATH+"/onlinemedia/:country/:year",(req, res)=>{
    country = req.params.country;
    year = req.params.year;
    var newOnline = [];
    for(var i=0; i < onlinemedia.length; i++){
        if(onlinemedia[i].country == country && onlinemedia[i].year==year){
            newOnline = onlinemedia.splice(i, 1);
            console.log(newOnline);
        }
    }
    res.sendStatus(204);
    res.send("Deleted " +country+" "+year);
    
});

//PUT a un recurso 
app.put(BASE_API_PATH+"/onlinemedia/:country/:year",(req, res)=>{
    country = req.params.country;
    year = req.params.year;
    var newOnline = [];
    for(var i=0; i<onlinemedia.length; i++){
		if(onlinemedia[i].country==country && onlinemedia[i].year==year){
			onlinemedia[i]=req.body;
		}
	}
	res.send("Updated "+country+" "+year);
	res.sendStatus(200);
});

//POST a un recurso 
app.post(BASE_API_PATH+"/onlinemedia/:country/:year",(req, res)=>{
    res.sendStatus(405);
});

// PUT a la lista de recursos 
app.put(BASE_API_PATH+"/onlinemedia",(req, res)=>{
    res.sendStatus(405);
});

//DELETE a la lista de recursos 
app.delete(BASE_API_PATH+"/onlinemedia", (req,res)=>{
    for(var i=0; i < onlinemedia.length+1; i++){
       onlinemedia.pop();
    }
    res.send("Delete OnlineMedia data")
    res.sendStatus(204); 
});

app.listen(PORT,()=>{
	console.log("Server ready at "+PORT);
});