//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser"); //INCLUDING BODY-PARSER
const path = require("path");

const univregAPI = require(path.join(__dirname, "univregAPI"));

const port = process.env.PORT || 80; //HTTP CONNECTION MANAGING

const app = express(); //CALLING EXPRESS

app.use(bodyParser.json());
app.use("/",express.static("./public")); //ROOT DIRECTORY

univregAPI(app); //puedo importar las apis que yo quiera

app.listen(port, ()=>{
	console.log("Server Ready");
});
console.log("Starting server...");