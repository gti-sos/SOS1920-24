//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser"); //INCLUDING BODY-PARSER
const path = require("path");
const cors = require("cors");


//const atcAPI = require(path.join(__dirname ,"./src/back/atcAPI"));
const atcAPIv1 = require(path.join(__dirname, "./src/back/atcAPI/v1"));
const atcAPIv2 = require(path.join(__dirname, "./src/back/atcAPI/v2"));
const intcontAPI = require(path.join(__dirname, "./src/back/intcontAPI/v1"));
const intcontAPI2 = require(path.join(__dirname, "./src/back/intcontAPI/v2"));
const univregAPI = require(path.join(__dirname, "./src/back/univregAPI/v1"));
const univregAPI2 = require(path.join(__dirname, "./src/back/univregAPI/v2"));



const port = process.env.PORT || 4444; //HTTP CONNECTION MANAGING

const app = express(); //CALLING EXPRESS

app.use(cors());
app.use(bodyParser.json());
app.use("/",express.static("./public")); //ROOT DIRECTORY


//atcAPI(app);
intcontAPI(app);
intcontAPI2(app);
univregAPI(app); 
univregAPI2(app);
atcAPIv1(app);
atcAPIv2(app);

app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
