
const express = require("express");
var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;


app.use("/",express.static("./public"));

var contacts = [
	{name: "peter",
	 phone: 12345
	},
	{name: "pablo",
	 phone:789456}
];

const BASE_API_URL = "/api/v1" ;

app.get (BASE_API_URL+"/contacts", (req,res)=>{
	res.send(JSON.stringify(contacts,null,2));
});
app.post (BASE_API_URL+"/contacts", (req,res)=>{
	contacts.push(req.body);
	res.sendStatus(201,"CREATED");
});


app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});

app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
