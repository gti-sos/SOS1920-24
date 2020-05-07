<script>
	//importamos la FUNCION onMount
	import {onMount} from "svelte";
	//usamos el GUI para tablas
	import Table from "sveltestrap/src/Table.svelte";
	//usamos el GUI para botones
	import Button from "sveltestrap/src/Button.svelte";
	

	//cargar datos desde la API 
	let atc = [];
	let newAtc = {
		aut_com: "",
		year:    0,
		espce:   0.0,
		yaq:     0,
		obu:    0
	};

	onMount(getAtc);
	
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

async function insertAtc(){
		const res = await fetch("/api/v1/atc-stats", {
			method: "POST", 
			body: JSON.stringify(newAtc),
			headers: {
				"Content-type": "application/json"
			}
		}).then(function(res){
			getAtc();
		});

	}

//funciona el delete
	async function deleteAtc(aut_com){
		console.log("Delete atc");
		const res = await fetch("/api/v1/atc-stats/" + aut_com , {
			method: "DELETE",
        }).then(function(res){
			//para actualizar los valores de la tabla
            getAtc();
        });

	}

</script>

<main>
	{#await atc} 
	{:then atc}
			<Table bordered> 
				<thead>
					<tr>
						<th>aut_com </th>
						<th>year  </th>
						<th>espce </th>
						<th>yaq   </th>
						<th>obu   </th>	
						<th>Actions </th>	
					</tr>
				</thead>
				<tbody>
					<tr> 
						<td><input bind:value = "{newAtc.aut_com}"> </td>
						<td><input bind:value = "{newAtc.year}">    </td>
						<td><input bind:value = "{newAtc.espce}">   </td>
						<td><input bind:value = "{newAtc.yaq}">     </td>
						<td><input bind:value = "{newAtc.obu}">     </td>
						<td> <Button outline color="primary"  on:click={insertAtc} > Insertar </Button> </td>
					</tr>
					<!--para iterar con svelte-->
					{#each atc as e}
					<tr> 
						<td> <a href="#/atc/{e.aut_com}" > {e.aut_com} </a></td>
						<td>{e.year}  </td>
						<td>{e.espce} </td>
						<td>{e.yaq}   </td>
						<td>{e.obu}   </td>
						<td> <Button outline color="danger"  on:click="{deleteAtc(e.aut_com)}" > Eliminar </Button> </td>
					</tr>
					{/each}
				</tbody>
		</Table>
	{/await}
</main>
