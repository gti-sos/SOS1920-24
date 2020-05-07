<script>
	//importamos la FUNCION onMount
	import {onMount} from "svelte";
	//usamos el GUI para tablas
	import Table from "sveltestrap/src/Table.svelte";
	//usamos el GUI para botones
	import Button from "sveltestrap/src/Button.svelte";

	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import {
		pop
	} from "svelte-spa-router";

	//search variables 
	let aut_coms= [];
	let years = [];
	let currentAut_com = "-";
	let currentYear = "-";
	let campos=[];

	//pagination options
	let offset = 0;
	let numberElementsPages = 5;
	let currentPage = 1;
	let moreData = true;

	
	
	//cargar datos desde la API 
	let intcont = [];
	let newIntcont = {
		"aut_com": "",
		"year":    0,
		"ccoo":   0,
		"sepe":     0,
		"gobesp":    0.0
	};
	onMount(getIntcont);
	onMount(getAutComsYears);

	
	async function getAutComsYears() {
        const res = await fetch("/api/v1/intcont-stats");
 
        /* Getting the countries for the select */
        if (res.ok) {
            const json = await res.json();
 
            aut_coms = json.map((i) => {
                    return i.aut_com;
            });
            /* Deleting duplicated countries */
            aut_coms = Array.from(new Set(aut_coms)); 
            
            /* Getting the years for the select */
            years = json.map((i) => {
                    return i.year;
            });
            /* Deleting duplicated years */
			years = Array.from(new Set(years));  
			
 
            console.log("Counted " + aut_coms.length + " aut_coms and " + years.length + " years.");
 
        } else {
			errorAlert=("Error interno al intentar obtener las comunidades autonomas y los años")
            console.log("ERROR!");
        }
    }
	async function getIntcont(){
		console.log("Fetching intcont");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/intcont-stats?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages); 
		if(res.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
			const json = await res.json();
			//lo cargamos dentro de la variable
			intcont = json;
			if(intcont.length<numberElementsPages){
				moreData=false;
			}else{
				moreData=true;
			}
			console.log("Received "+ intcont.length + " data.");
		}else{
			errorAlert=("Error interno al intentar obtener todos los elementos");
			console.log("ERROR");
		}
	}


	async function loadInitialIntcont() {
        console.log("Loading initial intcont stats data..."); 
        const res = await fetch("/api/v1/intcont-stats/loadInitialData").then(function (res) {
			if (res.ok){
				console.log("OK");
				getIntcont();
				initialDataAlert();
				location.reload();
			}else {
				errorAlert=("Error al intentar borrar todos los elementos iniciales");
				console.log("ERROR!");
			}
			
		});
	}
	
	async function insertIntcont() {
		console.log("Inserting intcont...");
		if (newIntcont.aut_com == ""
			|| newIntcont.aut_com == null
			|| newIntcont.year == ""
			|| newIntcont.year == null) {
			alert("Es obligatorio el campo País y año");
		} else {
			const res = await fetch("/api/v1/intcont-stats", {
				method: "POST",
				body: JSON.stringify(newIntcont),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				/* we can update it each time we insert*/
				if (res.ok){
					getIntcont();
					insertAlert("Éxito al instertar");
				}else {
					alert("Fallo");
				}
			});
		};
	}

	async function deleteIntcont(autcom, year) {
		console.log("Deleting Intcont...");
		const res = await fetch("/api/v1/intcont-stats" + "/" + autcom + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				getIntcont();
				getAutComsYears();
				deleteAlert();
			} else if (res.status==404){
				errorAlert("Se ha intentado borrar un dato inexistente");
			} else {
				errorAlert("Error interno al intentar borrar un elemento concreto");
			}
			
		});
	}
	async function deleteIntconts() {
		console.log("Deleting base route intcont...");
		const res = await fetch("/api/v1/intcont-stats/", {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				currentPage = 1;
				offset=0;
				getIntcont();
				getAutComsYears();
				deleteAllAlert();
				location.reload();
				
			}else {
				errorAlert=("Error al intentar borrar todos los elementos");
			}
		});
	}
	async function searchYears(aut_com) {
		console.log("Searching years in aut_com...");
		const res = await fetch("/api/v1/intcont-stats/" + aut_com)
		if (res.ok) {
			const json = await res.json();
			intcont = json;
			intcont.map((i) => {
				return i.year;
			});
			console.log("Update years")
		} else {
			console.log("ERROR!")
		}
	}
	async function search(aut_com, year) {
		console.log("Searching data: " + aut_com + " and " + year);
		//miramos si los campos estan vacios
		var url = "/api/v1/intcont-stats";
		if (aut_com != "-" && year != "-") {
			url = url + "?community=" + aut_com + "&year=" + year;
		} else if (aut_com != "-" && year == "-") {
			url = url + "?community=" + aut_com;
		} else if (aut_com == "-" && year != "-") {
			url = url + "?year=" + year;
		}
		const res = await fetch(url);
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			intcont = json;
			console.log("Found " + intcont.length + "intcont.");
		} else {
			errorAlert=("Error interno al intentar realizar la búsqueda");
			console.log("ERROR!");
		}
	}
	function incOffset(v) {
		offset += v;
		currentPage += v;
		getIntcont();
	}
	function insertAlert(){
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = " alert alert dismissible in alert-success ";
		alert_element.innerHTML = "<strong>¡Dato insertado!</strong> El dato ha sido insertado correctamente!";
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}
	function deleteAlert(){
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = " alert alert dismissible in alert-danger ";
		alert_element.innerHTML = "<strong>¡Dato borrado!</strong> El dato ha sido borrado correctamente!";
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}
	function deleteAllAlert(){
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = " alert alert dismissible in alert-danger ";
		alert_element.innerHTML = "<strong>¡Datos borrados!</strong> Todos los datos han sido borrados correctamente!";
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}
	function initialDataAlert(){
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = " alert alert dismissible in alert-warning ";
		alert_element.innerHTML = "<strong>Datos iniciales!</strong> ¡ Se han generado los datos iniciales !";
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}
	function errorAlert(error){
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = " alert alert dismissible in alert-danger ";
		alert_element.innerHTML = "<strong>¡ERROR!</strong> ¡Ha ocurrido un error!" + error;
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}
    function clearAlert(){
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "display: none; ";
		alert_element.className = "alert alert-dismissible in";
		alert_element.innerHTML = "";
	}

	
