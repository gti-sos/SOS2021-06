var BASE_API_PATH = "/api/v1";

var  Datastore = require("nedb");

var db = new Datastore();

module.exports.register = (app) => {
	var streaming = [];


	var streamingInitial = [
		{
			"platform" : "Twitch",
			"country" : "Spain",
			"year" : 2020,
			"hour_viewed" : 18410000000,
			"avg_age" : 21,
			"avg_audience" : 2500000
		},
		{
			"platform" : "Twitch",
			"country" : "Spain",
			"year" : 2019,
			"hour_viewed" : 11000000000,
			"avg_age" : 21,
			"avg_audience" : 1200000
		},
		{
			"platform" : "YouTube",
			"country" : "Spain",
			"year" : 2020,
			"hour_viewed" : 61900000000,
			"avg_age" : 30,
			"avg_audience" : 871000
		},
		{
			"platform" : "YouTube",
			"country" : "Spain",
			"year" : 2019,
			"hour_viewed" : 31900000000,
			"avg_age" : 30,
			"avg_audience" : 443256
		},
		{
			"platform" : "Facebook",
			"country" : "Spain",
			"year" : 2020,
			"hour_viewed" : 31000000000,
			"avg_age" : 26,
			"avg_audience" : 408000
		},
		{
			"platform" : "Facebook",
			"country" : "Spain",
			"year" : 2019,
			"hour_viewed" : 1090000000,
			"avg_age" : 26,
			"avg_audience" : 136000
		}
	];
	
	
	//Carga de datos inicial
	app.get(BASE_API_PATH+"/streaming-stats/loadInitialData", (req, res)=>{
	db.insert(streamingInitial);

    res.status(200).send("Datos iniciados");
	});

	//GET A la lista de recursos
	app.get(BASE_API_PATH +"/streaming-stats", (req,res)=>{
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
		if(req.query.platform){
			query["platform"] = req.query.platform;
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
        
        if(req.query.hour_viewed){
			query["hour_viewed"] = parseInt(req.query.hour_viewed);
			i++;
		} 
		
        if(req.query.avg_age){
			query["avg_age"] = parseInt(req.query.avg_age);
			i++;
		} 
        if(req.query.avg_audience){
			 query["avg_audience"] =parseInt(req.query.avg_audience);
			i++;
		}
	

        db.find(query).sort({country:1,year:-1}).skip(offset).limit(limit).exec((err, streaming) =>{

            
			if(err){
				res.sendStatus(500);
			}else{
				if(streaming.length==0){
					if(i==0){
						res.send(JSON.stringify(streaming,null,2));
					}else{
						console.log();
						res.sendStatus(404);
					}
				}
				else{
					streaming.forEach((f)=>{
                delete f._id
            		});
					if(streaming.length==1){
						res.status(200).send(JSON.stringify(streaming[0],null,2));
					}
					else{
						res.status(200).send(JSON.stringify(streaming,null,2));
					}		
				}
			}
        });
    });
	//POST A la lista de recursos
	app.post(BASE_API_PATH +"/streaming-stats", (req,res)=>{ 
	var newStreaming = req.body;
	console.log(`new Stream to be added: <${JSON.stringify(newStreaming,null,2)}>`);
	db.find({platform:newStreaming.platform,country:newStreaming.country, year:newStreaming.year, hour_viewed:newStreaming.hour_viewed, avg_age:newStreaming.avg_age, avg_audience:newStreaming.avg_audience}, (err,streaming)=>{
		if(err){
			console.error("Error accediendo a la base de datos: " + err);
			res.sendStatus(500);
		}else{
			if(streaming.length==0){
				if (Object.keys(newStreaming).length != 6){
                    console.log("Error entering data");
                    return res.sendStatus(400);
                } else{
					db.insert(newStreaming);
					res.sendStatus(201);
				}
			}else{
				res.sendStatus(409);
			}
		}
	});
});

	

	//GET A un recurso
	app.get(BASE_API_PATH+"/streaming-stats/:platform/:year",(req, res)=>{
		var plataforma = req.params.platform;
		var ano = parseInt(req.params.year);
        db.find({$and:[{platform:plataforma}, {year:ano}]},{ _id: 0 }, function (err, streamGet){
			if(err){
				console.error("Error accessing the database with GET: " + err );
				res.sendStatus(500);
			}else{
				if(streamGet.length==0){
					res.sendStatus(404);
				}
				else{
          res.status(200).send(JSON.stringify(streamGet[0], null, 2));
        }
			}
		
		});
    });
	
	//DELETE A un recurso
	app.delete(BASE_API_PATH+"/streaming-stats/:platform/:year",(req, res)=>{
		var plataforma = req.params.platform;
		var ano = parseInt(req.params.year);
		db.remove({$and:[{platform:plataforma}, {year:ano}]},{},(err,numDelete)=>{
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
	});

	//PUT A un recurso
	app.put(BASE_API_PATH+"/streaming-stats/:platform/:year", function(req, res) { 
		var platform = req.params.platform;
		var year = parseInt(req.params.year);
		var streamUp = req.body;

		db.update({ $and: [{ platform: platform }, { year: year }] }, { $set: streamUp }, {}, function (err, streamPUT) {
			if (err) {
				console.error("Error en la BBDD con PUT");
				res.sendStatus(500);
			} else {
				if (streamPUT == 0) {
					console.error("No encontrado");
					res.sendStatus(404);
				} else {
					console.log("Actualizacion correcta");
					res.sendStatus(200);
				}
			}
		});
	});
	//6.6

	app.post(BASE_API_PATH+"/streaming-stats/:platform/:year", (req, res) => {
		console.log("Metodo no permitido");
		res.sendStatus(405);
	});

	//6.7
	app.put(BASE_API_PATH + "/streaming-stats", (req,res)=>{
		console.log("Metodo no permitido");
		res.sendStatus(405);
	});

	//DELETE A la lista de recursos
	app.delete(BASE_API_PATH+"/streaming-stats", (req,res)=>{
		db.remove({}, {multi:true}, (err, streamRemove)=>{
		if (err){
			console.error("Error en la BBDD con DELETE: "+err);
		}else{
			if(streamRemove==0){
				res.sendStatus(404);
			}else{
				res.sendStatus(200);
			}
		}
		});
	});
};