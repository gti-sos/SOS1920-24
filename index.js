//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser"); //INCLUDING BODY-PARSER
const path = require("path");
//call to backend
//const back = require("./src/back");

<<<<<<< HEAD

<<<<<<< HEAD
//const atcAPI = require(path.join(__dirname ,"./src/back/atcAPI"));
const intcontAPI = require(path.join(__dirname, "./src/back/intcontAPI/v1"));
const intcontAPI2 = require(path.join(__dirname, "./src/back/intcontAPI/v2"));
//const univregAPI = require(path.join(__dirname, "./src/back/univregAPI"));


const port = process.env.PORT || 4444; //HTTP CONNECTION MANAGING
=======
const atcAPI = require(path.join(__dirname ,"atcAPI"));
const intcontAPI = require(path.join(__dirname, "intcontAPI"));
const univregAPI = require(path.join(__dirname, "univregAPI"));
=======
const atcAPI = require(path.join(__dirname ,"./src/back/atcAPI"));
const intcontAPI = require(path.join(__dirname, "./src/back/intcontAPI"));
const univregAPI = require(path.join(__dirname, "./src/back/univregAPI"));
>>>>>>> fc25ade... cambios 52


const port = process.env.PORT || 12345; //HTTP CONNECTION MANAGING
>>>>>>> c7df031... init

const app = express(); //CALLING EXPRESS

app.use(bodyParser.json());

app.use("/",express.static("./public")); //ROOT DIRECTORY

<<<<<<< HEAD

<<<<<<< HEAD
//atcAPI(app);
intcontAPI(app);
intcontAPI2(app);
//univregAPI(app); 
=======
=======
//back(app);
>>>>>>> fc25ade... cambios 52
atcAPI(app);
intcontAPI(app);
univregAPI(app); 
>>>>>>> c7df031... init


app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
<<<<<<< HEAD
=======



>>>>>>> c7df031... init
