const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var univregs_stats = [ ];

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