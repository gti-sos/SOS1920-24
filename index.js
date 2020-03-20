
const express = require("express");
var app = express();
const bodyParser = require("body-parser")

var port = process.env.PORT || 80;

app.use(bodyParser.json());

app.use("/",express.static("./public"));
var contacts = [{
	name: "peter",
	phone: 123456
},
{name: "peter2",
	phone: 1234567
}];

const BASE_API_URL= "/api/v1";
//GET CONTACTS
app.get(BASE_API_URL+"/contacts", (req,res)=>{
	res.send(JSON.stringify(contacts,null,2));
});
//POST CONTACTS
app.post(BASE_API_URL+"/contacts",(req,res)=>{
	var newContact=req.body;
	if((newContact=="") || (newContact.name==null)){
		res.sendStatus(400,"BAD REQUIEST(no name provided)");
		
	}else{
		contacts.push(newContact);
		res.sendStatus(201,"CREATED");
	}
} );

//DELETE CONTACTS
app.delete(BASE_API_URL+"/contacts", (req,res)=>{
	res.sendStatus(400,"DELETED req CONTACT");
});

//GET CONTACT/XXX //DONE
app.get(BASE_API_URL+"/contacts/:name", (req,res)=>{
	var name = req.params.name;
	var filteredContacts = contacts.filter((c)=>{
		return (c.name == name);
	});
	if(filteredContacts.length>=1){
		res.send(filteredContacts[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND")
	}
});

//POST CONTACT/XXX
app.post(BASE_API_URL+"/contacts/:name",(req,res)=>{
	var newContact=req.body;
	if((newContact=="") || (newContact.name==null)){
		res.sendStatus(400,"BAD REQUIEST(no name provided)");
		
	}else{
		contacts.push(newContact);
		res.sendStatus(201,"CREATED");
	}
} );

//PUT CONTACT/XXX
app.put(BASE_API_URL+"/contacts/:name", (req,res)=>{
	var name = req.params.name;
	res.send(JSON.stringify(name,null,2));
});

//DELETE CONTACT/XXX

app.get(BASE_API_URL+"/contacts/:name", (req,res)=>{
	var name = req.params.name;
	var filteredContacts = contacts.filter((c)=>{
		return (c.name != name);
	});
	if(filteredContacts.length < contacts.length){
		res.sendStatus(200,"CONTACT DELETED");
		contacts = filteredContacts;
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND FOR DELETE");
	}
	
});





app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});

app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
