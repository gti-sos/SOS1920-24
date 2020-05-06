<script>
	//importamos la FUNCION onMount
	import {onMount} from "svelte";
	//usamos el GUI para tablas
	import Table from "sveltestrap/src/Table.svelte";
	//usamos el GUI para botones
	import Button from "sveltestrap/src/Button.svelte";

	//para dejar las busquedas mas bonita usamos sveltestrap 
	import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";

    //paginacion
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

	import {
		pop
	} from "svelte-spa-router";

	

	//cargar datos desde la API 
	let atc = [];
	let newAtc = {
		aut_com: "",
		year:    0,
		espce:   0.0,
		yaq:     0,
		obu:    0
	};

	//variables para las busquedas

	let aut_coms= [];
	let years = [];
	let currentAut_com = "-";
	let currentYear = "-";
/**
	let campo="";
	let valor ="";
	**/
//opciones de paginacion
	let numberElementsPages = 5;
	let currentPage = 1;
	let offset = 0;
	let moreData = true;

	onMount(getAtc);
	onMount(getAutComsYears);
	
	async function getAutComsYears() {
        const res = await fetch("/api/v1/atc-stats");
 
        /* Getting the countries for the select */
        if (res.ok) {
            const json = await res.json();
 
            aut_coms = json.map((d) => {
                    return d.aut_com;
            });
            /* Deleting duplicated countries */
            aut_coms = Array.from(new Set(aut_coms)); 
            
            /* Getting the years for the select */
            years = json.map((d) => {
                    return d.year;
            });
            /* Deleting duplicated years */
            years = Array.from(new Set(years)); 
 
            console.log("Counted " + aut_coms.length + " aut_coms and " + years.length + " years.");
 
        } else {
			errorAlert=("Error interno al intentar obtener las comunidades autonomas y los años")
            console.log("ERROR!");
        }
    }

	async function getAtc(){
		console.log("Fetching atc");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/atc-stats?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);
		const next = await fetch("/api/v1/atc-stats?offset=" + numberElementsPages * (offset + 1) + "&limit=" + numberElementsPages); 
		if(res.ok && next.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
			const json = await res.json();
			const jsonNext = await next.json();
			//lo cargamos dentro de la variable
			atc = json;

			if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }

			console.log("Received "+ atc.length + " data.");
		}else{
			errorAlert=("Error interno al intentar obtener todos los elementos");
			console.log("ERROR en get");
		}
	}

	async function loadInitialAtc() {
        console.log("Loading initial atc stats data..."); 
        const res = await fetch("/api/v1/atc-stats/loadInitialData").then(function (res) {
			if (res.ok){
				console.log("OK");

				getAtc();
				initialDataAlert();
				location.reload();
			}else {
				errorAlert=("Error al intentar borrar todos los elementos iniciales");
				console.log("ERROR!");
			}
			
		});
	}
	


//funcion para insertar un elemento

async function insertAtc() {
		console.log("Inserting element atc...");
		if (newAtc.aut_com == ""
			|| newAtc.aut_com == null
			|| newAtc.year == ""
			|| newAtc.year == null) {
			alert("Es obligatorio la comunidad autonoma y año");
		} else {
			const res = await fetch("/api/v1/atc-stats", {
				method: "POST",
				body: JSON.stringify(newAtc),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				/* we can update it each time we insert*/
				if (res.ok){
					getAtc();
					insertAlert();
				}else {
					errorAlert("No se han podido insetar los elementos");
				}
			});
		};
	}

//funciona el delete para eliminar un elemento en expecifico
	async function deleteAtc(country, year) {
		console.log("Deleting atc...");
		const res = await fetch("/api/v1/atc-stats" + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				getAtc();
				getAutComsYears();
				deleteAlert();
			} else if (res.status==404){
				errorAlert("Se ha intentado borrar un dato inexistente");
			} else {
				errorAlert("Error interno al intentar borrar un elemento concreto");
			}
			
		});
	}
//funcion delete para eliminar todo la base de datos
async function deleteAtcs() {
		console.log("Deleting base route atc...");
		const res = await fetch("/api/v1/atc-stats/", {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				currentPage = 1;
				offset=0;
				getAtc();
				getAutComsYears();
				deleteAllAlert();
				location.reload();
				
			}else {
				errorAlert=("Error al intentar borrar todos los elementos");
			}
		});
	}
//funciones de busqueda

async function searchYears(aut_com) {
		console.log("Searching years in aut_com...");
		const res = await fetch("/api/v1/atc-stats/" + aut_com)
		if (res.ok) {
			const json = await res.json();
			atc = json;
			atc.map((d) => {
				return d.year;
			});
			console.log("Update years")
		} else {
			console.log("ERROR!")
		}
	}

	async function search(aut_com, year) {
		console.log("Searching data: " + aut_com + " and " + year);
		//miramos si los campos estan vacios
		var url = "/api/v1/atc-stats";
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
			atc = json;
			console.log("Found " + atc.length + "atc.");
		} else {
			errorAlert=("Error interno al intentar realizar la búsqueda");
			console.log("ERROR!");
		}
	}

//funcioines adicionales

	function addOffset(increment) {
		offset += increment;
		currentPage += increment;
		getAtc();
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
	{#await atc} 
		Loading atc
	{:then atc}
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
						<th>Datos de la pagina espce </th>
						<th>Datos de la pagina yaq   </th>
						<th>Datos de la pagina obu   </th>	
						<th>Acciones </th>	
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
						<td> <a href="#/atc-stats/{e.aut_com}/{e.year}" > {e.aut_com} </a></td>
						<td>{e.year}  </td>
						<td>{e.espce} </td>
						<td>{e.yaq}   </td>
						<td>{e.obu}   </td>
						<td> <Button outline color="danger" on:click="{deleteAtc(e.aut_com,e.year)}" > Borrar </Button> </td>
					</tr>
					{/each}
				</tbody>
		</Table>
	{/await}

	<Pagination style="float:right;" ariaLabel="Cambiar de página">
    
		
        <PaginationItem class = "{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/atc-stats" on:click="{() => addOffset(-1)}" />
        </PaginationItem>
		
		{#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/atc-stats" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}

        <PaginationItem active>
            <PaginationLink href="#/atc-stats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- more elements...-->
		{#if moreData}
        <PaginationItem >
            <PaginationLink href="#/atc-stats" on:click="{() => addOffset(1)}">{currentPage + 1}</PaginationLink>
         </PaginationItem>
		 {/if}

        <PaginationItem class = "{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/atc-stats" on:click="{() => addOffset(1)}"/>
        </PaginationItem>
      
	</Pagination>
	

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás</Button>
	<Button outline color= "warning" on:click = {loadInitialAtc}> <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Datos Iniciales </Button>
	<Button outline color= "danger" on:click = {deleteAtcs}> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo</Button>

</main>
