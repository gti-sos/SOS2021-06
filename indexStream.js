var BASE_API_PATH = "/api/v1";

module.exports.register = (app) => {
	var streaming = [];


	var streamingInitial = [
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
		}
	];
	
	//5,2

	app.get(BASE_API_PATH +"/streaming-stats/loadInitialData",(req,res)=>{ 
		//res.send(JSON.stringify(streaming,null,2));
		for (var i=0;i <streamingInitial.length;i++){
			streaming.push(streamingInitial[i]);
		}
		console.log('Datos cargados correctamente')
		return res.sendStatus(200).json(streaming);
	});
	//6.1
	app.get(BASE_API_PATH +"/streaming-stats", (req,res)=>{ 
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
	app.get(BASE_API_PATH +"/streaming-stats/:platform/:year", (req,res)=>{ 
		var plataforma = req.params.platform;
		var ano = req.params.year;
		var newStat = [];

		for(var i=0; i < streaming.length; i++){
			if(streaming[i].platform == plataforma && streaming[i].year== ano){
				newStat.push(streaming[i]);
			}
		}
		res.send(JSON.stringify(newStat,null,2));
		res.sendStatus(201);
	});

	//6.4
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

	app.delete(BASE_API_PATH+"/streaming-stats/:platform/:year", (req,res)=>{
		var platform = req.params.platform;
		var ano = req.params.year;
		for (var i=0; i < streaming.length; i++){
			if(streaming[i].platform == platform && streaming[i].year == ano){
				streaming.splice(i,1);
				res.send("Deleted " +platform+" "+ano);
				return res.sendStatus(204);
			}
		}
		return res.sendStatus(404);
	});

	//6.5
	app.put(BASE_API_PATH+"/streaming-stats/:platform/:year",(req, res)=>{
		platform = req.params.platform;
		year = req.params.year;

		for(var i=0; i<streaming.length; i++){
			if(streaming[i].platform==platform && streaming[i].year==year){
				streaming[i]=req.body;
			}
		}
		res.send("Updated "+platform+" "+year);
		res.sendStatus(200);
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
}