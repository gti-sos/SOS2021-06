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
		}
	];
	
	
	//Carga de datos inicial
	app.get(BASE_API_PATH+"/streaming-stats/loadInitialData", (req, res)=>{
	db.insert(streamingInitial);

    res.status(200).send("Datos iniciados");
	});

	//GET A la lista de recursos
	app.get(BASE_API_PATH +"/streaming-stats", (req,res)=>{ 
		db.find({}, (err,streaming)=>{
			if(err){
				console.error("Error accediendo a la base de datos: " + err);
				res.sendStatus(500);
			}else{
				var streaming_send = streaming.map((newStreaming)=>{
					return {platform:newStreaming.platform,country:newStreaming.country, year:newStreaming.year, hour_viewed:newStreaming.hour_viewed, avg_age:newStreaming.avg_age, avg_audience:newStreaming.avg_audience};
				});
				res.status(200).send(JSON.stringify(streaming_send,null,2));

			}
		});
	});
	//POST A la lista de recursos
	app.post(BASE_API_PATH +"/streaming-stats", (req,res)=>{ 
		var newStreaming = req.body;
		console.log(`new Streaming to be added: <${JSON.stringify(newStreaming,null,2)}>`);
		db.find({platform:newStreaming.platform,country:newStreaming.country, year:newStreaming.year, hour_viewed:newStreaming.hour_viewed, avg_age:newStreaming.avg_age, avg_audience:newStreaming.avg_audience}, (err,streaming)=>{
			if(err){
				console.error("Error accediendo a la base de datos: " + err);
				res.sendStatus(500);
			}else{
				if(streaming.length==0){
					db.insert(newStreaming);
					res.sendStatus(201);
				}else{
					res.sendStatus(409);
				}
			}
		});
	});
	

	//GET A un recurso
	app.get(BASE_API_PATH+"/streaming-stats/:platform/:year", (req, res)=>{
		var plataforma = req.params.platform;
		var ano = parseInt(req.params.year);
        db.find({$and:[{platform:plataforma}, {year:ano}]}, (err,streamGet)=>{
			if(err){
				console.error("Error al acceder a la BBDD con GET");
				res.sendStatus(500);
			}else{
				if(streamGet.length==0){
					res.sendStatus(404);
				}
				else{
					var stream_send = streamGet.map((newStreaming)=>{
				return {platform:newStreaming.platform,country:newStreaming.country, year:newStreaming.year, hour_viewed:newStreaming.hour_viewed, avg_age:newStreaming.avg_age, avg_audience:newStreaming.avg_audience};
				});
				res.status(201).send(JSON.stringify(stream_send,null,2));
				}
			}	
		});
    });
	
	//GET A cualquier recurso
	app.get(BASE_API_PATH +"/streaming-stats/:x", (req,res)=>{ 
		var x = req.params.x;
		db.find({ $or: [{ platform: x}, { year: x}, { country: x}, { hour_viewed: x}, { avg_age: x}, { avg_audience: x}]}, (err,streamGet)=>{
			if(err){
				console.error("Error al acceder a la BBDD con GET");
				res.sendStatus(500);
			}else{
				if(streamGet.length==0){
					res.sendStatus(404);
				}
				else{
					var stream_send = streamGet.map((newStreaming)=>{
						return {platform:newStreaming.platform,country:newStreaming.country, year:newStreaming.year, hour_viewed:newStreaming.hour_viewed, avg_age:newStreaming.avg_age, avg_audience:newStreaming.avg_audience};
				});
				res.status(201).send(JSON.stringify(stream_send,null,2));
				}
			}	
		});
		/*
		for(var i=0; i < streaming.length; i++){
			if(streaming[i].platform == x || streaming[i].country == x || streaming[i].year == x || streaming[i].hour_viewed == x || streaming[i].avg_age == x || streaming[i].avg_audience == x){
				newStat.push(streaming[i]);
			}
		}
		res.status(200).send(JSON.stringify(newStat,null,2));*/
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
	app.put(BASE_API_PATH+"/onlinemedia-stats/:platform/:year", function(req, res) { 
		var plataforma = req.params.platform;
		var ano = parseInt(req.params.year);
		var streamUp = req.body;

		db.update({ $and: [{ platform: plataforma }, { year: ano }] }, { $set: streamUp }, {}, function (err, streamPut) {
			if (err) {
				console.error("Error en la BBDD con PUT");
				res.sendStatus(500);
			} else {
				if (streamPut == 0) {
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