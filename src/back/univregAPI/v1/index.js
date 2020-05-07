module.exports = function(app){
	console.log("Charging Module");
	const dataStore= require("nedb");
	const path = require("path");
	const dbFileName= path.join(__dirname, "univregs.db");
	const BASE_API_URL= "/api/v1"; //API BASE PATH
	const db = new dataStore({
				filename: dbFileName,
				autoload: true
	});
	
	
	/*RESOURCE
	-----------------------------------------------
	 univregs = registros universitarios, tanto oferta como demanda  
	{community, YEAR, univregs_gob, univregs_educ, univregs_offer}
	-----------------------------------------------
	*/

	//---------------------------------------------------------------------------
	
	var univregs = [ {
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
	
	db.remove({}, {multi:true});
	db.insert(univregs);

	//GET univregs_stats/LOADINITIALDATA
	app.get(BASE_API_URL+"/univregs-stats/loadInitialData", (req,res) =>{
		univregs.forEach((i)=>{
			db.find({community:i.community, year:i.year},(err,doc)=>{
				if(doc.length==0) db.insert(i);
				});
			});	
		res.sendStatus(200);
	});

	//GET univregs RESOURCE LIST
	app.get(BASE_API_URL+"/univregs-stats", (req,res)=>{
		
		var q = req.query; //Registering query
		var off= parseInt(q.offset);  //extracting offset from query
		var l= parseInt(q.limit);  //extracting limit from query
		
		//Custom Searchs lo que se mete por la URL
		var community = (q.community==undefined)?null:q.community;
		var simpleYear = isNaN(parseInt(q.year))?null:parseInt(q.year);
		var fromYear = isNaN(parseInt(q.fromYear))?2000:parseInt(q.fromYear);
		var toYear	= isNaN(parseInt(q.toYear))?2040:parseInt(q.toYear);
		var fromGob = isNaN(parseInt(q.fromGob))?0:parseInt(q.fromGob);
		var toGob = isNaN(parseInt(q.toGob))?100000:parseInt(q.toGob);
		var fromEduc = isNaN(parseInt(q.fromEduc))?0:parseInt(q.fromEduc);
		var toEduc = isNaN(parseInt(q.toEduc))?100000:parseInt(q.toEduc);
		var fromOffer = isNaN(parseInt(q.fromOffer))?0.0:parseInt(q.fromOffer);
		var toOffer= isNaN(parseInt(q.toOffer))?2000000.0:parseInt(q.toOffer);
		
		
		//Number.MAX_SAFE_INTEGER
		
		delete q.offset; //cleaning fields
		delete q.limit;
	
		console.log("NEW GET .../univregs");
		console.log(" "+community+" "+simpleYear+" "+fromYear+" "+toYear+" "+fromGob+" "+toGob+" "+fromEduc+" "+toEduc+" "+fromOffer+" "+toOffer+"");
		//db.find({}, (err,univregs){
		//})
	
		if(simpleYear!=null){
			db.find({year:simpleYear, univreg_gob:{$gte:fromGob, $lte:toGob}, univreg_educ:{$gte:fromEduc, $lte:toEduc},
				univreg_offer:{$gte:fromOffer, $lte:toOffer}}).sort({community:1}).skip(off).limit(l).exec((err, univregs)=>{
				if(community!=null){
					var filteredByCommunity = univregs.filter((c)=>{
						return (c.community == community);
					});
					univregs=filteredByCommunity;
				}
				univregs.forEach((i)=>{
					delete i._id; //borrar id
				});
				if(univregs.length==0){
					res.sendStatus(404, "COLLECTION OR ELEMENT NOT FOUND");
				}else{
					res.send(JSON.stringify(univregs,null,2));
				}	
			});
			
		}else if(simpleYear==null){
			console.log("Este es un rango")
			db.find({year:{$gte:fromYear, $lte:toYear}, 
					 univreg_gob:{$gte:fromGob, $lte:toGob}, 
					 univreg_educ:{$gte:fromEduc, $lte:toEduc},
					 univreg_offer:{$gte:fromOffer, $lte:toOffer}})
				.sort({community:1}).skip(off).limit(l).exec((err, univregs)=>{
				
				
				if(community!=null){
					var filteredByCommunity = univregs.filter((c)=>{
						return (c.community == community);
					});
					univregs=filteredByCommunity;
				}
				univregs.forEach((i)=>{
					delete i._id; //borrar id
				});
				if(univregs.length==0){
					res.sendStatus(404, "COLLECTION OR ELEMENT NOT FOUND");
				}else{
					res.send(JSON.stringify(univregs,null,2));
				}	
			});		
		}else{
			db.find({}).sort({community:1}).skip(off).limit(l).exec((err,univregs)=>{
				if(community!=null){
					var filteredByCommunity = univregs.filter((c)=>{
						return (c.community == community);
					});
					univregs=filteredByCommunity;
				}
				if(simpleYear!=null){
					var filteredByYear = univregs.filter((c)=>{
						return (c.year == simpleYear);
					});
					univregs=filteredByYear;
				}

				if(univregs.length==0){
					res.sendStatus(404,"COLLECTION OR ELEMENT NOT FOUND");
				}else{
					res.send(JSON.stringify(univregs,null,2));
				}
			});
		}
	});
	
	//GET A RESOURCE
	app.get(BASE_API_URL+"/univregs-stats/:community/:year", (req,res)=>{
		var params = req.params;
		var communityProvided = params.community;
		var yearProvided = parseInt(params.year);
		db.find({community:communityProvided,year:yearProvided}, (err,univregs)=>{
			if(univregs.length==0){
				res.sendStatus(404, "RESOURCE NOT FOUND");
			}else{
				delete univregs[0]._id;
				res.send(JSON.stringify(univregs[0],null,2));
			}
			});
		});
		
	//GET COLLECTION OF RESOURCES BY A PARAM
	app.get(BASE_API_URL+"/univregs-stats/:paramProvided", (req,res)=>{
		var params = req.params;
		var paramProvided = params.paramProvided;
		var q = req.query; //Registering query
		var off= parseInt(q.offset);  //extracting offset from query
		var l= parseInt(q.limit);  //extracting limit from query
		delete q.offset; //cleaning fields
		delete q.limit;
		
		//GETTING BY YEAR IN RANGE FROM 2000 TO 2040 && ITS AN INTEGER AND CORRECT YEAR
		if(parseInt(paramProvided)%2000<=40){
			db.find({year:parseInt(paramProvided)}).sort({community:1, year:1}).skip(off).limit(l).exec((err,univregs)=>{
				if(univregs.length==0){
					res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND");
				}else{
					univregs.forEach((i)=>{
						delete i._id; //borrar id
					});
					res.send(JSON.stringify(univregs,null,2));
				}
			});
		}else{
			//GETTING BY AUTONOMOUS COMMUNITY
			db.find({community:paramProvided}).sort({community:1}).skip(off).limit(l).exec((err,univregs)=>{
				if(univregs.length==0){
					res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND");
				}else{
					univregs.forEach((i)=>{
						delete i._id; //borrar id
					});
					res.send(JSON.stringify(univregs,null,2));
				}
			});
		}
	});
	
	//POST VS RESOURCE LIST
	app.post(BASE_API_URL+"/univregs-stats",(req,res)=>{
		var newUnivregs = { 
			community: req.body.community,
			year: parseInt(req.body.year),
			univreg_gob: parseInt(req.body.univreg_gob),
			univreg_educ: parseInt(req.body.univreg_educ),
			univreg_offer: parseInt(req.body.univreg_offer)
		}
		var communityProvided = newUnivregs.community;
		var yearProvided = newUnivregs.year;
	
		if((communityProvided=="") || (communityProvided==null)	|| yearProvided==null
		   || newUnivregs.univreg_gob==null || newUnivregs.univreg_educ==null || newUnivregs.univreg_offer==null){
			
			res.sendStatus(400,"BAD REQUEST(No totally DATA provided)");
			console.log("Any of fields are not provided");
		}else{
		
			db.find({community:communityProvided, year:yearProvided}, (err,univregs)=>{
				if(univregs.length<=0){
					db.insert(newUnivregs);
					res.sendStatus(201,"CREATED");
				}else{
					res.sendStatus(400,"BAD REQUEST(RESOURCE ALREADY EXIST)");
				}
			});
		}
	});
	
	//POST VS A RESOURCE /NOT ALLOWED
	app.post(BASE_API_URL+"/univregs-stats/:community/:year",(req,res)=>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	
	app.post(BASE_API_URL+"/univregs-stats/:community",(req,res)=>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	
	//PUT RESOURCE LIST /NOT ALLOWED
	app.put(BASE_API_URL+"/univregs-stats", (req,res)=>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	
	//PUT RESOURCE
	app.put(BASE_API_URL+"/univregs-stats/:community/:year", (req,res)=>{
		var params = req.params;
		var body = req.body;
		var communityProvided = params.community;
		var yearProvided = parseInt(params.year);
		
		if(!(body.community == communityProvided || body.community == null) ||
		   !(body.year == yearProvided || body.year == null)){
			res.sendStatus(400, "Bad Request | Community or Year in Body is not Equal to Request");
		}else{
	
			db.update({community:communityProvided, year:yearProvided}, {$set: {univreg_gob:body.univreg_gob,
				univreg_educ:body.univreg_educ, univreg_offer:body.univreg_offer}},
				{},(err,numUpdated)=>{
					if(numUpdated==0){
						res.sendStatus(404, "RESOURCE NOT FOUND");
					}else{
						res.sendStatus(200, "RESOURCE UPDATED");	
					}
			
				});
		}
	});
	
	//PUT RESOURCE NO COMPLETE ID
	app.put(BASE_API_URL+"/univregs-stats/:community", (req,res)=>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});

	//DELETE RESOURCE LIST
	app.delete(BASE_API_URL+"/univregs-stats", (req,res)=>{
		db.remove({},{multi: true}, (err, numRemoved)=>{
			if(numRemoved==0){
				res.sendStatus(404, "RESOURCE NOT FOUND FOR REMOVE");
			}else{
				res.sendStatus(200, "DELETED RESOURCE");
			}
		});
	});

	//DELETE A RESOURCE
	app.delete(BASE_API_URL+"/univregs-stats/:community/:year", (req,res)=>{
		var params = req.params;
		var communityProvided = params.community;
		var yearProvided = params.year;
		
		db.remove({community:communityProvided, year: yearProvided},{},(err,numRemoved)=>{
			if(numRemoved==0){
				res.sendStatus(404, "RESOURCE NOT FOUND FOR REMOVE");
			}else{
				res.sendStatus(200, "DELETED RESOURCE");
			}
		});
	});
	
	//DELETE BY A PARAM
	
	app.delete(BASE_API_URL+"/univregs-stats/:paramProvided", (req,res)=>{
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
			db.remove({community:paramProvided},{},(err,numRemoved)=>{
				if(numRemoved==0){
					res.sendStatus(404, "COLLECTION OR RESOURCE NOT FOUND FOR DELETE");
				}else{
					res.sendStatus(200, "COLLECTION DELETED");
				}
			});
		}
	});

	app.get("/time", (req,res)=>{
		let d = new Date();
		res.send("<html>"+d+"</html>");
	});
};