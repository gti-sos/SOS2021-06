var BASE_API_PATH = "/api/v1";

module.exports.register = (app) => {
var television = [];

var televisionInitial = [
	{
		"groupTV" : "Telecinco",
		"country" : "Spain",
		"year" : 2019,
		"cable/tv broadcast avg-audience-year" : 18200000,
		"avg-age" : 58,
		"avg-audience-month" : 2164000
	},
	{
		"groupTV" : "Antena3",
		"country" : "Spain",
		"year" : 2020,
		"cable/tv broadcast avg-audience-year" :  19800000,
		"avg-age" : 57,
		"avg-audience-month" : 2330000
	}
	
];

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
	res.sendStatus(201);
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
    res.sendStatus(204);
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
