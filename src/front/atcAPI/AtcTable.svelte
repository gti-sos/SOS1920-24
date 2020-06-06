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
	//variables para las busquedas

	const BASE_API_URL = "/api/v2/atc-stats";


	let aut_coms= [];
	let years = [];
	let currentAut_com = "-";
	let currentYear = "";
	let field="";
	let value="";
	let fromYear=2000;
	let toYear=2040;
	let fromEspce=0;
	let toEspce=0;
	let fromYaq=0;
	let toYaq=0;
	let fromObu=0;
	let toObu=0;
	let centinel=0;
	//opciones de paginacion
	let offset = 0;
	let numberElementsPages = 10;
	let currentPage = 1;
	
	let moreData = true;
	
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
	onMount(getAutComs);
	
	async function getAutComs() {
		const res = await fetch(BASE_API_URL);
		
        if (res.ok) {
            const json = await res.json();
 
            aut_coms = json.map((i) => {
                    return i.aut_com;
			});
			
			aut_coms = Array.from(new Set(aut_coms));
 
        }if(res.status == 404){
			errorAlert("No hay datos")
			
			console.log("Se a comprobado en la base datos que no hay ningun elemento despues de un borrado");
            
		}if(res.status ==200){
			AlertInstructions("Se a actualizado correctamente")
		} else {
			AlertInstructions("Se han eliminado correctamente")
            
        }
    }

	async function getAtc(){
		console.log("Fetching atc");
		const res = await fetch(BASE_API_URL + "?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);
		console.log(BASE_API_URL)
		if(res.ok){
			console.log("Ok:");
			const json = await res.json();
			atc = json;

			if (atc.length<numberElementsPages) {
               moreData = false;
            } else {
                moreData = true;
            }
			console.log("Received "+ atc.length + " data.");
			centinel=0;
		}if(res.status==404){
			errorAlert("No hay datos")
			console.log("Se a comprobado en la base datos que no hay ningun elemento despues de un borrado");

		}if(res.status == 200){
			AlertInstructions("Se a creado correctamente");
			console.log("ok");
		}else{
			AlertInstructions("Error interno al intentar obtener todos los elementos");
			///console.log("ERROR");
		}
		
	}

	async function loadInitialAtc() {
        console.log("Loading initial atc stats data..."); 
        const res = await fetch(BASE_API_URL + "/loadInitialData").then(function (res) {
			if (res.ok){
				console.log("OK");

				getAtc();
				AlertInstructions("realizado correctamente");
				location.reload();
			}else if(res.status==404) {
				errorAlert("No se han podido encontrar los datos para borrar");
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
			errorAlert("Los datos no pueden ser nulos o vacios.")
		} else {
			console.log(newAtc);
			const res = await fetch(BASE_API_URL, {
				method: "POST",
				body: JSON.stringify(newAtc),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if (res.ok){
					getAtc();
					AlertInstructions("Exito al meter " + newAtc.aut_com + "/"+newAtc.year);
					
				}else if(res.status == 400){
					errorAlert("La fecha debe estar entre 2000 y 2040")
				}else{
					errorAlert("Dato ya existente.")
				}
				
			});
		}
	}

//funciona el delete para eliminar un elemento en expecifico
	async function deleteAtc(country, year) {
		console.log("Deleting atc...");
		const res = await fetch(BASE_API_URL + "/" + country + "/" + year, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				getAtc();
				getAutComs();
				AlertInstructions("Borrado correctamente el elemento" +country+"/"+year+" correctamente");
			} else {
				errorAlert("No se han podido encontrar los datos.");
			}
			
		});
	}
//funcion delete para eliminar todo la base de datos
	async function deleteAtcs() {
		console.log("Deleting base route atc...");
		const res = await fetch(BASE_API_URL +"/", {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				getAtc();
				getAutComs();
				AlertInstructions("Borrado realizado corectamente");
				//location.reload();
				
			}else {
				errorAlert("No se han podido encontrar los datos.");
			}
		});
	}
//funciones de busqueda
	
async function search(field) {
		var url = BASE_API_URL;
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
			case "espcestat":
			url = url +"?fromEspce="+ fromEspce+"&toEspce=" + toEspce;
			console.log(url);
			break;
			console.log(url);
			case "yaqstat":
			url = url +"?fromYaq="+ fromYaq+"&toYaq=" + toYaq;
			console.log(url);
			break;
			case "obustat":
			console.log(url);
			url = url +"?fromObu="+ fromObu+"&toObu=" + toObu;
			console.log(url);
			break;
			default:
			break;
		}
		const res = await fetch(url+"&offset="+numberElementsPages*offset+"&limit="+numberElementsPages);
		const res1 = await fetch(url+"&offset="+numberElementsPages*(offset +1)+"&limit="+numberElementsPages);
		if (res.ok || res1.ok) {
			console.log("OK:");
			const json = await res.json();
			atc = json;
			console.log("Found " + atc.length + "atc.");
			if(atc.length<numberElementsPages){
				moreData=false;
			}else{
				moreData=true;
			}
			centinel=1;
			///////////////////
			AlertInstructions("Búsqueda realizada con éxito");
			
		} else if(res.status==404){
			errorAlert("No se han encontrado datos");
			console.log("ERROR ELEMENTO NO ENCONTRADO!");
		}else{
			errorAlert("Ha ocurrido un fallo inesperado");
			console.log("ERROR INTERNO");
		
		}
		
	}

	

