  
<script>
    import {onMount} from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router"
    
    
    export let params = {};
    
    let univreg = {};
    let updatedAutcom=params.community;
    let updatedYear=params.year;
    let updatedGob=0;
    let updatedEduc=0;
    let updatedOffer=0;
    let errorMsg="";
    onMount(getUnivreg);
	
	async function getUnivreg(){
		console.log("Fetching univreg");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/univregs-stats/"+params.community+"/"+params.year);
		if(res.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
            const json = await res.json();
            univreg = json;
            updatedAutcom=univreg.community;
            updatedYear=univreg.year;
            updatedGob=univreg.univreg_gob;
            updatedEduc=univreg.univreg_educ;
            updatedOffer=univreg.univreg_offer;
			//lo cargamos dentro de la variable
			
			console.log("Received data.");
		}else{
            errorMsg = res.status = ":" + res.statusText;
            console.log("ERROR en get");
		}
    }
    
   async function updateUnivreg(){
    console.log("Updating univreg"+JSON.stringify(params.community));
		//fetch es la solicitud a la API
		const res = await fetch("/api/v2/univregs-stats/"+params.community+"/"+params.year, {
			method: "PUT",
			body: JSON.stringify({
                community : params.community,
                year : parseInt(updatedYear),
                univreg_gob : parseInt(updatedGob),
                univreg_educ : parseInt(updatedEduc),
                univreg_offer : parseInt(updatedOffer)
            }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(res){
            if(res.ok){
            getUnivreg();
        }else if(res.status == 404){
                errorAlert("No se ha encontrado el elemento para editar");
        }else{
                errorAlert();
            }
		});
    }
</script>

<main>
   <h3> Edit Community {params.community}</h3>
   {#await univreg} 
        Loading univreg...
   {:then univreg}
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
                   <td>{updatedAutcom}</td>
                   <td>{updatedYear}</td>
                   <td><input type="number" bind:value = "{updatedGob}"></td>
                   <td><input type="number" bind:value = "{updatedEduc}"></td>
                   <td><input type="number" bind:value = "{updatedOffer}"></td>
                   <td> <Button outline color="primary" on:click={updateUnivreg} 
                       > Editar </Button> </td>
               </tr>
           </tbody>
       </Table>
{/await}
{#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
{/if}
<Button outline color="secondary" on:click="{pop}">Atras</Button>
</main>