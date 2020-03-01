
const express = require("express");
var app = express();

app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});
app.listen(3343)
console.log("Server Ready");
