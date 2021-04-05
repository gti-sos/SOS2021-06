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
		"country" : "Spain",
		"year" : 2020,
		"cable/tv broadcast avg-audience-year" : 18200000,
		"avg-age" : 58,
		"avg-audience-month" : 2164000
	},
	{
		"GroupTV" : "Antena3",
		"country" : "Spain",
		"year" : 2020,
		"cable/tv broadcast avg-audience-year" :  19800000,
		"avg-age" : 57,
		"avg-audience-month" : 2330000
	}
	
];
	
app.get(BASE_API_PATH +"/television", (req,res)=>{ 
	res.send(JSON.stringify(television,null,2));
});

app.post(BASE_API_PATH +"/television", (req,res)=>{ 
	var newContact = req.body;
	console.log(`new contact to be added: <${JSON.stringify(newContact,null,2)}>`);
	contact.push(newContact);
	res.sendStatus(201);
});



app.listen(PORT,()=>{
	console.log("Server ready at "+PORT);
});