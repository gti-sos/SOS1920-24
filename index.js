
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
app.get(BASE_API_URL+"/contacts", (req,res)=>{
	res.send(JSON.stringify(contacts,null,2));
});
app.post(BASE_API_URL+"/contacts",(req,res)=>{
	contacts.push(req.body);
	res.sendStatus(201,"CREATED");
} );

app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});

app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
