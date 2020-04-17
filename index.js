//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser"); //INCLUDING BODY-PARSER
const path = require("path");


const atcAPI = require(path.join(__dirname ,"atcAPI"));
const intcontAPI = require(path.join(__dirname, "intcontAPI"));
const univregAPI = require(path.join(__dirname, "univregAPI"));


const port = process.env.PORT || 12345; //HTTP CONNECTION MANAGING

const app = express(); //CALLING EXPRESS

app.use(bodyParser.json());
app.use("/",express.static("./public")); //ROOT DIRECTORY


atcAPI(app);
intcontAPI(app);
univregAPI(app); 


app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");



