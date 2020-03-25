//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser") //INCLUDING BODY-PARSER
const BASE_API_URL= "/api/v1"; //API BASE PATH

var app = express(); //CALLING EXPRESS
var port = process.env.PORT || 80; //HTTP CONNECTION MANAGING

//USING BODYPARSER AND DECLARING ROOT DIRECTORY
app.use(bodyParser.json());
app.use("/",express.static("./public"));

/*RESOURCE
-----------------------------------------------
 INTCONT = INTERNSHIPCONTRACT-RESOURCE  
{AUTONOMOUS-COMMUNITY, YEAR, INTCONT-CCOO, INTCONT-SEPE, PUBLIC-WASTE-UNIVERSITY-EDUCATION}
-----------------------------------------------
*/
var intcont = [{
	aut_com: "Andalucia",
	year: 2018,
	ccoo: 16096,
	sepe: 10099,
	gobesp: 234815.3
},{	
	aut_com: "Aragon",
	year: 2018,
	ccoo: 2146,
	sepe: 2146,
	gobesp: 21522.5
},{	
	aut_com: "Asturias",
	year: 2018,
	ccoo: 3219,
	sepe: 1220,
	gobesp: 14998.2
},{
	aut_com: "IslasBaleares",
	year: 2018,
	ccoo: 1073,
	sepe: 3956,
	gobesp: 6724.9
},{
	aut_com: "Canarias",
	year: 2018,
	ccoo: 4292,
	sepe: 4002,
	gobesp: 44862.9
},{
	aut_com: "Cantabria",
	year: 2018,
	ccoo: 1074,
	sepe: 720,
	gobesp: 8019.2
},{
	aut_com: "CastillaYLeon",
	year: 2018,
	ccoo: 4293,
	sepe: 3096,
	gobesp: 63102.0
},{
	aut_com: "CastillaLaMancha",
	year: 2018,
	ccoo: 3219,
	sepe: 2539,
	gobesp: 25369.4
},{
	aut_com: "Catalunya",
	year: 2018,
	ccoo: 16058,
	sepe: 12987,
	gobesp: 120108.8
},{
	aut_com: "ComunidadValenciana",
	year: 2018,
	ccoo: 11804,
	sepe: 7987,
	gobesp: 139594.3
},{
	aut_com: "Extremadura",
	year: 2018,
	ccoo: 2161,
	sepe: 973,
	gobesp: 28095.4
},{
	aut_com: "Galicia",
	year: 2018,
	ccoo: 6438,
	sepe: 3433,
	gobesp: 54186.1
},{
	aut_com: "Madrid",
	year: 2018,
	ccoo: 22535,
	sepe: 10832,
	gobesp: 155453.0
},{
	aut_com: "Murcia",
	year: 2018,
	ccoo: 3222,
	sepe: 2905,
	gobesp: 37834.6
},{
	aut_com: "Navarra",
	year: 2018,
	ccoo: 2151,
	sepe: 771,
	gobesp: 9503.5
},{
	aut_com: "PaisVasco",
	year: 2018,
	ccoo: 7511,
	sepe: 2319,
	gobesp: 29557.9
},{
	aut_com: "LaRioja",
	year: 2018,
	ccoo: 1071,
	sepe: 449,
	gobesp: 4653.0
}];

//---------------------------------------------------------------------------

//GET INTCONT/LOADINITIALDATA
app.get(BASE_API_URL+"/intcont-stats/loadInitialData", (req,res) =>{
	intcont = [{
	aut_com: "Andalucia",
	year: 2018,
	ccoo: 16096,
	sepe: 10099,
	gobesp: 234815.3
},{	
	aut_com: "Aragon",
	year: 2018,
	ccoo: 2146,
	sepe: 2146,
	gobesp: 21522.5
},{	
	aut_com: "Asturias",
	year: 2018,
	ccoo: 3219,
	sepe: 1220,
	gobesp: 14998.2
},{
	aut_com: "IslasBaleares",
	year: 2018,
	ccoo: 1073,
	sepe: 3956,
	gobesp: 6724.9
},{
	aut_com: "Canarias",
	year: 2018,
	ccoo: 4292,
	sepe: 4002,
	gobesp: 44862.9
},{
	aut_com: "Cantabria",
	year: 2018,
	ccoo: 1074,
	sepe: 720,
	gobesp: 8019.2
},{
	aut_com: "CastillaYLeon",
	year: 2018,
	ccoo: 4293,
	sepe: 3096,
	gobesp: 63102.0
},{
	aut_com: "CastillaLaMancha",
	year: 2018,
	ccoo: 3219,
	sepe: 2539,
	gobesp: 25369.4
},{
	aut_com: "Catalunya",
	year: 2018,
	ccoo: 16058,
	sepe: 12987,
	gobesp: 120108.8
},{
	aut_com: "ComunidadValenciana",
	year: 2018,
	ccoo: 11804,
	sepe: 7987,
	gobesp: 139594.3
},{
	aut_com: "Extremadura",
	year: 2018,
	ccoo: 2161,
	sepe: 973,
	gobesp: 28095.4
},{
	aut_com: "Galicia",
	year: 2018,
	ccoo: 6438,
	sepe: 3433,
	gobesp: 54186.1
},{
	aut_com: "Madrid",
	year: 2018,
	ccoo: 22535,
	sepe: 10832,
	gobesp: 155453.0
},{
	aut_com: "Murcia",
	year: 2018,
	ccoo: 3222,
	sepe: 2905,
	gobesp: 37834.6
},{
	aut_com: "Navarra",
	year: 2018,
	ccoo: 2151,
	sepe: 771,
	gobesp: 9503.5
},{
	aut_com: "PaisVasco",
	year: 2018,
	ccoo: 7511,
	sepe: 2319,
	gobesp: 29557.9
},{
	aut_com: "LaRioja",
	year: 2018,
	ccoo: 1071,
	sepe: 449,
	gobesp: 4653.0
}];
	res.send(JSON.stringify(intcont,null,2));
});

