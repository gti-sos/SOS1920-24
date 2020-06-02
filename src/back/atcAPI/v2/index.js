
module.exports = function(app){
		//BASE DE DATOS////////////////////////////////////////
	console.log("Registering vicpaltor API....");
	const dataStore = require("nedb");//para usar la libreria nedb
	const path = require("path"); //para hacer que funcione en linux o en windows
	const dbFileName = path.join(__dirname ,"atc.db"); //constante para los datos que voy a trabajar con nedb
	const BASE_API_URL= "/api/v2"; //API BASE PATH
	console.log("B");

												//Proxy para API Externa 1
		
	var express = require("express");
	var request = require('request');


	//API Externa 1 = https://covidtracking.com/api/v1/states/current.json
	var ApiExterna1 = 'https://covidtracking.com'; 
	var paths1 		='/api/v1/states/current.json';


		//creamos nuestro dataStore para guardar en el archivo contacts.db por lo cual le pasamos los siguientes parametros
		const db = new dataStore({
					filename: dbFileName,
					autoload: true
					});
	console.log("C");				
	//Funcion del proxy Api Externa 01
	app.use(paths1, function(req, res) {
		var url = ApiExterna1 + req.baseUrl + req.url;
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
		console.log("D");
	});

//Metemos los datos iniciales los cuales son por defecto
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
		espce: 1269.0,
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
		espce: 1383.0,
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

///////////////////////////////////////////FUNCIONES PARA EL BACK/////////////////////////////////////
	
	//GET-INITIALDATA(para pedir los datos iniciales)
	app.get(BASE_API_URL+"/atc-stats/loadInitialData", (req,res)=>{
		
		//depurar en consola que es lo que a ejercutado
		console.log("New GET .../loadInitialData");
		console.log("1");
		atc.forEach((i)=>{
				db.find({aut_com:i.aut_com, year:i.year},(err,atcFiltrado)=>{
					if(atcFiltrado.length==0) 
						db.insert(i);
					});
				});	
		//db.insert(atc);
		res.sendStatus(200);
		
		console.log("Initial Accstats loaded: "+JSON.stringify(atc, null, 2));
	});

	//GET-BASEROUTE /api/v2/atc-stats (para pedir los datos)
	app.get(BASE_API_URL+"/atc-stats", (req,res)=>{
		console.log("2");
		var q = req.query; //Registering query
		var off= parseInt(q.offset);  //extracting offset from query
		var l= parseInt(q.limit);  //extracting limit from query
		
		
		//BUSQUEDA
		var community = (q.community==undefined)?null:q.community;
		
		var simpleYear = isNaN(parseInt(q.year))?null:parseInt(q.year);
		
		var fromYear = isNaN(parseInt(q.fromYear))?2000:parseInt(q.fromYear);
		var toYear	= isNaN(parseInt(q.toYear))?2040:parseInt(q.toYear);
		
		var fromEspce = isNaN(parseFloat(q.fromEspce))?0:parseFloat(q.fromEspce);
		var toEspce = isNaN(parseFloat(q.toEspce))?100000:parseFloat(q.toEspce);
		
		var fromYaq = isNaN(parseInt(q.fromYaq))?0:parseInt(q.fromYaq);
		var toYaq = isNaN(parseInt(q.toYaq))?100000:parseInt(q.toYaq);
		
		var fromObu = isNaN(parseInt(q.fromObu))?0.0:parseInt(q.fromObu);
		var toObu = isNaN(parseInt(q.toObu))?2000000.0:parseInt(q.toObu);
		
		delete q.offset; //cleaning fields
		delete q.limit;

		//console.log(" "+community+" "+simpleYear+" "+fromYear+" "+toYear+" "+fromEspce+" "+toEspce+" "+fromYaq+" "+toYaq+" "+fromObu+" "+toObu+"");
		
		if(simpleYear!=null){
			console.log("Es un año normal");
			console.log("2.1");
			db.find({year:simpleYear, espce:{$gte:fromEspce, $lte:toEspce}, yaq:{$gte:fromYaq, $lte:toYaq},
					 obu:{$gte:fromObu, $lte:toObu}}).sort({aut_com:1}).skip(off).limit(l).exec((err, atc)=>{
				
				if(community!=null){
					var filteredByCommunity = atc.filter((c)=>{
						return (c.aut_com == community);
					});
					
					atc=filteredByCommunity;
				}
				
				atc.forEach((i)=>{
					delete i._id; //borrar id
				});
				
				if(atc.length==0){
					res.sendStatus(404, "COLLECTION OR ELEMENT NOT FOUND");
				}else{
					res.send(JSON.stringify(atc,null,2));
				}	
			});
			
			
		}else if (simpleYear == null){
			console.log("2.2");
			console.log("Pide todos los recursos");
			
			db.find({year:{$gte:fromYear, $lte:toYear}
				  ,espce:{$gte:fromEspce, $lte:toEspce}
				  ,yaq:{$gte:fromYaq, $lte:toYaq}
				  ,obu:{$gte:fromObu, $lte:toObu}})
				  .sort({aut_com:1}).limit(l).skip(off).exec((err, atc)=>{
				
				if(community!=null)
				{
					console.log("Tiene comunidad");
					var filteredByCommunity = atc.filter((c)=>{
						return (c.aut_com == community);
					});
					
					atc=filteredByCommunity;
				}
				
				atc.forEach((i)=>{
					delete i._id; //borrar id
				});
				
				if(atc.length==0)
				{
					res.sendStatus(404, "COLLECTION OR ELEMENT NOT FOUND");
				}else{
					res.send(JSON.stringify(atc,null,2));
				}	
			});		
		}else{
			console.log("2.3");
			db.find({}).sort({aut_com:1}).skip(off).limit(l).exec((err,atc)=>{
				if(community!=null){
					var filteredByCommunity = atc.filter((c)=>{
						return (c.aut_com == community);
					});
					atc=filteredByCommunity;
				}
				if(simpleYear!=null){
					var filteredByYear = atc.filter((c)=>{
						return (c.year == simpleYear);
					});
					atc=filteredByYear;
				}
				if(atc.length==0){
					res.sendStatus(404, "COLLECTION OR ELEMENT NOT FOUND");
				}else{

					res.send(JSON.stringify(atc,null,2));
				}

			});

		}
		console.log("2.4");
	});

	//GET-RESOURCE_AUT_COM_AND_YEAR (para pedir un recurso en expecifico por su comunidad y año)
	app.get(BASE_API_URL+"/atc-stats/:aut_com/:year", (req,res)=>{
		console.log("3");
		console.log("New GET .../aut_com y año");
		var params = req.params;
		var aut_com = params.aut_com;
		var yearProvided = parseInt(params.year);
		
		db.find({aut_com:aut_com, year:yearProvided}, (err,atc)=>{
			if(atc.length==0){
				res.sendStatus(404, "RESOURCE NOT FOUND");
			}else{
				delete atc[0]._id;
				res.send(JSON.stringify(atc[0],null,2));
			}
			});
		});

	//GET-RESOURCE (para pedir o buscar por cualquier parametro)
		app.get(BASE_API_URL+"/atc-stats/:paramProvided", (req,res)=>{
			console.log("4");
			console.log("New GET .../por cualquier parametro");
			var params = req.params;
			var paramProvided = params.paramProvided;
			
			var q = req.query; 
			var off= parseInt(q.offset);  //extracting offset from query
			var l= parseInt(q.limit);  //extracting limit from query
		
			delete q.offset; 
			delete q.limit;
			
	//comprobamos que sea un año que sea valido se puede hasta el año 2040
			if(parseInt(paramProvided)%2000<=40){
				
				db.find({year:parseInt(paramProvided)}).sort({aut_com:1, year:1}).skip(off).limit(l).exec((err,atc)=>{
				
					if(atc.length==0){
						res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND");
					}else{
						atc.forEach((i)=>{
							delete i._id; //borrar id
						});
						res.send(JSON.stringify(atc,null,2));/////////////////////////////CAMBIAR
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

	//POST-BASEROUTE (queremos crear un recurso pero cumpliendo que::
						//No permita ningun recurso con NULL
						//No permite comunidad vacia ya que la comunidad es la primary key)
						//Solo permite años entre 2000 y 2040
	app.post(BASE_API_URL+"/atc-stats",(req,res)=>{
		console.log("5");
		console.log("New POST .../atc-stats");

		var newAtc = {
			aut_com: req.body.aut_com,
			year:  parseInt(req.body.year),
			espce: parseFloat(req.body.espce),
			yaq:   parseInt(req.body.yaq),
			obu:   parseInt(req.body.obu)
			
		};
		
		var communityProvided = newAtc.aut_com;
		var yearProvided = newAtc.year;
	///////////////////////////////poner restricciones aqui o 
		if((communityProvided=="") || (communityProvided==null)	|| yearProvided==null
		   || newAtc.espce==null || newAtc.yaq==null || newAtc.obu==null){
			
			res.sendStatus(400,"BAD REQUEST(No totally DATA provided)");
		}else if(!(yearProvided>=2000 && yearProvided<=2040)){

			res.sendStatus(400,"BAD REQUEST(No totally DATA provided)");
		}
		else{
			console.log("5.1");
			db.find({aut_com:communityProvided, year:yearProvided}, (err,doc)=>{
				if(doc.length<=0){
					console.log("5.2");
					db.insert(newAtc);
					res.sendStatus(201,"CREATED");
				}else{
					console.log("5.3");
					res.sendStatus(409,"BAD REQUEST(RESOURCE ALREADY EXIST)");
				}
			});
		}
	});

	//POST-RESOURCE_AUT_COM_AND_YEAR (Se debe cumplir la tabla)
	app.post(BASE_API_URL +"/atc-stats/:aut_com/:year", (req,res)=>{
		console.log("6");
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});
	
	//POST-RESOURCE (Se debe cumplir la tabla)
	app.post(BASE_API_URL+"/atc-stats/:aut_com",(req,res)=>{
		console.log("7");
		res.sendStatus(405,"METHOD NOT ALLOWED");
	} );
	

	//PUT-BASEROUTE (No se puede modificar todo los parametros) (Se debe cumplir la tabla)
	app.put(BASE_API_URL+"/atc-stats", (req,res)=>{
		console.log("8");
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});	
	
	//PUT-RESOURCE_AUT_COM_AND_YEAR (quremos modificar un recurso pero si que:
								// la comunidad este vacio o el año)                                             
	app.put(BASE_API_URL+"/atc-stats/:aut_com/:year", (req,res)=>{
		console.log("9");
		console.log("New PUT .../aut_comYaño");
		var params = req.params;
		var body = req.body;
		var communityProvided = params.aut_com;
		var yearProvided = parseInt(params.year);
	
	if(!(body.aut_com == communityProvided || body.aut_com == null) || !(body.year == yearProvided || body.year == null)){
		console.log("9.1");
	    res.sendStatus(400, "Bad request");
		
	   }else{
		console.log("9.2");
		db.update({aut_com:communityProvided, 
				   year:yearProvided},
			 	  {$set: {
						espce:body.espce, 
						yaq:body.yaq, 
						obu:body.obu}},{},(err,numUpdated)=>{
									if(numUpdated==0){
											res.sendStatus(404, "RESOURCE NOT FOUND");
									}else{
											res.sendStatus(200, "RESOURCE UPDATED");	
										}
			
	            });
		    }
		
	});
	
	//PUT-RESOURCE_AUT_COM (se debe cumplir la tabla)
	app.put(BASE_API_URL +"/atc-stats/:aut_com", (req,res)=>{
		console.log("10");
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});	
	
	//DELETE-BASEROUTE (eliminamos todos los recursos)
	app.delete(BASE_API_URL+"/atc-stats", (req,res)=>{
		console.log("11");
		console.log("New Delete .../BaseRoute");
		
		db.remove({},{multi: true}, (err, numRemoved)=>{
			if(numRemoved==0){
				res.sendStatus(404, "RESOURCE NOT FOUND FOR REMOVE");
			}else{
				res.sendStatus(200, "DELETED RESOURCE");
			}
		});
		
	});
	
	//DELETE-RESOURCE_AUT_COM_AND_YEAR (eliminamos un recurso es especifico indicandole la comunidad y el año)
	app.delete(BASE_API_URL+"/atc-stats/:aut_com/:year", (req,res)=>{
		console.log("12");
		console.log("New DELETE .../aut_comYAño");
		var params = req.params;
		var communityProvided = params.aut_com;
		var yearProvided = parseInt(params.year);
		
		db.remove({aut_com:communityProvided, year: yearProvided},{},(err,numRemoved)=>{
			if(numRemoved==0){
				res.sendStatus(404, "RESOURCE NOT FOUND FOR REMOVE");
			}else{
				res.sendStatus(200, "DELETED RESOURCE");
			}
		});
	
	});
	
	//DELETE-RESOURCE (eliminamos un recurso indicandole cualquier parametro que queramos) 
	//comprobamos que es una comunidad para que no metan cosas aleatorias
	app.delete(BASE_API_URL+"/atc-stats/:paramProvided", (req,res)=>{
		console.log("13");
		console.log("New DELETE .../cualquierParametro");
		var params = req.params;
		var paramProvided = params.paramProvided;
		if(isNaN(paramProvided)){
			//DELETING BY YEAR PROVIDED
			db.remove({aut_com:paramProvided},{multi:true},(err,numRemoved)=>{//puesto el multi :true
				if(numRemoved==0){
					res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND FOR DELETE");
				}else{
					res.sendStatus(200, "COLLECTION DELETED");
				}
			});
			
		}else{
			//DELETING BY AUTONOMOUS COMMUNITY PROVIDED
			db.remove({year:parseInt(paramProvided)},{multi:true},(err,numRemoved)=>{
				if(numRemoved==0){
					res.sendStatus(404, "COLLECTION NOT FOUND FOR DELETING");
				}else{
					res.sendStatus(200, "COLLECTION DELETED");
				}
			});
		}
	});	

	console.log("BACK OK...");
	
};
console.log("A");