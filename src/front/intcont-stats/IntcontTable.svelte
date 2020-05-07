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
	let currentYear = "";
	let field="";
	let value="";
	let fromYear=2000;
	let toYear=2040;
	let fromCcoo=0;
	let toCcoo=0;
	let fromSepe=0;
	let toSepe=0;
	let fromGobesp=0;
	let toGobesp=0;
	
	//pagination options
	let offset = 0;
	let numberElementsPages = 10;
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
	onMount(getAutComs);

	
	async function getAutComs() {
        const res = await fetch("/api/v1/intcont-stats");
 
        /* Getting the countries for the select */
        if (res.ok) {
            const json = await res.json();
 
            aut_coms = json.map((i) => {
                    return i.aut_com;
            });
            /* Deleting duplicated countries */
            aut_coms = Array.from(new Set(aut_coms)); 
            
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
        const res = await fetch("/api/v1/intcont-stats/loadInitialData").then(function(res) {
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
	async function search(field) {
		var url = "/api/v1/intcont-stats";
		//miramos si los campos estan vacios
		switch(field){
			case "autcom":
			console.log(url);
			url = url + "?community="+currentAut_com;
			console.log(url);
			break;
			case "year":
			console.log(url);
			url = url + "?year="+ currentYear;
			console.log(url);
			break;
			case "rangeYear":
			console.log(url);
			url = url +"?fromYear="+ fromYear+"&toYear=" + toYear;
			console.log(url);
			break;
			console.log(url);
			case "ccoostat":
			url = url +"?fromCcoo="+ fromCcoo+"&toCcoo=" + toCcoo;
			console.log(url);
			break;
			console.log(url);
			case "sepestat":
			url = url +"?fromSepe="+ fromSepe+"&toSepe=" + toSepe;
			console.log(url);
			break;
			case "gobespstat":
			console.log(url);
			url = url +"?fromGobesp="+ fromGobesp+"&toGobesp=" + toGobesp;
			console.log(url);
			break;
			default:
			break;
		}
		const res = await fetch(url+"&offset="+numberElementsPages*offset+"&limit="+numberElementsPages);
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			intcont = json;
			console.log("Found " + intcont.length + "intcont.");
			if(intcont.length<numberElementsPages){
				moreData=false;
			}else{
				moreData=true;
			}
			
		} else if(res.status==404){
			errorAlert=("No se han encontrado datos");
			console.log("ERROR ELEMENTO NO ENCONTRADO!");
		}else{
			errorAlert=("ERROR INTERNO");
			console.log("ERROR INTERNO");
		/*}if(res.ok){
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
			console.log("ERROR");*/
		}
		/*
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
		}*/
	}
	function incOffset(v) {
		offset += v;
		currentPage += v;
		getIntcont();
	}
	function incOffsetSearch(v) {
		offset += v;
		currentPage += v;
		search(field);
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
        <Label for="selectAut_com">Elige Dato para la búsqueda</Label>
        <Input type="select" name="selectField" id="selectField" bind:value="{field}">
			<option value=vacio></option>
			<option value="autcom">Comunidad Autonoma</option>
			<option value="year">Año</option>
			<option value="rangeYear">Rango de Años</option>
			<option value="ccoostat">Estadisticas CCOO</option>
			<option value="sepestat">Estadisticas SEPE</option>
			<option value="gobespstat">Estadisticas GOBESP</option>
        </Input>
	</FormGroup>
	{#if field == "autcom"}
	<FormGroup> 
        <Label>Búsqueda por comunidad autonoma </Label>
        <Input type="select" name="selectAut_com" id="selectAut_com" bind:value="{currentAut_com}">
            {#each aut_coms as aut_com}
            <option>{aut_com}</option>
			{/each}
			<option>-</option>
        </Input>
	</FormGroup>
	{/if}

	{#if field == "year"}
	<FormGroup>
		<Label>Año</Label>
		<Input type="text" name="simpleYear" id="simpleYear" bind:value = "{currentYear}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "rangeYear"}
	<FormGroup>
		<Label>Año Inicial</Label>
		<Input type="text" name="fromYear" id="fromYear" bind:value = "{fromYear}">
		</Input>
		<Label>Año Final</Label>
		<Input type="text" name="toYear" id="toYear" bind:value = "{toYear}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "ccoostat"}
	<FormGroup>
		<Label>CCOO Inicial</Label>
		<Input type="text" name="fromCcoo" id="fromCcoo" bind:value = "{fromCcoo}">
		</Input>
		<Label>CCOO Final</Label>
		<Input type="text" name="toCcoo" id="toCcoo" bind:value = "{toCcoo}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "sepestat"}
	<FormGroup>
		<Label>SEPE Inicial</Label>
		<Input type="text" name="fromSepe" id="fromSepe" bind:value = "{fromSepe}">
		</Input>
		<Label>SEPE Final</Label>
		<Input type="text" name="toSepe" id="toSepe" bind:value = "{toSepe}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "gobespstat"}
	<FormGroup>
		<Label>GOBESP Inicial</Label>
		<Input type="text" name="fromGobesp" id="fromGobesp" bind:value = "{fromGobesp}">
		</Input>
		<Label>GOBESP Final</Label>
		<Input type="text" name="toGobesp" id="toGobesp" bind:value = "{toGobesp}">
		</Input>
	</FormGroup>
	{/if}
	

<Button outline color="success" on:click="{search(field)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>

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
	
	<Pagination style="float:right;" ariaLabel="Cambiar de página">
    
		
        <PaginationItem class = "{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/intcont-stats" on:click="{() => incOffsetSearch(-1)}" />
        </PaginationItem>
		
		{#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/intcont-stats" on:click="{() => incOffsetSearch(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}

        <PaginationItem active>
            <PaginationLink href="#/intcont-stats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- more elements...-->
		{#if moreData}
        <PaginationItem >
            <PaginationLink href="#/intcont-stats" on:click="{() => incOffsetSearch(1)}">{currentPage + 1}</PaginationLink>
         </PaginationItem>
		 {/if}

        <PaginationItem class = "{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/intcont-stats" on:click="{() => incOffsetSearch(1)}"/>
        </PaginationItem>
      
	</Pagination>
	

	
	

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás</Button>
	<Button outline color= "warning" on:click = {loadInitialIntcont}> <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Datos Iniciales </Button>
	<Button outline color= "danger" on:click = {deleteIntconts}> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo</Button>

</main>