//GET INTCONT RESOURCE LIST
app.get(BASE_API_URL+"/intcont-stats", (req,res)=>{
	res.send(JSON.stringify(intcont,null,2));
});

//POST VS RESOURCE LIST
app.post(BASE_API_URL+"/intcont-stats",(req,res)=>{
	var newIntcont=req.body;
	var existContact = false;
	for(i in intcont){
		if(newIntcont.aut_com==intcont[i].aut_com){
			existContact = true;
			break;
		}
	}
	if((newIntcont.aut_com=="") || (newIntcont.aut_com==null)){
		res.sendStatus(400,"BAD REQUEST(no community provided)");
	}else if(existContact){
		res.sendStatus(400,"BAD REQUEST(resource already exist)");
	}else{
		intcont.push(newIntcont);
		res.sendStatus(201,"CREATED");
	}
});

//PUT RESOURCE LIST /NOT ALLOWED
app.put(BASE_API_URL+"/intcont-stats", (req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});

//DELETE RESOURCE LIST
app.delete(BASE_API_URL+"/intcont-stats", (req,res)=>{
	intcont = [];
	res.sendStatus(200,"DELETED req CONTACT");
});

//GET A RESOURCE
app.get(BASE_API_URL+"/intcont-stats/:aut_com", (req,res)=>{
	var community = req.params.aut_com;
	var filteredCommunitys = intcont.filter((i)=>{
		return (i.aut_com == community);
	});
	if(filteredCommunitys.length>=1){
		res.send(filteredCommunitys[0]);
	}else{
		res.sendStatus(404,"AUTONOMOUS COMMUNITY NOT FOUND");
	}
});

//POST VS A RESOURCE /NOT ALLOWED
app.post(BASE_API_URL+"/intcont-stats/:aut_com",(req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
} );

//PUT RESOURCE
app.put(BASE_API_URL+"/intcont-stats/:aut_com", (req,res)=>{
	var community = req.params.aut_com;
	var body = req.body;
	var updatedData = intcont.map((i)=>{
		auxUpdate = i;
		
		if(auxUpdate.aut_com == community){
			for (var p in body){ // UPDATING PARAMETERS
				if(!(body.aut_com==community || body.aut_com==null)){ //COMMUNITY UPDATED NOT ALLOWED
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
		intcont = updatedData;
		res.sendStatus(200,"RESOURCE UPDATED");
	}
});

//DELETE A RESOURCE
app.delete(BASE_API_URL+"/intcont-stats/:aut_com", (req,res)=>{
	var community = req.params.aut_com;
	var filteredCommunitys = intcont.filter((i)=>{
		return (i.aut_com != community);
	});
	if(filteredCommunitys.length < intcont.length){
		intcont = filteredCommunitys;
		res.sendStatus(200,""+community+" DELETED");
	}else{
		res.sendStatus(404,"AUTONOMOUS COMMUNITY NOT FOUND FOR DELETE");
	}
	
});

/*RESOURCE
-----------------------------------------------
 INTCONT = INTERNSHIPCONTRACT-RESOURCE  
{AUTONOMOUS-COMMUNITY, YEAR, INTCONT-CCOO, INTCONT-SEPE, PUBLIC-WASTE-UNIVERSITY-EDUCATION}
-----------------------------------------------
*/

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
	res.send(JSON.stringify(atc,null,2));
});

//POST-BASEROUTE
app.post(BASE_API_URL+"/atc-stats",(req,res) =>{
 
    var newAtc = req.body;
    if((newAtc == "") || (newAtc.aut_com == null)){  //Si está vacío o es nulo
        res.sendStatus(400, "BAD REQUEST");
    }else{
        atc.push(newAtc);
        res.sendStatus(201,"CREATED"); 
    }
});

//GET-RESOURCE

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

//DELETE-RESOURCE

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


//PUT AUTONOMOUS COMMUNITYS
app.put(BASE_API_URL+"/atc-stats", (req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});


//DELETE-BASEROUTE

app.delete(BASE_API_URL+ "/atc-stats", (req,res) =>{
	atc = ["DELETE"];
	res.sendStatus(200, "atc DELETED");
});





app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});

app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
