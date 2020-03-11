
const express = require("express");
var app = express();

var port = process.env.PORT || 80;


app.use("/",express.static("./public"));

app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});

app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
