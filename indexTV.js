var BASE_API_PATH = "/api/v1";

module.exports.register = (app) => {
var television = [];

var televisionInitial = [
	{
		"groupTV" : "Telecinco",
		"country" : "Spain",
		"year" : 2019,
		"cable_tv_broadcast_avg-audience_year" : 18200000,
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
})

app.get(BASE_API_PATH+"/television-stats/loadInitialData",(req,res)=>{
 for(var i=0;i<televisionInitial.length;i++){
        television.push(televisionInitial[i]);
    }
    console.log("Loaded Initial Data");
    res.sendStatus(200);
});

//GET a la lista de recursos
app.get(BASE_API_PATH +"/television-stats", (req,res)=>{ 
	res.send(JSON.stringify(television,null,2));
});

//POST a la lista de recursos
app.post(BASE_API_PATH +"/television-stats", (req,res)=>{ 
	var newGroupTV = req.body;
	console.log(`new GroupTV to be added: <${JSON.stringify(newGroupTV,null,2)}>`);
	television.push(newGroupTV);
	res.sendStatus(201);
});

//GET a un recurso 
app.get(BASE_API_PATH +"/television-stats/:groupTV/:year", (req,res)=>{ 
	groupTV = req.params.groupTV;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i < television.length; i++){
        if(television[i].groupTV == groupTV && television[i].year== year){
            newGroupTV.push(television[i]);
        }
	}
	res.send(JSON.stringify(newGroupTV,null,2));
	res.sendStatus(200);
});
		
//GET a un recurso 
app.get(BASE_API_PATH +"/television-stats/:x", (req,res)=>{ 
		var x = req.params.x;
		var newGroupTV = [];
		for(var i=0; i < television.length; i++){
			if(television[i].GroupTV == x || television[i].country == x || television[i].year == x || television[i].cable_tv_broadcas_avg_audience_year == x || television[i].avg_age == x || television[i].avg_audience_month == x){
				newGroupTV.push(television[i]);
			}
		}
		res.status(200).send(JSON.stringify(newGroupTV,null,2));
	});

//DELETE a un recurso
app.delete(BASE_API_PATH+"/television-stats/:groupTV/:year",(req, res)=>{
    groupTV = req.params.groupTV;
    year = req.params.year;
    var newGroupTV = [];
    for(var i=0; i < television.length; i++){
        if(television[i].groupTV == groupTV && television[i].year==year){
            newGroupTV = television.splice(i, 1);
            console.log(newGroupTV);
        }
    }
    res.sendStatus(200);
    res.send("Deleted " +groupTV+" "+year);
    
});

//PUT a un recurso 
app.put(BASE_API_PATH+"/television-stats/:groupTV/:year",(req, res)=>{
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
app.post(BASE_API_PATH+"/television-stats/:groupTV/:year",(req, res)=>{
    res.sendStatus(405);
});

// PUT a la lista de recursos 
app.put(BASE_API_PATH+"/television-stats",(req, res)=>{
    res.sendStatus(405);
});

//DELETE a la lista de recursos 
app.delete(BASE_API_PATH+"/television-stats", (req,res)=>{
    if (television.length == 0){
        console.log("Nothing to delete");
        res.sendStatus(405);
    } else {
        television.length = 0;
        console.log("Deleted data");
        res.sendStatus(200);
    }
});
};
