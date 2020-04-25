<script>
	//cargar datos desde la API 
	let atc = [];
	
	async function getAtc(){
		console.log("Fetching atc");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/atc-stats");

		if(res.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
			const json = await res.json();
			//lo cargamos dentro de la variable
			atc = json;
			console.log("Received "+ atc.length + " data.");
		}else{
			console.log("ERROR en get");
		}
	}

	getAtc();

</script>

<main>
	<!--quiero que esperes a tener todos los datos, sino aparece 0 y luego se cargan -->
	{#await atc}
	    Datos: {atc.length}
	{/await}


	<table> 
		<thead>
			<tr>
				<td>ID </td>
				<td>aut_com </td>
				<td>year  </td>
				<td>espce </td>
				<td>yaq   </td>
				<td>obu   </td>	
			</tr>
		</thead>
		<tbody>
			<tr> 
				<td>#####</td>
				<td>Andalucia </td>
				<td>2018  </td>
				<td>757.2 </td>
				<td>757   </td>
				<td>757   </td>
			</tr>
		</tbody>

	   	

	</table>
	
	
</main>

<style>
	table {
		border: 1px solid black;
	}
</style>