//funcioines adicionales

function incOffset(v) {
		offset += v;
		currentPage += v;
		getAtc();
	}

	function incOffsetSearch(v) {
		offset += v;
		currentPage += v;
		search(field);
	}

	function errorAlert(error){
		var alert_Er = document.getElementById("div_alert");
		alert_Er.style = "position: fixed; top: 0px; top: 1%; width: 40%;";
		alert_Er.className = " alert alert dismissible in alert-danger ";
		alert_Er.innerHTML = "ERROR. La instruccion no se a procesado correctamente " + error;
	}

	function AlertInstructions(msg){
		var alert_Er = document.getElementById("div_alert");
		alert_Er.style = "position: fixed; top: 0px; top: 1%; width: 40%;";
		alert_Er.className = " alert alert dismissible in alert-info ";
		alert_Er.innerHTML = "La instruccion se a procesado correctamente " + msg;
	}

</script>

<main>
	<div role ="alert" id ="div_alert" style = "display: none;"></div>
	{#await atc} 
		Loading atc
	{:then atc}

<FormGroup> 
        <Label for="selectAut_com">Elige Dato para la búsqueda</Label>
        <Input type="select" name="selectField" id="selectField" bind:value="{field}">
			<option value=vacio></option>
			<option value="autcom">Comunidad Autonoma</option>
			<option value="year">Año</option>
			<option value="rangeYear">Rango de Años</option>
			<option value="espcestat">Estadisticas ESPCE</option>
			<option value="yaqstat">Estadisticas YAQ</option>
			<option value="obustat">Estadisticas OBU</option>
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
	{#if field == "espcestat"}
	<FormGroup>
		<Label>ESPCE Inicial</Label>
		<Input type="text" name="fromEspce" id="fromEspce" bind:value = "{fromEspce}">
		</Input>
		<Label>ESPCE Final</Label>
		<Input type="text" name="toEspce" id="toEspce" bind:value = "{toEspce}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "yaqstat"}
	<FormGroup>
		<Label>YAQ Inicial</Label>
		<Input type="text" name="fromYaq" id="fromYaq" bind:value = "{fromYaq}">
		</Input>
		<Label>YAQ Final</Label>
		<Input type="text" name="toYaq" id="toYaq" bind:value = "{toYaq}">
		</Input>
	</FormGroup>
	{/if}
	{#if field == "obustat"}
	<FormGroup>
		<Label>OBU Inicial</Label>
		<Input type="text" name="fromObu" id="fromObu" bind:value = "{fromObu}">
		</Input>
		<Label>OBU Final</Label>
		<Input type="text" name="toObu" id="toObu" bind:value = "{toObu}">
		</Input>
	</FormGroup>
	{/if}

	<Button outline color="success" on:click="{search(field)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>
			
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

	{#if atc.length>0}
	{#if centinel==0 || field =='vacio'}
	<Pagination style="float:right;" ariaLabel="Cambiar de página">
    
	
        <PaginationItem class = "{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/atc-stats" on:click="{() => incOffset(-1)}" />
        </PaginationItem>
		
		{#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/atc-stats" on:click="{() => incOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		
        <PaginationItem active>
            <PaginationLink href="#/atc-stats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- more elements...-->
		{#if moreData}
        <PaginationItem >
            <PaginationLink href="#/atc-stats" on:click="{() => incOffset(1)}">{currentPage + 1}</PaginationLink>
         </PaginationItem>
		 {/if}

        <PaginationItem class = "{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/atc-stats" on:click="{() => incOffset(1)}"/>
        </PaginationItem>
      
	</Pagination>
	{/if}
	{#if centinel==1 && field!='vacio'}
	<Pagination style="float:right;" ariaLabel="Cambiar de página">
    
		
        <PaginationItem class = "{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/atc-stats" on:click="{() => incOffsetSearch(-1)}" />
        </PaginationItem>
		
		{#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/atc-stats" on:click="{() => incOffsetSearch(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}

        <PaginationItem active>
            <PaginationLink href="#/atc-stats" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- more elements...-->
		{#if moreData}
        <PaginationItem >
            <PaginationLink href="#/atc-stats" on:click="{() => incOffsetSearch(1)}">{currentPage + 1}</PaginationLink>
         </PaginationItem>
		 {/if}

        <PaginationItem class = "{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/atc-stats" on:click="{() => incOffsetSearch(1)}"/>
        </PaginationItem>
      
	</Pagination>
	{/if}
	{/if}
	

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás</Button>
	<Button outline color= "warning" on:click = {loadInitialAtc}> <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Datos Iniciales </Button>
	<Button outline color= "danger" on:click = {deleteAtcs} onclick = "location.reload()" >  Borrar todo</Button>

</main>
