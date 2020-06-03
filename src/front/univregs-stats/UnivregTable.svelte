<script>
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

	//variables de busqueda
	let communities= [];
	let years = [];
	let currentAut_com = "-";
	let currentYear = "-";
	let field="";
	let value="";
	let fromYear=2000;
	let toYear=2040;
	let fromGob=0;
	let toGob=0;
	let fromEduc=0;
	let toEduc=0;
	let fromOffer=0;
	let toOffer=0;
	let centinel=0;
	let campos=[];

	//opciones de paginacion
	//pagination options
	let offset = 0;
	let numberElementsPages = 10;
	let currentPage = 1;
	let moreData = true;

	//cargar datos desde la API 
	let univreg = [];
	let newUnivreg = {
		"community": "",
		"year":    0,
		"univreg_gob":   0,
		"univreg_educ":     0,
		"univreg_offer":    0
	};
	onMount(getUnivreg);
	onMount(getAutComsYears);
	
	async function getAutComsYears(){
		console.log("Fetching univreg");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v2/univregs-stats");
		if(res.ok){
			console.log("Ok:");
			
			const json = await res.json();

			communities = json.map((i) => {
                    return i.community;
			});
			/* Deleting duplicated countries */
            communities = Array.from(new Set(communities)); 

			/*console.log("Received "+ univreg.length + " data.");*/
			//console.log("Counted " + communities.length + " communities and " + years.length + " years.");
		}if(res.status == 404){
            errorAlert("No hay datos")

            console.log("Se a comprobado en la base datos que no hay ningun elemento despues de un borrado");

        }if(res.status ==200){
            AlertInstructions("Se a actualizado correctamente")
        } else {
            AlertInstructions("Se han eliminado correctamente")

        }
    }
	
	async function getUnivreg(){
		console.log("Fetching univreg");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v2/univregs-stats?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages); 
		if(res.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
			const json = await res.json();
			//lo cargamos dentro de la variable
			univreg = json;
			if(univreg.length<numberElementsPages){
				moreData=false;
			}else{
				moreData=true;
			}
			console.log("Received "+ univreg.length + " data.");
			centinel=0;
		}if(res.status == 404){
            errorAlert("No hay datos")

            console.log("Se ha comprobado en la base datos que no hay ningun elemento despues de un borrado");

        }if(res.status ==200){
            AlertInstructions("Se ha creado correctamente")
        } else {
            AlertInstructions("Se han eliminado correctamente")

        }
    }
	async function loadInitialUnivreg() {
        console.log("Loading initial univreg stats data..."); 
        const res = await fetch("/api/v2/univregs-stats/loadInitialData").then(function (res) {
			if (res.ok){
				console.log("OK");
				getUnivreg();
				AlertInstructions("Datos iniciales cargados");
				location.reload();
			}else if(res.status==400) {
				errorAlert("No se han podido encontrar los datos");
				console.log("ERROR!");
			}
			
		});
	}
	
	
	async function insertUnivreg() {
		console.log("Inserting univreg...");
		if (newUnivreg.community == ""
			|| newUnivreg.community == null
			|| newUnivreg.year == ""
			|| newUnivreg.year == null) {
			errorAlert("Comunidad o año es nulo");
		} else {
			const res = await fetch("/api/v2/univregs-stats", {
				method: "POST",
				body: JSON.stringify(newUnivreg),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				/* we can update it each time we insert*/
				if (res.ok){
					getUnivreg();
					AlertInstructions("Dato insertado correctamente");
				}else if(res.status == 400){
                    errorAlert("La fecha debe estar entre 2000 y 2040")
                }
				else {
					errorAlert("Dato ya ha sido insertado");
				}
			});
		};
	}
