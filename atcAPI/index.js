//creamos la funcion que despues el sistema exportara

module.exports = function(app){
	//BASE DE DATOS////////////////////////////////////////
	console.log("Registering vicpaltor API....");
	
	const dataStore = require("nedb");//para usar la libreria nedb
    const path = require("path"); //para hacer que funcione en linux o en windows
    const dbFileName = path.join(__dirname ,"atc.db"); //constante para los datos que voy a trabajar con nedb
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
	res.sendStatus(200);///////////////////////////////////////////funciona??
	                                            //res.send(JSON.stringify(atc,null,2));
	console.log("Initial Internship Contracts loaded:" + JSON.stringify(atc,null,2));
	
});


//GET-BASEROUTE
/**app.get(BASE_API_URL+"/atc-stats", (req,res)=>{
	
	console.log("New GET .../contacts");
	//¿como se hacen las query?-> le pasamos un objeto y ese objeto sera un patron que deben cumplir 
	//si creo un objeto vacio {} me da todos los objetos

	db.find({}).sort().skip().limit().exec( (err,atc) => {
		//para quitar el id que te crea mongo db
		
		atc.forEach((c) => {
			delete c._id;
		});
		res.send(JSON.stringify(atc,null,2));
		
	});
});
**/
	app.get(BASE_API_URL+"/atc-stats", (req,res)=>{
	
		var q = req.query; //Registering query
		var off= q.offset;  //extracting offset from query
		var l= q.limit;  //extracting limit from query
	
		delete q.offset; //cleaning fields
		delete q.limit;
	
		console.log("NEW GET .../atc");
		db.find({}).sort({aut_com:1}).skip(off).limit(l).exec((err, atc)=>{
			if(atc.length==0){
				res.sendStatus(404, "COLLECTION NOT FOUND");
			}else{
				atc.forEach((i)=>{
					delete i._id; //borrar id
				});
				res.send(JSON.stringify(atc,null,2));
			}
		});
	});
	
////////////////////////////////////////////////////////////////////	
	
//GET-RESOURCE
	/**
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
});**/
	//GET para buscar por cualquier parametro
	app.get(BASE_API_URL+"/atc-stats/:paramProvided", (req,res)=>{
		var params = req.params;
		var paramProvided = params.paramProvided;
		
		var q = req.query; //Registering query
		var off= q.offset;  //extracting offset from query
		var l= q.limit;  //extracting limit from query
	
		delete q.offset; //cleaning fields
		delete q.limit;
		
		//GETTING BY YEAR IN RANGE FROM 2000 TO 2040 && ITS AN INTEGER AND CORRECT YEAR
		if(parseInt(paramProvided)%2000<=40){
			
			db.find({year:parseInt(paramProvided)}).sort({aut_com:1, year:1}).skip(off).limit(l).exec((err,atc)=>{
				if(atc.length==0){
					res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND");
				}else{
					atc.forEach((i)=>{
						delete i._id; //borrar id
					});
					res.send(JSON.stringify(atc,null,2));
				}
			});
		}else{
			//GETTING BY AUTONOMOUS COMMUNITY
			db.find({aut_com:paramProvided}).sort({aut_com:1}).skip(off).limit(l).exec((err,atc)=>{
				if(atc.length==0){
					res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND");
				}else{
					atc.forEach((i)=>{
						delete i._id; //borrar id
					});
					res.send(JSON.stringify(atc,null,2));
				}
			});
		}
	});
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
//GET-RESOURCE_AUT_COM_AND_YEAR
	/**
	app.get(BASE_API_URL +"/atc-stats/:aut_com/:year", (req,res)=>{ 
	var aut_com = req.params.aut_com;
	var year = req.params.year;
	
	var filteredAtcstats = atc.filter((p) => {
		return (p.aut_com == aut_com && p.year == year);
	});
	
	if(filteredAtcstats.length >= 1){
		res.send(filteredAtcstats[0]); //me da el primer elemento del array
	}else{
		res.sendStatus(404, "ATCSTAT NOT FOUND");
	}
});
	**/
	//GET A RESOURCE
	app.get(BASE_API_URL+"/atc-stats/:aut_com/:year", (req,res)=>{
		var params = req.params;
		var aut_com = params.aut_com;
		var yearProvided = parseInt(params.year);
		db.find({aut_com:aut_com,year:yearProvided}, (err,atc)=>{
			if(atc.length==0){
				res.sendStatus(404, "RESOURCE NOT FOUND");
			}else{
				delete atc[0]._id;
				res.send(JSON.stringify(atc[0],null,2));
			}
			});
		});
///////////////////////////////////////////////////////////////////////////////

//POST-BASEROUTE
/**
	app.post(BASE_API_URL+"/atc-stats",(req,res) =>{
 
    var newAtc = req.body;
    if((newAtc == "") || (newAtc.aut_com == null)){  //Si está vacío o es nulo
        res.sendStatus(400, "BAD REQUEST");
    }else{
        atc.push(newAtc);
        res.sendStatus(201,"CREATED"); 
    }
});**/
	//POST VS RESOURCE LIST
	app.post(BASE_API_URL+"/atc-stats",(req,res)=>{
		var newAtc = req.body;
		var communityProvided = newAtc.aut_com;
		var yearProvided = newAtc.year;
	
		if((communityProvided=="") || (communityProvided==null)	|| yearProvided==null
		   || newAtc.espce==null || newAtc.yaq==null || newAtc.obu==null){
			
			res.sendStatus(400,"BAD REQUEST(No totally DATA provided)");
			console.log("Any of fields are not provided");
		}else{
		
			db.find({aut_com:communityProvided, year:yearProvided}, (err,atc)=>{
				if(atc.length<=0){
					db.insert(newAtc);
					res.sendStatus(201,"CREATED");
				}else{
					res.sendStatus(400,"BAD REQUEST(RESOURCE ALREADY EXIST)");
				}
			});
		}
	});
	
