//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser"); //INCLUDING BODY-PARSER


const intcontAPI = require(path.join(__dirname, "./src/back/intcontAPI/v1"));
const intcontAPI2 = require(path.join(__dirname, "./src/back/intcontAPI/v2"));


const port = process.env.PORT || 12345; //HTTP CONNECTION MANAGING
const atcAPIv1 = require("./src/back/atcAPI/v1");
const atcAPIv2 = require("./src/back/atcAPI/v2");

const app = express(); //CALLING EXPRESS
app.use(bodyParser.json());

atcAPIv1(app);
atcAPIv2(app);


app.use("/",express.static("./public")); //ROOT DIRECTORY


//atcAPI(app);
intcontAPI(app);
intcontAPI2(app);
//univregAPI(app); 


app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");

