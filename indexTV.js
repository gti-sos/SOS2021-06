var express = require("express");

var bodyParser = require("body-parser");

var PORT = (process.env.PORT || 1807);
var BASE_API_PATH = "/api/v1";

var app= express();

app.use(bodyParser.json());
app.use("/",express.static("./public"));

var television = [
	{
		"GroupTV" : "Telecinco",
		"country" : "germain",
		"year" : 2019,
		"cable/tv broadcast avg-audience-year" : 18200000,
		"avg-age" : 58,
		"avg-audience-month" : 2164000
	},
	{
		"GroupTV" : "Antena3",
		"country" : "spain",
		"year" : 2020,
		"cable/tv broadcast avg-audience-year" :  19800000,
		"avg-age" : 57,
		"avg-audience-month" : 2330000
	}
	
];

app.get(BASE_API_PATH+"/television/loadInitialData",(req,res)=>{
    res.send(JSON.stringify(television,null,2)); 

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
app.get(BASE_API_PATH +"/television/:country/:year", (req,res)=>{ 
	country = req.params.country;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i < television.length; i++){
        if(television[i].country == country && television[i].year== year){
            newGroupTV.push(television[i]);
        }
	}
	res.send(JSON.stringify(newGroupTV,null,2));
	res.sendStatus(201);
});

//DELETE a un recurso
app.delete(BASE_API_PATH+"/television/:country/:year",(req, res)=>{
    country = req.params.country;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i < television.length; i++){
        if(television[i].country == country && television[i].year==year){
            newGroupTV = television.splice(i, 1);
            console.log(newGroupTV);
        }
    }
    res.sendStatus(204);
    res.send("Deleted " +country+" "+year);
    
});

//PUT a un recurso 
app.put(BASE_API_PATH+"/television/:country/:year",(req, res)=>{
    country = req.params.country;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i<television.length; i++){
		if(television[i].country==country && television[i].year==year){
			television[i]=req.body;
		}
	}
	res.send("Updated "+country+" "+year);
	res.sendStatus(200);
});

//POST a un recurso 
app.post(BASE_API_PATH+"/television/:country/:year",(req, res)=>{
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

app.listen(PORT,()=>{
	console.log("Server ready at "+PORT);
});