//funciona el delete
async function deleteUnivreg(communities, year) {
		console.log("Deleting univreg...");
		const res = await fetch("/api/v2/univregs-stats" + "/" + communities , { //+ "/" + year
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				getUnivreg();
				getAutComsYears();
				deleteAlert();
			} else {
				errorAlert("Error interno al intentar borrar un elemento concreto");
			}
			
		});
	}

	async function deleteUnivregs() {
		console.log("Deleting base route univreg...");
		const res = await fetch("/api/v2/univregs-stats/", {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				currentPage = 1;
				offset=0;
				getUnivreg();
				getAutComsYears();
				AlertInstructions("Borrado todos los datos");
				
				
			}else if (res.status==404){
				errorAlert("Se ha intentado borrar un dato inexistente");
			} 
			else {
				errorAlert("Error al intentar borrar todos los elementos");
			}
		});
	}

	async function searchYears(aut_com) {
		console.log("Searching years in community...");
		const res = await fetch("/api/v2/univregs-stats/" + aut_com)
		if (res.ok) {
			const json = await res.json();
			univreg = json;
			univreg.map((i) => {
				return i.year;
			});
			console.log("Update years")
		} else {
			console.log("ERROR!")
		}
	}

	async function search(field) {
		var url = "/api/v2/univregs-stats";
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
			case "gobstat":
			url = url +"?fromGob="+ fromGob+"&toGob=" + toGob;
			console.log(url);
			break;
			console.log(url);
			case "educstat":
			url = url +"?fromEduc="+ fromEduc+"&toEduc=" + toEduc;
			console.log(url);
			break;
			case "offerstat":
			console.log(url);
			url = url +"?fromOffer="+ fromOffer+"&toOffer=" + toOffer;
			console.log(url);
			break;
			default:
			break;
		}

		
		const res = await fetch(url+"&offset="+numberElementsPages*offset+"&limit="+numberElementsPages);
		const res1 = await fetch(url+"&offset="+numberElementsPages*(offset+1) +"&limit="+numberElementsPages);
		if (res.ok || res1.ok) {
			console.log("OK:");
			const json = await res.json();
			univreg = json;
			console.log("Found " + univreg.length + "univreg.");
			if(univreg.length<numberElementsPages){
				moreData=false;
			}else{
				moreData=true;
			}
			centinel=1;
			AlertInstructions("Búsqueda realizada con éxito");

		} else if(res.status==404){
			errorAlert("No se han encontrado datos");
			console.log("ERROR ELEMENTO NO ENCONTRADO!");
		}else{
			errorAlert("ERROR INTERNO");
			console.log("ERROR INTERNO");
	}
}

	function incOffset(v) {
		offset += v;
		currentPage += v;
		getUnivreg();
	}
	
	function incOffsetSearch(v) {
		offset += v;
		currentPage += v;
		search(field);
	}

	//COMIENZAN LAS ALERTAS
	function AlertInstructions(msg){
		
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 40%;";
		alert_element.className = " alert alert dismissible in alert-info ";
		alert_element.innerHTML = "La instruccion se ha procesado correctamente "+msg;
		
	}
	
		function errorAlert(error){
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 40%;";
		alert_element.className = " alert alert dismissible in alert-warning ";
		alert_element.innerHTML = "ERROR la instruccion no se ha procesado correctamente! "+error;
	
	}
	

</script>

