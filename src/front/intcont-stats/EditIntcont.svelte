<script>
    import {onMount} from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router"
    export let params = {};
    let intcont = {};

    let updatedAutcom="";
    let updatedYear=0;
    let updatedCcoo=0;
    let updatedSepe=0;
    let updatedGobesp=0.0;
    let errorMsg="";

    onMount(getIntcont);
	
	async function getIntcont(){
		console.log("Fetching intcont");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/intcont-stats/"+params.aut_com+"/"+params.year);
		if(res.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
            const json = await res.json();
            intcont = json;
            updatedAutcom = intcont.aut_com;
            updatedYear = intcont.year;
            updatedCcoo = intcont.ccoo;
            updatedSepe = intcont.sepe;
            updatedGobesp = intcont.gobesp;
			//lo cargamos dentro de la variable
			console.log("Received data.");
		}else{
            errorMsg = res.status = ":" + res.statusText;
            console.log("ERROR en get");
		}
    }
    
   async function updateIntcont(){
    console.log("Updating intcont"+JSON.stringify(params.aut_com));
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/intcont-stats/"+params.aut_com+"/"+params.year, {
			method: "PUT",
			body: JSON.stringify({
                aut_com : params.aut_com,
                year : parseInt(params.year),
                ccoo : parseInt(updatedCcoo),
                sepe : parseInt(updatedSepe),
                gobesp : parseFloat(updatedGobesp)
            }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(res){
			if(res.ok){
                getIntcont();
                pop();
            }else if(res.status == 404){
                errorAlert("No se ha encontrado el elemento para editar");
            }else{
                errorAlert();
            }
		});

    }
</script>
<main>
   <h3> Edit Contact {params.aut_com}</h3>
   {#await intcont} 
        Loading intcont...
   {:then intcont}
       <Table bordered> 
           <thead>
               <tr>
                   <th>Comunidad </th>
                   <th>Año  </th>
                   <th>Estadistica CCOO </th>
                   <th>Estadistica SEPE  </th>
                   <th>Estadistica Gobierno España  </th>	
                   <th>Acciones </th>	
               </tr>
           </thead>
           <tbody>
               <tr> 
                   <td>{params.aut_com}</td>
                   <td>{params.year}</td>
                   <td><input bind:value = "{updatedCcoo}"></td>
                   <td><input bind:value = "{updatedSepe}"></td>
                   <td><input bind:value = "{updatedGobesp}"></td>
                   <td> <Button outline color="primary" on:click={updateIntcont}
                       > Aceptar </Button> </td>
               </tr>
           </tbody>
       </Table>
{/await}
{#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
{/if}
<Button outline color="secondary" on:click="{pop}">Atras</Button>
</main>