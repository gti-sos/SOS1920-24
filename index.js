//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser"); //INCLUDING BODY-PARSER

//const path = require("path");

//call to backend
//const back = require("./src/back");

const atcAPIv1 = require("./src/back/atcAPI/v1");
const atcAPIv2 = require("./src/back/atcAPI/v2");

//const atcAPI = require(path.join(__dirname ,"./src/back/atcAPI"));
//const intcontAPI = require(path.join(__dirname, "./src/back/intcontAPI"));
//const univregAPI = require(path.join(__dirname, "./src/back/univregAPI"));

const app = express(); //CALLING EXPRESS
app.use(bodyParser.json());

atcAPIv1(app);
atcAPIv2(app);

const port = process.env.PORT || 12345; //HTTP CONNECTION MANAGING

app.use("/",express.static("./public")); //ROOT DIRECTORY

//back(app);
//atcAPI(app);
//intcontAPI(app);
//univregAPI(app); 


app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");