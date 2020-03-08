
const express = require("express");
var app = express();

var port = process.env.PORT || 3005;


app.use("/",express.static("./public"));

app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});

app.listen(3005, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
