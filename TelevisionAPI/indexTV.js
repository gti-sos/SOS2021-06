var BASE_API_PATH = "/api/v1";

var Datastore = require("nedb");

var db = new Datastore();


module.exports.register = (app) => {
	
//db.find();
	
var television = [];

var televisionInitial = [
	{
		"groupTV" : "Telecinco",
		"country" : "Spain",
		"year" : 2019,
		"cable_tv_broadcast_avg_audience_year" : 18200000,
		"avg_age" : 58,
		"avg_audience_month" : 2164000
	},
	{
		"groupTV" : "Antena3",
		"country" : "Spain",
		"year" : 2020,
		"cable_tv_broadcast_avg_audience_year" :  19800000,
		"avg_age" : 57,
		"avg_audience_month" : 2330000
	}
	
];
	

	
//Paginacion
	/*
app.get('/', (req, res) => {
    let offset_param = parseInt(req.query.offset);
    let limit_param = parseInt(req.query.limit);

    let offset = isNaN(offset_param) ? 0 : offset_param;
    let limit = isNaN(limit_param) ? 0 : limit_param;

    db.find(documentFromParams(req.query), {_id: 0}).skip(offset).limit(limit).exec(function (err, docs) {
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else res.json(docs);
    });
})*/

//Cargar Datos iniciales
	
app.get(BASE_API_PATH+"television-stats/loadInitialData", (req, res)=>{
	db.insert(televisionInitial);

     res.status(200).send("Loaded Initial Data");
});
/*
app.get(BASE_API_PATH+"/television-stats/loadInitialData",(req,res)=>{
 for(var i=0;i<televisionInitial.length;i++){
        television.push(televisionInitial[i]);
    }
    console.log("Loaded Initial Data");
    res.sendStatus(200);
});*/

//GET a la lista de recursos
app.get(BASE_API_PATH +"/television-stats", (req,res)=>{ 
	db.find({}, (err,television)=>{
		if(err){
			console.error("Error accessing the database: " + err);
			res.sendStatus(500);
		}else{
			var television_send = television.map((newGroupTV)=>{
				return {groupTV:newGroupTV.groupTV, country:newGroupTV.country, year:newGroupTV.year, 			          													cable_tv_broadcast_avg_audience_year:newGroupTV.cable_tv_broadcast_avg_audience_year, avg_age:newGroupTV.avg_age, 				                    avg_audience_month:newGroupTV.avg_audience_month};
			});
			res.status(200).send(JSON.stringify(television_send,null,2));
			
		}
	});
	
});

/*
app.get(BASE_API_PATH +"/television-stats", (req,res)=>{ 
	res.send(JSON.stringify(television,null,2));
});
*/
//POST a la lista de recursos
app.post(BASE_API_PATH +"/television-stats", (req,res)=>{ 
		var newGroupTV = req.body;
		console.log(`new GroupTV to be added: <${JSON.stringify(newGroupTV,null,2)}>`);
		db.find({groupTV:newGroupTV.groupTV, country:newGroupTV.country, year:newGroupTV.year, 			          													cable_tv_broadcast_avg_audience_year:newGroupTV.cable_tv_broadcast_avg_audience_year, avg_age:newGroupTV.avg_age, 				                    	avg_audience_month:newGroupTV.avg_audience_month}, (err,televisionPOST)=>{
			if(err){
				console.error("Error accessing the database: " + err);
				res.sendStatus(500);
			}else{
				if(televisionPOST.length==0){
					db.insert(newGroupTV);
					res.sendStatus(201);
				}else{
					res.sendStatus(409);
				}
			}
		});
	});

//GET a un recurso filtrado
app.get(BASE_API_PATH+"/television-stats/:groupTV/:year", (req, res)=>{
		var groupTV = req.params.groupTV;
		var year = parseInt(req.params.year);
        db.find({$and:[{groupTV:groupTV}, {year:year}]}, (err,televisionGET)=>{
			if(err){
				console.error("Error accessing the database with GET: " + err);
				res.sendStatus(500);
			}else{
				if(televisionGET.length==0){
					res.sendStatus(404);
				}
				else{
					var television_send = televisionGET.map((newGroupTV)=>{
				return {groupTV:newGroupTV.groupTV, country:newGroupTV.country, year:newGroupTV.year, 			          													cable_tv_broadcast_avg_audience_year:newGroupTV.cable_tv_broadcast_avg_audience_year, avg_age:newGroupTV.avg_age, 				                    	avg_audience_month:newGroupTV.avg_audience_month};
				});
				res.status(201).send(JSON.stringify(television_send,null,2));
				}
			}	
		});
    });
		
//GET a un recurso 
app.get(BASE_API_PATH +"/television-stats/:x", (req,res)=>{ 
	var x = req.params.x;
	db.find({ $or:[{groupTV:x, country:x, year:x, cable_tv_broadcast_avg_audience_year:x, avg_age:x, avg_audience_month:x}]}, (err,televisionGET)=>{
			if(err){
				console.error("Error accessing the database with GET: " + err);
				res.sendStatus(500);
			}else{
				if(televisionGET.length==0){
					res.sendStatus(404);
				}
				else{
					var television_send = televisionGET.map((newGroupTV)=>{
						return {groupTV:newGroupTV.groupTV, country:newGroupTV.country, year:newGroupTV.year, 			          													cable_tv_broadcast_avg_audience_year:newGroupTV.cable_tv_broadcast_avg_audience_year, avg_age:newGroupTV.avg_age, 				                    	avg_audience_month:newGroupTV.avg_audience_month};
				});
				res.status(201).send(JSON.stringify(television_send,null,2));
				}
			}	
		});
	});
//DELETE a un recurso
app.delete(BASE_API_PATH+"/television-stats/:groupTV/:year",(req, res)=>{
		var groupTV = req.params.groupTV;
		var year = parseInt(req.params.year);
		db.remove({$and:[{groupTV:groupTV}, {year:year}]},{},(err,numDelete)=>{
			if(err){
				console.error("Error accessing the database: " + err);
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

//PUT a un recurso 
app.put(BASE_API_PATH+"/television-stats/:groupTV/:year", function(req, res) { 
		var groupTV = req.params.groupTV;
		var year = parseInt(req.params.year);
		var newGroupTV = req.body;

		db.update({ $and: [{ groupTV: groupTV }, { year: year }] }, { $set: newGroupTV }, {}, function (err, televisionPut) {
			if (err) {
				console.error("Error accessing the database with PUT: " + err);
				res.sendStatus(500);
			} else {
				if (televisionPut == 0) {
					console.error("Not founded");
					res.sendStatus(404);
				} else {
					console.log("correct update");
					res.sendStatus(200);
				}
			}
		});
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
		db.remove({}, {multi:true}, (err, televisionRemove)=>{
		if (err){
			console.error("Error accessing the database with DELETE: " + err);
		}else{
			if(televisionRemove==0){
				res.sendStatus(404);
			}else{
				res.sendStatus(200);
			}
		}
		});
	});
};
