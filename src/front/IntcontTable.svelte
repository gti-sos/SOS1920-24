<script>
	//importamos la FUNCION onMount
	import {onMount} from "svelte";
	//usamos el GUI para tablas
	import Table from "sveltestrap/src/Table.svelte";
	//usamos el GUI para botones
	import Button from "sveltestrap/src/Button.svelte";
	
	//cargar datos desde la API 
	let intcont = [];
	let newIntcont = {
		aut_com: "",
		year:    0,
		ccoo:   0,
		sepe:     0,
		gobesp:    0.0
	};
	onMount(getIntcont);
	
	async function getIntcont(){
		console.log("Fetching intcont");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/intcont-stats/");
		if(res.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
			const json = await res.json();
			//lo cargamos dentro de la variable
			intcont = json;
			console.log("Received "+ intcont.length + " data.");
		}else{
			console.log("ERROR en get");
		}
	}
	async function insertIntcont(){
		console.log("Inserting intcont"+JSON.stringify(newIntcont));
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/intcont-stats", {
			method: "POST",
			body: JSON.stringify(newIntcont),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(res){
			getIntcont();
		});
	}

	async function deleteIntcont(aut_com){
		console.log("Delete Intcont");
		const res = await fetch("/api/v1/intcont-stats/" + aut_com , {
			method: "DELETE",
        }).then(function(res){
			//para actualizar los valores de la tabla
            getIntcont();
        });
	}
	
</script>

<main>
	{#await intcont} 
		Loading intcont...
	{:then intcont}
			<Table bordered> 
				<thead>
					<tr>
						<th>aut_com </th>
						<th>year  </th>
						<th>ccoo </th>
						<th>sepe   </th>
						<th>gobesp  </th>	
						<th>Actions </th>	
					</tr>
				</thead>
				<tbody>
					<tr> 
						<td><input bind:value = "{newIntcont.aut_com}"></td>
						<td><input bind:value = "{newIntcont.year}"></td>
						<td><input bind:value = "{newIntcont.ccoo}"></td>
						<td><input bind:value = "{newIntcont.sepe}"></td>
						<td><input bind:value = "{newIntcont.gobesp}"></td>
						<td> <Button outline color="primary" on:click={insertIntcont} 
							> Insert </Button> </td>
					</tr>
					
					
					<!--para iterar con svelte-->
					{#each intcont as e}
					<tr> 
						<td><a href="#/intcont/{e.aut_com}">{e.aut_com}</a></td>
						<td>{e.year}  </td>
						<td>{e.ccoo} </td>
						<td>{e.sepe}   </td>
						<td>{e.gobesp}   </td>
						<td> <Button outline color="danger" on:click="{deleteIntcont(e.aut_com)}"> Delete </Button> </td>
					</tr>
					{/each}
				</tbody>
			</Table>
	{/await}
	
</main>

<style>

</style>
