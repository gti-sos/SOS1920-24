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

const BASE_API_URL= "/api/v1"; //API BASE PATH           ESTO SE ELIMINA CUANDO TODO EL MUNDO MODULARIZE SU API


//PARTE ALVARO 
var univregs_stats = [ {
		community: "Andalucia",
		year: 2018,
		univreg_gob: 76117,
		univreg_educ: 76117,
		univreg_offer: 51384
	},
	{ 
		community: "Aragon",
		year: 2018,
		univreg_gob: 13489,
		univreg_educ: 13489,
		univreg_offer: 6536
	},
	{ 
		community: "Asturias",
		year: 2018,
		univreg_gob: 7925,
		univreg_educ: 7925,
		univreg_offer: 4934
	},
	{ 
		community: "IslasBaleares",
		year: 2018,
		univreg_gob: 5979,
		univreg_educ: 5979,
		univreg_offer: 3335
	},
	{ 
		community: "Canarias",
		year: 2018,
		univreg_gob: 16616,
		univreg_educ: 16616,
		univreg_offer: 10405
	},
	{ 
		community: "Cantabria",
		year: 2018,
		univreg_gob: 5717,
		univreg_educ: 5717,
		univreg_offer: 2547
	},
	{ 
		community: "CastillaYLeon",
		year: 2018,
		univreg_gob: 11178,
		univreg_educ: 11178,
		univreg_offer: 11178
	},
	{ 
		community: "CastillaLaMancha",
		year: 2018,
		univreg_gob: 30552,
		univreg_educ: 30552,
		univreg_offer: 5939
	},
					  { 
		community: "Catalunya",
		year: 2018,
		univreg_gob: 49969,
		univreg_educ: 49969,
		univreg_offer: 37541
	},
					  { 
		community: "ComunidadValenciana",
		year: 2018,
		univreg_gob: 34893,
		univreg_educ: 34893,
		univreg_offer: 24870
	},
					  { 
		community: "Extremadura",
		year: 2018,
		univreg_gob: 9832,
		univreg_educ: 9832,
		univreg_offer: 5350
	},
					  { 
		community: "Galicia",
		year: 2018,
		univreg_gob: 17681,
		univreg_educ: 17681,
		univreg_offer: 6536
	},
					  { 
		community: "Madrid",
		year: 2018,
		univreg_gob: 61220,
		univreg_educ: 61220,
		univreg_offer: 45602
	},
					  { 
		community: "Murcia",
		year: 2018,
		univreg_gob: 16738,
		univreg_educ: 16738,
		univreg_offer: 7929
	},
					  { 
		community: "Navarra",
		year: 2018,
		univreg_gob: 3175,
		univreg_educ: 3175,
		univreg_offer: 1720
	},
					  { 
		community: "PaisVasco",
		year: 2018,
		univreg_gob: 15542,
		univreg_educ: 15542,
		univreg_offer: 8714
	},
					  { 
		community: "LaRioja",
		year: 2018,
		univreg_gob: 2644,
		univreg_educ: 2644,
		univreg_offer: 1000
	}
 ];



// GET LoadInitialData

app.get(BASE_API_URL+"/univregs-stats/loadInitialData", (req,res) =>{
	
	var loadInitialData = [ {
		community: "Andalucia",
		year: 2018,
		univreg_gob: 76117,
		univreg_educ: 76117,
		univreg_offer: 51384
	},
	{ 
		community: "Aragon",
		year: 2018,
		univreg_gob: 13489,
		univreg_educ: 13489,
		univreg_offer: 6536
	},
	{ 
		community: "Asturias",
		year: 2018,
		univreg_gob: 7925,
		univreg_educ: 7925,
		univreg_offer: 4934
	},
	{ 
		community: "IslasBaleares",
		year: 2018,
		univreg_gob: 5979,
		univreg_educ: 5979,
		univreg_offer: 3335
	},
	{ 
		community: "Canarias",
		year: 2018,
		univreg_gob: 16616,
		univreg_educ: 16616,
		univreg_offer: 10405
	},
	{ 
		community: "Cantabria",
		year: 2018,
		univreg_gob: 5717,
		univreg_educ: 5717,
		univreg_offer: 2547
	},
	{ 
		community: "CastillaYLeon",
		year: 2018,
		univreg_gob: 11178,
		univreg_educ: 11178,
		univreg_offer: 11178
	},
	{ 
		community: "CastillaLaMancha",
		year: 2018,
		univreg_gob: 30552,
		univreg_educ: 30552,
		univreg_offer: 5939
	},
					  { 
		community: "Catalunya",
		year: 2018,
		univreg_gob: 49969,
		univreg_educ: 49969,
		univreg_offer: 37541
	},
					  { 
		community: "ComunidadValenciana",
		year: 2018,
		univreg_gob: 34893,
		univreg_educ: 34893,
		univreg_offer: 24870
	},
					  { 
		community: "Extremadura",
		year: 2018,
		univreg_gob: 9832,
		univreg_educ: 9832,
		univreg_offer: 5350
	},
					  { 
		community: "Galicia",
		year: 2018,
		univreg_gob: 17681,
		univreg_educ: 17681,
		univreg_offer: 6536
	},
					  { 
		community: "Madrid",
		year: 2018,
		univreg_gob: 61220,
		univreg_educ: 61220,
		univreg_offer: 45602
	},
					  { 
		community: "Murcia",
		year: 2018,
		univreg_gob: 16738,
		univreg_educ: 16738,
		univreg_offer: 7929
	},
					  { 
		community: "Navarra",
		year: 2018,
		univreg_gob: 3175,
		univreg_educ: 3175,
		univreg_offer: 1720
	},
					  { 
		community: "PaisVasco",
		year: 2018,
		univreg_gob: 15542,
		univreg_educ: 15542,
		univreg_offer: 8714
	},
					  { 
		community: "LaRioja",
		year: 2018,
		univreg_gob: 2644,
		univreg_educ: 2644,
		univreg_offer: 1000
	}
 ];
	univregs_stats = loadInitialData ;
	
	res.send(JSON.stringify(loadInitialData,null,2));
	console.log("Data sent:"+JSON.stringify(loadInitialData,null,2));
});

