//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser") //INCLUDING BODY-PARSER
const path = require("path"); //para hacer que funcione en linux o en windows
//PARA MODULARIZAR
const atcAPI = require(path.join(__dirname ,"atcAPI"));//para usar la libreria nedb
const intcontAPI = require(path.join(__dirname, "intcontAPI"));

const port = process.env.PORT || 80; //HTTP CONNECTION MANAGING
const app = express(); //CALLING EXPRESS

//USING BODYPARSER AND DECLARING ROOT DIRECTORY
app.use(bodyParser.json());
app.use("/",express.static("./public"));

//API VICTOR para modulos separados
atcAPI(app);
//API TORA
intcontAPI(app); //puedo importar las apis que yo quiera
//API ALVARO


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");