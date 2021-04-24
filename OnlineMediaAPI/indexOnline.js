
var BASE_API_PATH = "/api/v1";

var  Datastore = require("nedb");



const path = require("path");
const dbFile =path.join(__dirname,"indexOnline.db");

const db = new Datastore({
					filename: dbFile, 
					autoload: true,
					autoload: true,
					autoload: true,
					autoload: true
			});


module.exports.register = (app) => {
var onlinemedia = [];



db.find();

var onlinemediaInitial = [
	{
		"online_media": "Netflix",
		"country": "France",
		"year": 2021,
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

//db.insert(onlinemediaInitial);	

app.get(BASE_API_PATH+"/onlinemedia-stats/loadInitialData", (req, res)=>{
	db.insert(onlinemediaInitial);

    res.send("Datos iniciados");
});
/*app.get(BASE_API_PATH+"/onlinemedia-stats/loadInitialData",(req,res)=>{
 for(var i=0;i<onlinemediaInitial.length;i++){
        onlinemedia.push(onlinemediaInitial[i]);
    }
    console.log("Loaded Initial Data");
    res.sendStatus(200);
});*/

//GET a la lista de recursos
app.get(BASE_API_PATH +"/onlinemedia-stats", (req,res)=>{
		var query = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;
		var i = 0;
		
        //PAGINACIÓN
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        //BUSQUEDA
		if(req.query.online_media){
			query["onlineMedia"] = req.query.online_media;
			i++;
		} 
        if(req.query.country){
			 query["country"]= req.query.country;
			i++;
		}
        if(req.query.year){
			query["year"] = parseInt(req.query.year);
			i++;
		} 
        
        if(req.query.account_price_per_month){
			query["account_price_per_month"] = parseInt(req.query.account_price_per_month);
			i++;
		} 
		
        if(req.query.mark){
			query["mark"] = parseInt(req.query.mark);
			i++;
		} 
        if(req.query.audience){
			 query["audience"] =parseInt(req.query.audience);
			i++;
		}
	

        db.find(query).sort({country:1,year:-1}).skip(offset).limit(limit).exec((err, onlinemedia) =>{

            
			if(err){
				res.sendStatus(500);
			}else{
				if(onlinemedia.length==0){
					if(i==0){
						res.send(JSON.stringify(onlinemedia,null,2));
					}else{
						console.log();
						res.sendStatus(404);
					}
				}
				else{
					onlinemedia.forEach((f)=>{
                delete f._id
            		});
					if(onlinemedia.length==1){
						res.send(JSON.stringify(onlinemedia[0],null,2));
					}
					else{
						res.send(JSON.stringify(onlinemedia,null,2));
					}		
				}
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
				if(!newOnlineMedia.online_media||!newOnlineMedia.country|| !newOnlineMedia.year||!newOnlineMedia.account_price_per_month|| 								!newOnlineMedia.mark|| !newOnlineMedia.audience){
					 res.sendStatus(400);
				}else{
				db.insert(newOnlineMedia);
				res.sendStatus(201);
				}
			}else{
				res.sendStatus(409);
			}
		}
	});
	
	
});

//GET a un recurso 
	
app.get(BASE_API_PATH+"/onlinemedia-stats/:online_media/:year", (req, res)=>{
		var online_media = req.params.online_media;
		var year = parseInt(req.params.year);
        db.find({$and:[{online_media:online_media}, {year:year}]},{ _id: 0 }, function (err, onlineGet){
			if(err){
				console.error("Error en la BBDD con GET: " + err );
				res.sendStatus(500);
			}else{
				if(onlineGet.length==0){
					res.sendStatus(404);
				}
				else{
          res.status(200).send(JSON.stringify(onlineGet[0], null, 2));
        }
			}
		
		});
    });
/*app.get(BASE_API_PATH +"/onlinemedia-stats/:online_media/:year", (req,res)=>{ 
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
});*/
	
app.get(BASE_API_PATH +"/onlinemedia-stats/:x", (req,res)=>{ 
		var x = req.params.x;
		var newOnlineMedia = [];

		for(var i=0; i < onlinemedia.length; i++){
			if(onlinemedia[i].online_media == x || onlinemedia[i].country == x || onlinemedia[i].year == x || onlinemedia[i].account-price-per-month == x || onlinemedia[i].mark == x ||                   	onlinemedia[i].audience == x){
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
	
app.put(BASE_API_PATH+"/onlinemedia-stats/:online_media/:year", function(req, res) { 
	var online_media = req.params.online_media;
    var year = parseInt(req.params.year);
	var onlineUp = req.body;
	
	db.update({ $and: [{ online_media: online_media }, { year: year }] }, { $set: onlineUp }, {}, function (err, onlinePut) {
		if (err) {
			console.error("Error en la BBDD con PUT");
			res.sendStatus(500);
        } else {
			if (onlinePut == 0) {
				console.error("No encontrado");
                res.sendStatus(404);
            } else {
				console.log("Actualizacion correcta");
                res.sendStatus(200);
            }
        }
    });
        
});

/*app.put(BASE_API_PATH+"/onlinemedia-stats/:onlineMedia/:year",(req, res)=>{
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
});*/

//POST a un recurso 
app.post(BASE_API_PATH+"/onlinemedia-stats/:country/:year", (req,res)=>{

        res.sendStatus(405);
    });

// PUT a la lista de recursos 
app.put(BASE_API_PATH+"/onlinemedia-stats",(req, res)=>{
    res.sendStatus(405);
});

//DELETE a la lista de recursos 
	
app.delete(BASE_API_PATH+"/onlinemedia-stats", (req,res)=>{
    db.remove({}, {multi:true}, (err, onlineRemove)=>{
    if (err){
        console.error("Error en la BBDD con DELETE: "+err);
    }else{
        if(onlineRemove==0){
            res.sendStatus(404);
        }else{
            res.sendStatus(200);
        }
    }
});
});
/*app.delete(BASE_API_PATH+"/onlinemedia-stats", (req,res)=>{
	
	if (onlinemedia.length == 0){
		console.log("No hay datos para borrar");
		res.sendStatus(405);
	} else {
		onlinemedia.length = 0;
		console.log("Datos borrados correctamente");
		res.sendStatus(200);
	}
});*/
};