</script>

<main>
	<div role ="alert" id ="div_alert" style = "display: none;"></div>
	{#await intcont} 
		Loading intcont
	{:then intcont}
	<!--select para buscar por comunidad autonoma-->

	<FormGroup> 
        <Label for="selectAut_com">Búsqueda por comunidad autonoma </Label>
        <Input type="select" name="selectAut_com" id="selectAut_com" bind:value="{currentAut_com}">
            {#each aut_coms as aut_com}
            <option>{aut_com}</option>
			{/each}
			<option>-</option>
        </Input>
	</FormGroup>

	<FormGroup>
		<Label for="selectYear">Año</Label>
		<Input type="select" name="selectYear" id="selectYear" bind:value = "{currentYear}">
			{#each years as year}
			<option>{year}</option>
			{/each}
			<option>-</option>
		</Input>
	</FormGroup>

<Button outline color="success" on:click="{search(currentAut_com, currentYear)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>

			<Table bordered> 
				<thead>
					<tr>
						<th>Comunidad autonoma </th>
						<th>Año  </th>
						<th>Datos de la pagina ccoo </th>
						<th>Datos de la pagina sepe   </th>
						<th>Datos de la pagina gobesp   </th>	
						<th>Acciones </th>	
					</tr>
				</thead>
				<tbody>
					<tr> 
						<td><input bind:value = "{newIntcont.aut_com}"> </td>
						<td><input bind:value = "{newIntcont.year}">    </td>
						<td><input bind:value = "{newIntcont.ccoo}">   </td>
						<td><input bind:value = "{newIntcont.sepe}">     </td>
						<td><input bind:value = "{newIntcont.gobesp}">     </td>
						<td> <Button outline color="primary"  on:click={insertIntcont} > Insertar </Button> </td>
					</tr>
					<!--para iterar con svelte-->
					{#each intcont as e}
					<tr> 
						<td> <a href="#/intcont-stats/{e.aut_com}/{e.year}" > {e.aut_com} </a></td>
						<td>{e.year}  </td>
						<td>{e.ccoo} </td>
						<td>{e.sepe}   </td>
						<td>{e.gobesp}   </td>
						<td> <Button outline color="danger" on:click="{deleteIntcont(e.aut_com,e.year)}" > Borrar </Button> </td>
					</tr>
					{/each}
				</tbody>
		</Table>
	{/await}

	<Pagination style="float:right;" ariaLabel="Cambiar de página">
    
		
        <PaginationItem class = "{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/intcont-stats" on:click="{() => incOffset(-1)}" />
        </PaginationItem>
		
		{#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/intcont-stats" on:click="{() => incOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}

        <PaginationItem active>
            <PaginationLink href="#/intcont-stats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- more elements...-->
		{#if moreData}
        <PaginationItem >
            <PaginationLink href="#/intcont-stats" on:click="{() => incOffset(1)}">{currentPage + 1}</PaginationLink>
         </PaginationItem>
		 {/if}

        <PaginationItem class = "{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/intcont-stats" on:click="{() => incOffset(1)}"/>
        </PaginationItem>
      
	</Pagination>
	

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás</Button>
	<Button outline color= "warning" on:click = {loadInitialIntcont}> <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Datos Iniciales </Button>
	<Button outline color= "danger" on:click = {deleteIntconts}> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo</Button>

</main>