<main>
	<div role ="alert" id ="div_alert" style = "display: none;"></div>
	{#await univreg} 
		Loading univreg
	{:then univreg}
	<!--select para buscar por comunidad autonoma-->

	<FormGroup> 
        <Label for="selectAut_com">Elige Dato para la búsqueda</Label>
        <Input type="select" name="selectField" id="selectField" bind:value="{field}">
			<option value=vacio></option>
			<option value="autcom">Comunidad Autonoma</option>
			<option value="year">Año</option>
			<option value="rangeYear">Rango de Años</option>
			<option value="gobstat">Estadisticas demanda GOB</option>
			<option value="educstat">Estadisticas demanda EDUC</option>
			<option value="offerstat">Estadisticas oferta</option>
        </Input>
	</FormGroup>
	{#if field == "autcom"}
	<FormGroup> 
        <Label>Búsqueda por comunidad autonoma </Label>
        <Input type="select" name="selectAut_com" id="selectAut_com" bind:value="{currentAut_com}">
            {#each communities as aut_com}
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
	{#if field == "gobstat"}
	<FormGroup>
		<Label>Demanda gob inicial</Label>
		<Input type="text" name="fromGob" id="fromGob" bind:value = "{fromGob}">
		</Input>
		<Label>Demanda gob final</Label>
		<Input type="text" name="toGob" id="toGob" bind:value = "{toGob}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "educstat"}
	<FormGroup>
		<Label>Demanda educ inicial</Label>
		<Input type="text" name="fromEduc" id="fromEduc" bind:value = "{fromEduc}">
		</Input>
		<Label>Demanda educ final</Label>
		<Input type="text" name="toEduc" id="toEduc" bind:value = "{toEduc}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "offerstat"}
	<FormGroup>
		<Label>Oferta inicial</Label>
		<Input type="text" name="fromOffer" id="fromOffer" bind:value = "{fromOffer}">
		</Input>
		<Label>OfertaFinal</Label>
		<Input type="text" name="toOffer" id="toOffer" bind:value = "{toOffer}">
		</Input>
	</FormGroup>
	{/if}
<Button outline color="success" on:click="{search(field)}" class="button-search" > <i class="fa fa-search"></i> Buscar </Button>

			<Table bordered> 
				<thead>
					<tr>
						<th>Comunidad autonoma </th>
						<th>Año  </th>
						<th>Demanda segun gobierno </th>
						<th>Demanda segun ministerio de educación   </th>
						<th>Oferta segun gobierno </th>	
						<th>Acciones </th>		
					</tr>
				</thead>
				<tbody>
					<tr> 
						<td><input bind:value = "{newUnivreg.community}"> </td>
						<td><input bind:value = "{newUnivreg.year}">    </td>
						<td><input bind:value = "{newUnivreg.univreg_gob}">   </td>
						<td><input bind:value = "{newUnivreg.univreg_educ}">     </td>
						<td><input bind:value = "{newUnivreg.univreg_offer}">     </td>
						<td> <Button outline color="primary"  on:click={insertUnivreg} > Insertar </Button> </td>
					</tr>
					<!--para iterar con svelte-->
					{#each univreg as e}
					<tr> 
						<td> <a href="#/univreg-stats/{e.community}/{e.year}" > {e.community} </a></td>
						<td>{e.year}  </td>
						<td>{e.univreg_gob} </td>
						<td>{e.univreg_educ}   </td>
						<td>{e.univreg_offer}   </td>
						<td> <Button outline color="danger"  on:click="{deleteUnivreg(e.community)}" > Eliminar </Button> </td>
					</tr>
					{/each}
				</tbody>
		</Table>
	{/await}
	{#if univreg.length>0}
	{#if centinel==0 || field =='vacio'}

	<Pagination style="float:right;" ariaLabel="Cambiar de página">
    
		
        <PaginationItem class = "{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/univreg-stats" on:click="{() => incOffset(-1)}" />
        </PaginationItem>
		
		{#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/univreg-stats" on:click="{() => incOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}

        <PaginationItem active>
            <PaginationLink href="#/univreg-stats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- more elements...-->
		{#if moreData}
        <PaginationItem >
            <PaginationLink href="#/univreg-stats" on:click="{() => incOffset(1)}">{currentPage + 1}</PaginationLink>
         </PaginationItem>
		 {/if}

        <PaginationItem class = "{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/univreg-stats" on:click="{() => incOffset(1)}"/>
        </PaginationItem>
      
	</Pagination>
	{/if}
	{#if centinel==1 && field!='vacio'}
	<Pagination style="float:right;" ariaLabel="Cambiar de página">
    
		
        <PaginationItem class = "{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/univreg-stats" on:click="{() => incOffsetSearch(-1)}" />
        </PaginationItem>
		
		{#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/univreg-stats" on:click="{() => incOffsetSearch(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}

        <PaginationItem active>
            <PaginationLink href="#/univreg-stats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- more elements...-->
		{#if moreData}
        <PaginationItem >
            <PaginationLink href="#/univreg-stats" on:click="{() => incOffsetSearch(1)}">{currentPage + 1}</PaginationLink>
         </PaginationItem>
		 {/if}

        <PaginationItem class = "{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/univreg-stats" on:click="{() => incOffsetSearch(1)}"/>
        </PaginationItem>
      
	</Pagination>
	{/if}
	{/if}

	

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás</Button>
	<Button outline color= "warning" on:click = {loadInitialUnivreg}> <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Datos Iniciales </Button>
	<Button outline color= "danger" on:click = {deleteUnivregs} onclick="location.reload()"> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo</Button>

</main>