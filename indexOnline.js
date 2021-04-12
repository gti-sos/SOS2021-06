
var BASE_API_PATH = "/api/v1";

module.exports.register = (app) => {
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
};