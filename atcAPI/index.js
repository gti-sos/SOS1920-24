//creamos la funcion que despues el sistema exportara

module.exports = function(app){
	//BASE DE DATOS////////////////////////////////////////
	console.log("Registering vicpaltor API....");
	
	const dataStore = require("nedb");//para usar la libreria nedb
    const path = require("path"); //para hacer que funcione en linux o en windows
    const dbFileName = path.join(__dirname ,"contacts.db"); //constante para los datos que voy a trabajar con nedb
    const BASE_API_URL= "/api/v1"; //API BASE PATH

//creamos nuestro dataStore para guardar en el archivo contacts.db por lo cual le pasamos los siguientes parametros
    const db = new dataStore({
	    	       filename: dbFileName,
	    	       autoload: true
                });
	
	///////////////////////////////////////////////////////////////////////////
	
/**PARTE_VICTOR**/

var atc = [{
	aut_com: "Andalucia",
	year: 2018,
	espce: 757.2,
	yaq: 757,
	obu: 757
},{	
	aut_com: "Aragon",
	year: 2018,
	espce: 1403.4,
	yaq: 1403,
	obu: 1550
},{	
	aut_com: "Asturias",
	year: 2018,
	espce: 1255.8,
	yaq: 1322,
	obu: 1322
},{
	aut_com: "IslasBaleares",
	year: 2018,
	espce: 1249.2,
	yaq: 1388,
	obu: 1388
},{
	aut_com: "Canarias",
	year: 2018,
	espce: 941.4,
	yaq: 1046,
	obu: 1137
},{
	aut_com: "Cantabria",
	year: 2018,
	espce: 964.2,
	yaq: 964,
	obu: 999
},{
	aut_com: "CastillaYLeon",
	year: 2018,
	espce: 1724.4,
	yaq: 1815,
	obu: 1815
},{
	aut_com: "CastillaLaMancha",
	year: 2018,
	espce: 1132.2,
	yaq: 1132,
	obu: 1132
},{
	aut_com: "Catalunya",
	year: 2018,
	espce: 2371.8,
	yaq: 2372,
	obu: 2372
},{
	aut_com: "ComunidadValenciana",
	year: 2018,
	espce: 1269,
	yaq: 1389,
	obu: 1493
},{
	aut_com: "Extremadura",
	year: 2018,
	espce: 1110.6,
	yaq: 1111,
	obu: 1111
},{
	aut_com: "Galicia",
	year: 2018,
	espce: 835.8,
	yaq: 836,
	obu: 836
},{
	aut_com: "Madrid",
	year: 2018,
	espce: 1568.4,
	yaq: 1609,
	obu: 1693
},{
	aut_com: "Murcia",
	year: 2018,
	espce: 1006.8,
	yaq: 1007,
	obu: 1007
},{
	aut_com: "Navarra",
	year: 2018,
	espce: 1383,
	yaq: 1383,
	obu: 1352
},{
	aut_com: "PaisVasco",
	year: 2018,
	espce: 1190.4,
	yaq: 1190,
	obu: 1190
},{
	aut_com: "LaRioja",
	year: 2018,
	espce: 1410.6,
	yaq: 1411,
	obu: 1411
}];

//GET-INITIALDATA
app.get(BASE_API_URL+"/atc-stats/loadInitialData", (req,res)=>{
	//depurar en consola que es lo que a ejercutado
	console.log("New GET .../loadInitialData");
	//meter datos en contacts.db
	
	db.insert(atc);
	//res.sendStatus(200);
	
	
	atc = [{
	aut_com: "Andalucia",
	year: 2018,
	espce: 757.2,
	yaq: 757,
	obu: 757
},{	
	aut_com: "Aragon",
	year: 2018,
	espce: 1403.4,
	yaq: 1403,
	obu: 1550
},{	
	aut_com: "Asturias",
	year: 2018,
	espce: 1255.8,
	yaq: 1322,
	obu: 1322
},{
	aut_com: "IslasBaleares",
	year: 2018,
	espce: 1249.2,
	yaq: 1388,
	obu: 1388
},{
	aut_com: "Canarias",
	year: 2018,
	espce: 941.4,
	yaq: 1046,
	obu: 1137
},{
	aut_com: "Cantabria",
	year: 2018,
	espce: 964.2,
	yaq: 964,
	obu: 999
},{
	aut_com: "CastillaYLeon",
	year: 2018,
	espce: 1724.4,
	yaq: 1815,
	obu: 1815
},{
	aut_com: "CastillaLaMancha",
	year: 2018,
	espce: 1132.2,
	yaq: 1132,
	obu: 1132
},{
	aut_com: "Catalunya",
	year: 2018,
	espce: 2371.8,
	yaq: 2372,
	obu: 2372
},{
	aut_com: "ComunidadValenciana",
	year: 2018,
	espce: 1269,
	yaq: 1389,
	obu: 1493
},{
	aut_com: "Extremadura",
	year: 2018,
	espce: 1110.6,
	yaq: 1111,
	obu: 1111
},{
	aut_com: "Galicia",
	year: 2018,
	espce: 835.8,
	yaq: 836,
	obu: 836
},{
	aut_com: "Madrid",
	year: 2018,
	espce: 1568.4,
	yaq: 1609,
	obu: 1693
},{
	aut_com: "Murcia",
	year: 2018,
	espce: 1006.8,
	yaq: 1007,
	obu: 1007
},{
	aut_com: "Navarra",
	year: 2018,
	espce: 1383,
	yaq: 1383,
	obu: 1352
},{
	aut_com: "PaisVasco",
	year: 2018,
	espce: 1190.4,
	yaq: 1190,
	obu: 1190
},{
	aut_com: "LaRioja",
	year: 2018,
	espce: 1410.6,
	yaq: 1411,
	obu: 1411
}];
	
	res.send(JSON.stringify(atc,null,2));
	
});


//GET-BASEROUTE
app.get(BASE_API_URL+"/atc-stats", (req,res)=>{
	
	console.log("New GET .../contacts");
	//¿como se hacen las query?-> le pasamos un objeto y ese objeto sera un patron que deben cumplir 
	//si creo un objeto vacio {} me da todos los objetos
	db.find({}, (err,atc) => {
		//para quitar el id que te crea mongo db
		
		atc.forEach((c) => {
			delete c._id;
		});
		
		res.send(JSON.stringify(atc,null,2));
	});
	
	
});

//GET-RESOURCE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data
app.get(BASE_API_URL+"/atc-stats/:aut_com", (req,res)=>{ 
	var community = req.params.aut_com;
	
	var filteredCommunitys = atc.filter((p) => {
		return (p.aut_com == community);
	});
	
	if(filteredCommunitys.length >= 1){
		res.send(filteredCommunitys[0]);
	}else{
		res.sendStatus(404, "AUTONOMOUS COMMUNITY NOT FOUND");
	}
});

//POST-BASEROUTE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data
app.post(BASE_API_URL+"/atc-stats",(req,res) =>{
 
    var newAtc = req.body;
    if((newAtc == "") || (newAtc.aut_com == null)){  //Si está vacío o es nulo
        res.sendStatus(400, "BAD REQUEST");
    }else{
        atc.push(newAtc);
        res.sendStatus(201,"CREATED"); 
    }
});

//POST-RESOURCE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data
app.post(BASE_API_URL+"/atc-stats/:aut_com",(req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
} );


//DELETE-BASEROUTE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data

app.delete(BASE_API_URL+ "/atc-stats", (req,res) =>{
	atc = [];
	res.sendStatus(200, "atc DELETED");
});

//DELETE-RESOURCE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data

app.delete(BASE_API_URL+"/atc-stats/:aut_com", (req,res)=>{ //Para el delete podría usar un filter pero quitando el que me llega
	var aut_com = req.params.aut_com;
	
	var filteredAtc = atc.filter((c) => {
		return (c.aut_com != aut_com);
	});
	
	if(filteredAtc.length < atc.length){
		atc = filteredAtc;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"ATC NOT FOUND");
	}	
});

//PUT-RESOURCE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data

app.put(BASE_API_URL+"/atc-stats/:aut_com", (req,res)=>{
	var aut_com = req.params.aut_com;
	var body = req.body;
	
	var updatedAtcstats = atc.map((c) => {
		var updatedC = c;
		
		if (c.aut_com == aut_com) {
			for (var p in body) {
				updatedC[p] = body[p];
			}	
		}
		return (updatedC);
	});
	
	if (updatedAtcstats.length == 0) {
		res.sendStatus(404, "ATCSTAT NOT FOUND");
	} else {
		atc = updatedAtcstats;
		res.sendStatus(200, "OK");
	}
});


//PUT-BASEROUTE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data
app.put(BASE_API_URL+"/atc-stats", (req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});


	
	
	
	console.log("OK...");
	
};