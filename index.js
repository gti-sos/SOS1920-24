//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser"); //INCLUDING BODY-PARSER
const path = require("path");
//call to backend
//const back = require("./src/back");

const atcAPI = require(path.join(__dirname ,"./src/back/atcAPI"));
const intcontAPI = require(path.join(__dirname, "./src/back/intcontAPI"));
const univregAPI = require(path.join(__dirname, "./src/back/univregAPI"));


const port = process.env.PORT || 12345; //HTTP CONNECTION MANAGING

const app = express(); //CALLING EXPRESS

app.use(bodyParser.json());
app.use("/",express.static("./public")); //ROOT DIRECTORY

//back(app);
atcAPI(app);
intcontAPI(app);
univregAPI(app); 


app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");



