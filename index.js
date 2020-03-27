//SERVER MANAGING
const express = require("express"); //INCLUDING EXPRESS MODULE ON A CONST
const bodyParser = require("body-parser") //INCLUDING BODY-PARSER


const path = require("path");
const intcontAPI = require(path.join(__dirname,"intcont.db"));


const dbFileName= path.join(__dirname,"intcont.db");

const app = express(); //CALLING EXPRESS
const port = process.env.PORT || 80; //HTTP CONNECTION MANAGING

intcontAPI();
intcontAPI(app.db); //puedo importar las apis que yo quiera

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
	db.insert(intcont);
	res.send(JSON.stringify(intcont,null,2));
});

//GET INTCONT RESOURCE LIST
app.get(BASE_API_URL+"/intcont-stats", (req,res)=>{
	console.log("NEW GET .../contacts");
	db.find({}, (err, intcont)=>{
		intcont.forEach((i)=>{
			delete i._id; //borrar id
		});
		res.send(JSON.stringify(intcont,null,2));
	});
	

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


app.get("/time", (req,res)=>{
	let d = new Date();
	res.send("<html>"+d+"</html>");
});

app.listen(port, ()=>{
	console.log("Server Ready");
});

console.log("Starting server...");
