
var BASE_API_PATH = "/api/v1";

var  Datastore = require("nedb");

var db = new Datastore();



module.exports.register = (app) => {
var onlinemedia = [];



db.find();

var onlinemediaInitial = [
	{
		"online_media": "Netflix",
		"country": "Spain",
		"year": 2020,
		"account_price_per_month": 7.99,
		"mark": 4.5,
		"audience": 4200000,

},
{
		"online_media": "HBO",
		"country": "Spain",
		"year": 2020,
		"account_price_per_month": 8.99,
		"mark": 2.5,
		"audience": 731000,

},
{
		"online_media": "Amazon Prime",
		"country": "Spain",
		"year": 2020,
		"account_price_per_month": 3.99,
		"mark": 4.4,
		"audience": 1200000,

},
{
		"online_media": "Disney Plus",
		"country": "Spain",
		"year": 2020,
		"account_price_per_month": 6.99 ,
		"mark": 4.4,
		"audience": 1200000,

},
{
		"online_media": "Rakuten",
		"country": "Spain",
		"year": 2020,
		"account_price_per_month": 6.99 ,
		"mark": 4.0,
		"audience": 2200000,

},

];

db.insert(onlinemediaInitial);	
	
app.get(BASE_API_PATH+"/onlinemedia-stats/loadInitialData",(req,res)=>{
 for(var i=0;i<onlinemediaInitial.length;i++){
        onlinemedia.push(onlinemediaInitial[i]);
    }
    console.log("Loaded Initial Data");
    res.sendStatus(200);
});

//GET a la lista de recursos
app.get(BASE_API_PATH +"/onlinemedia-stats", (req,res)=>{ 
	db.find({}, (err,onlinemedia)=>{
		if(err){
			console.error("Error accediendo a la base de datos: " + err);
			res.sendStatus(500);
		}else{
			var onlinemedia_send = onlinemedia.map((newOnlineMedia)=>{
				return {online_media:newOnlineMedia.online_media,country:newOnlineMedia.country, year:newOnlineMedia.year, 			          								account_price_per_month:newOnlineMedia.account_price_per_month, mark:newOnlineMedia.mark, audience:newOnlineMedia.audience};
			});
			res.send(JSON.stringify(onlinemedia_send,null,2));
			
		}
	});
	
});

//POST a la lista de recursos
app.post(BASE_API_PATH +"/onlinemedia-stats", (req,res)=>{ 
	var newOnlineMedia = req.body;
	console.log(`new OnlineMedia to be added: <${JSON.stringify(newOnlineMedia,null,2)}>`);
	db.find({online_media:newOnlineMedia.online_media,country:newOnlineMedia.country, year:newOnlineMedia.year, account_price_per_month:newOnlineMedia.account_price_per_month, mark:newOnlineMedia.mark, audience:newOnlineMedia.audience}, (err,onlinemedia)=>{
		if(err){
			console.error("Error accediendo a la base de datos: " + err);
			res.sendStatus(500);
		}else{
			if(onlinemedia.length==0){
				db.insert(newOnlineMedia);
				res.sendStatus(201);
			}else{
				res.sendStatus(409);
			}
		}
	});
	
	
});

//GET a un recurso 
app.get(BASE_API_PATH +"/onlinemedia-stats/:online_media/:year", (req,res)=>{ 
	online_media = req.params.online_media;
    year = req.params.year;
    var newOnlineMedia = [];
    for(var i=0; i < onlinemedia.length; i++){
        if(onlinemedia[i].online_media == online_media && onlinemedia[i].year== year){
            newOnlineMedia.push(onlinemedia[i]);
        }
	}
	res.send(JSON.stringify(newOnlineMedia,null,2));
	res.sendStatus(201);
});
	
app.get(BASE_API_PATH +"/onlinemedia-stats/:x", (req,res)=>{ 
		var x = req.params.x;
		var newOnlineMedia = [];

		for(var i=0; i < onlinemedia.length; i++){
			if(onlinemedia[i].online_media == x || onlinemedia[i].country == x || onlinemedia[i].year == x || onlinemedia[i].account-price-per-month == x || 					onlinemedia[i].mark == x || onlinemedia[i].audience == x){
				newOnlineMedia.push(onlinemedia[i]);
			}
		}
		res.status(200).send(JSON.stringify(newOnlineMedia,null,2));
	});

//DELETE a un recurso
app.delete(BASE_API_PATH+"/onlinemedia-stats/:online_media/:year",(req, res)=>{
	
    online_media = req.params.online_media;
    year = parseInt(req.params.year);
    var newOnlineMedia = [];
	db.remove({$and:[{online_media:online_media}, {year:year}]},{},(err,numDelete)=>{
		if(err){
			console.error("Error accediendo a la base de datos: " + err);
			res.sendStatus(500);
		}else{
			if(numDelete==0){
				res.sendStatus(409);
			}else{
				res.sendStatus(200);
			}
		}
	});
    /*for(var i=0; i < onlinemedia.length; i++){
        if(onlinemedia[i].onlineMedia == onlineMedia && onlinemedia[i].year==year){
            newOnlineMedia = onlinemedia.splice(i, 1);
            console.log(newOnlineMedia);
        }
    }
    res.sendStatus(204);
    res.send("Deleted " +onlineMedia+" "+year);*/
    
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