///////////////////////////////////////////////////////////////////
	
//POST-RESOURCE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data
app.post(BASE_API_URL+"/atc-stats/:aut_com",(req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
} );

//////POST-RESOURCE_AUT_COM_AND_YEAR
app.post(BASE_API_URL +"/atc-stats/:aut_com/:year", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

////////////////////////////////////////////////////////////////////////////////////////	
	
//DELETE-BASEROUTE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data
/**
app.delete(BASE_API_URL+ "/atc-stats", (req,res) =>{
	console.log("New DELETE .../RESOURCE");
	atc = [];
	res.sendStatus(200, "atc DELETED");
});
**/
	
	app.delete(BASE_API_URL+"/atc-stats", (req,res)=>{
		db.remove({},{multi: true}, (err, numRemoved)=>{
			if(numRemoved==0){
				res.sendStatus(404, "RESOURCE NOT FOUND FOR REMOVE");
			}else{
				res.sendStatus(200, "DELETED RESOURCE");
			}
		});
		
	});
	
//////////////////////////////////////////////////////////////////////////////////////	

//DELETE-RESOURCE
/**
app.delete(BASE_API_URL+"/atc-stats/:aut_com", (req,res)=>{ //Para el delete podría usar un filter pero quitando el que me llega
		console.log("New DELETE .../aut_com");
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
	**/
	
	app.delete(BASE_API_URL+"/atc-stats/:paramProvided", (req,res)=>{
		var params = req.params;
		var paramProvided = params.paramProvided;
		if(parseInt(paramProvided)%2000<=40){
			//DELETING BY YEAR PROVIDED
			db.remove({year:parseInt(paramProvided)},{multi:true},(err,numRemoved)=>{
				if(numRemoved==0){
					res.sendStatus(404, "COLLECTION NOT FOUND FOR DELETING");
				}else{
					res.sendStatus(200, "COLLECTION DELETED");
				}
			});
		}else{
			//DELETING BY AUTONOMOUS COMMUNITY PROVIDED
			db.remove({aut_com:paramProvided},{multi:true},(err,numRemoved)=>{//puesto el multi :true
				if(numRemoved==0){
					res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND FOR DELETE");
				}else{
					res.sendStatus(200, "COLLECTION DELETED");
				}
			});
		}
	});
	
///////////////////////////////////////////////////////////////////////

//DELETE-RESOURCE_AUT_COM_AND_YEAR
	/**

app.delete(BASE_API_URL +"/atc-stats/:aut_com/:year", (req,res)=>{ //Para el delete podría usar un filter pero quitando el que me llega
	var aut_com = req.params.aut_com;
	var year = req.params.year;
	
	var filteredAtcstats = atc.filter((c) => {
		return (c.aut_com != aut_com || c.year != year);
	});
	
	
	if(filteredAtcstats.length < atc.length){
		atc = filteredAtcstats;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"ATCSTAT NOT FOUND");
	}	
});
	
	**/
	app.delete(BASE_API_URL+"/atc-stats/:aut_com/:year", (req,res)=>{
		var params = req.params;
		var communityProvided = params.aut_com;
		var yearProvided = params.year;
		
		db.remove({aut_com:communityProvided, year: yearProvided},{},(err,numRemoved)=>{
			if(numRemoved==0){
				res.sendStatus(404, "RESOURCE NOT FOUND FOR REMOVE");
			}else{
				res.sendStatus(200, "DELETED RESOURCE");
			}
		});
	
	});
	
///////////////////////////////////////////////////////////////////////////	
	
//PUT-RESOURCE_AUT_COM_AND_YEAR
/**
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
	
	**/
	////////////////////////////////////////////////////////////////////////////¿NO ENTIENDO POR QUE HACEMOS UN PUT Y LUEGO ABAJO LE DECIMOS QUE NO?
	app.put(BASE_API_URL+"/atc-stats/:aut_com/:year", (req,res)=>{
		var params = req.params;
		var body = req.body;
		var communityProvided = params.aut_com;
		var yearProvided = parseInt(params.year);
	
		db.update({aut_com:communityProvided, year:yearProvided}, {$set: {espce:body.espce, yaq:body.yaq, obu:body.obu}},
			  	{},(err,numUpdated)=>{
			if(numUpdated==0){
				res.sendStatus(404, "RESOURCE NOT FOUND");
			}else{
				res.sendStatus(200, "RESOURCE UPDATED");	
			}
		
	});
	});
	
/////////////////////////////////////////////////////////////////////////////


//PUT-BASEROUTE
//TODO hacer lo mismo que explica en el ejercicio con el inicial data
app.put(BASE_API_URL+"/atc-stats", (req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});

/////////////////////////////////////////////////////////////////

//PUT-RESOURCE_AUT_COM
	
app.put(BASE_API_URL +"/atc-stats/:aut_com", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});
	
	console.log("OK...");
	
};