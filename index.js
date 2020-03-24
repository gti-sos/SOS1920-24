const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var univregs_stats = [ {
		community: "Andalucia",
		year: 2018,
		univreg_gob: 76117,
		univreg_educ: 76117,
		univreg_offer: 51384
	},
	{ 
		community: "Aragon",
		year: 2018,
		univreg_gob: 13489,
		univreg_educ: 13489,
		univreg_offer: 6536
	},
	{ 
		community: "Asturias",
		year: 2018,
		univreg_gob: 7925,
		univreg_educ: 7925,
		univreg_offer: 4934
	},
	{ 
		community: "IslasBaleares",
		year: 2018,
		univreg_gob: 5979,
		univreg_educ: 5979,
		univreg_offer: 3335
	},
	{ 
		community: "Canarias",
		year: 2018,
		univreg_gob: 16616,
		univreg_educ: 16616,
		univreg_offer: 10405
	},
	{ 
		community: "Cantabria",
		year: 2018,
		univreg_gob: 5717,
		univreg_educ: 5717,
		univreg_offer: 2547
	},
	{ 
		community: "CastillaYLeon",
		year: 2018,
		univreg_gob: 11178,
		univreg_educ: 11178,
		univreg_offer: 11178
	},
	{ 
		community: "CastillaLaMancha",
		year: 2018,
		univreg_gob: 30552,
		univreg_educ: 30552,
		univreg_offer: 5939
	},
					  { 
		community: "Catalunya",
		year: 2018,
		univreg_gob: 49969,
		univreg_educ: 49969,
		univreg_offer: 37541
	},
					  { 
		community: "ComunidadValenciana",
		year: 2018,
		univreg_gob: 34893,
		univreg_educ: 34893,
		univreg_offer: 24870
	},
					  { 
		community: "Extremadura",
		year: 2018,
		univreg_gob: 9832,
		univreg_educ: 9832,
		univreg_offer: 5350
	},
					  { 
		community: "Galicia",
		year: 2018,
		univreg_gob: 17681,
		univreg_educ: 17681,
		univreg_offer: 6536
	},
					  { 
		community: "Madrid",
		year: 2018,
		univreg_gob: 61220,
		univreg_educ: 61220,
		univreg_offer: 45602
	},
					  { 
		community: "Murcia",
		year: 2018,
		univreg_gob: 16738,
		univreg_educ: 16738,
		univreg_offer: 7929
	},
					  { 
		community: "Navarra",
		year: 2018,
		univreg_gob: 3175,
		univreg_educ: 3175,
		univreg_offer: 1720
	},
					  { 
		community: "PaisVasco",
		year: 2018,
		univreg_gob: 15542,
		univreg_educ: 15542,
		univreg_offer: 8714
	},
					  { 
		community: "LaRioja",
		year: 2018,
		univreg_gob: 2644,
		univreg_educ: 2644,
		univreg_offer: 1000
	},
 ];

//URL datos Alvaro
const BASE_API_URL = "/api/v1/univregs-stats";

// GET LoadInitialData

app.get(BASE_API_URL+"/loadInitialData", (req,res) =>{
	
	var ejemplos_univregs = [ { 
		community: "Andalucia",
		year: 2018,
		univreg_gob: 76117,
		univreg_educ: 76117,
		univreg_offer: 51384
	},
	{ 
		community: "Aragon",
		year: 2018,
		univreg_gob: 13489,
		univreg_educ: 13489,
		univreg_offer: 6536
	}
 ];
	univregs_stats = univregs_stats ;
	
	res.send(JSON.stringify(loadInitialData,null,2));
	console.log("Data sent:"+JSON.stringify(loadInitialData,null,2));
});


// POST CONTACTS

app.post(BASE_API_URL+"/contacts",(req,res) =>{
	
	var newContact = req.body;
	
	if((newContact == "") || (newContact.name == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		contacts.push(newContact); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE CONTACTS

// GET CONTACT/XXX

app.get(BASE_API_URL+"/contacts/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name == name);
	});
	
	
	if(filteredContacts.length >= 1){
		res.send(filteredContacts[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

// PUT CONTACT/XXX

// DELETE CONTACT/XXX

app.delete(BASE_API_URL+"/contacts/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name != name);
	});
	
	
	if(filteredContacts.length < contacts.length){
		contacts = filteredContacts;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
	
});


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");