//GET COMMUNITIES

app.get(BASE_API_URL+"/univregs-stats", (req,res)=>{
	res.send(JSON.stringify(univregs_stats,null,2));
});

// POST COMMUNITIES

app.post(BASE_API_URL+"/univregs-stats",(req,res) =>{
	
	var newUnivReg_Data = req.body;
	
	for(i=0;i<newUnivReg_Data.length;i++){
		if(newUnivReg_Data.community==newUnivReg_Data[i].community){
			// primmary key is the community & year, I can have more than 1 data of each community 
			if(newUnivReg_Data.year==newUnivReg_Data[i].year){
				 break;
				//Must send error message after the break
				
				res.sendStatus(400,"BAD REQUEST(resource already exist)");
				
			 }
			
		}
	
	
	}
	if((newUnivReg_Data.community == "") || (newUnivReg_Data.community == null)){
		res.sendStatus(400,"BAD REQUEST (no name inserted)");
	
	
	}else {
		univregs_stats.push(newUnivReg_Data); 	
		res.sendStatus(201,"CREATED");
	}
});



// GET COMMUNITY/XXXX

app.get(BASE_API_URL+"/univregs-stats/:community", (req,res)=>{
	
	var community = req.params.community;
	
	var filteredCommunity = univregs_stats.filter((c) => {
		return (c.community == community);
	});
	
	
	if(filteredCommunity.length >= 1){
		res.send(filteredCommunity[0]);
	}else{
		res.sendStatus(404,"COMMUNITY NOT FOUND");
	}
});






// DELETE COMMUNITIES/XXXX

app.delete(BASE_API_URL+"/univregs-stats/:community", (req,res)=>{
	
	var community = req.params.community;
	
	var filteredCommunity = univregs_stats.filter((c) => {
		return (c.community != community);
	});
	
	
	if(filteredCommunity.length < univregs_stats.length){
		univregs_stats = filteredCommunity;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
	
});

// PUT COMMUNITIES/XXXX
app.put(BASE_API_URL+"/univregs-stats/:community", (req,res)=>{
	var community = req.params.community;
	var body = req.body;
	var newData = univregs_stats.map((i)=>{
		auxUpdate = i;
		
		if(auxUpdate.community == community){
			for (var p in body){ // UPDATING PARAMETERS
				if(!(body.community==community || body.community==null)){ //COMMUNITY UPDATED NOT ALLOWED
					res.sendStatus(405,"ITS NOT ALLOWED TO CHANGE AUTONOMOUS COMMUNITY"); 
					break;
				}
				auxUpdate[p] = body[p];	
			}
		}
		return (auxUpdate);
	});
	
	if(auxUpdate.length==0){
		res.sendStatus(404,"RESOURCE NOT FOUND");
	}else{
		univregs_stats = newData;
		res.sendStatus(200,"RESOURCE UPDATED");
	}
});


//POST COMMUNITIES/XXXX MUST FAIL!! METODO NO PERMITIDO
app.post(BASE_API_URL+"/univregs-stats/:community",(req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
} );



//PUT COMMUNITY MUST FAIL!! METODO NO PERMITIDO
app.put(BASE_API_URL+"/univregs-stats", (req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});



//DELETE COMMUNITIES MUST DELETE ALL DATA CONTAINED
app.delete(BASE_API_URL+"/univregs-stats", (req,res)=>{
	univregs_stats = [];
	res.sendStatus(200,"DELETED DATA");
});




app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");