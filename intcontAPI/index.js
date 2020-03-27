module.exports = function(app){
	console.log("modulo cargado");
	const dataStore= require("nedb");
	const dbFileName= path.join(__dirname,"intcont.db");
	const db = new dataStore({
				filename: dbFileName,
				autoload: true});
	
	
	
	
	const BASE_API_URL= "/api/v1"; //API BASE PATH
};