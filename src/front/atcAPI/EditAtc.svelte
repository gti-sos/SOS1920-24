<script>
    import {onMount} from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router"
    
    export let params = {};
    
    let atc = {};
    let updatedAutcom=atc.aut_com;
    let updatedYear=params.year;
    let updatedEspce=2000.0;
    let updatedYaq=2000;
    let updatedObu=20000;
    let errorMsg="";
    onMount(getAtc);
	
	async function getAtc(){
		console.log("Fetching atc");
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/atc-stats/"+params.aut_com+"/"+params.year);
		if(res.ok){
			console.log("Ok:");
			//recogemos los datos json de la API
            const json = await res.json();
            updatedAutcom=atc.aut_com;
            updatedYear=atc.year;
            updatedEspce=atc.espce;
            updatedYaq=atc.yaq;
            updatedObu=atc.obu;
			//lo cargamos dentro de la variable
			atc = json;
			console.log("Received data.");
		}else{
            errorMsg = res.status = ":" + res.statusText;
            console.log("ERROR en get");
		}
    }
    
   async function updateAtc(){
    console.log("Updating atc"+JSON.stringify(params.aut_com));
		//fetch es la solicitud a la API
		const res = await fetch("/api/v1/atc-stats/"+params.aut_com+"/"+params.year, {
			method: "PUT",
			body: JSON.stringify({
                aut_com : params.aut_com,
                year : updatedYear,
                espce : updatedEspce,
                yaq : updatedYaq,
                obu : updatedObu
            }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(res){
			getAtc();
		});
    }

</script>

<main>
   <h3> Edit Contact {params.aut_com}</h3>
   {#await atc} 
        Loading atc...
   {:then atc}
       <Table bordered> 
           <thead>
               <tr>
                   <th>aut_com </th>
                   <th>year  </th>
                   <th>espce </th>
                   <th>yaq   </th>
                   <th>obu  </th>	
                   <th>Actions </th>	
               </tr>
           </thead>
           <tbody>
               <tr> 
                   <td>{updatedAutcom}</td>
                   <td>{updatedYear}</td>
                   <td><input bind:value = "{updatedEspce}"></td>
                   <td><input bind:value = "{updatedYaq}"></td>
                   <td><input bind:value = "{updatedObu}"></td>
                   <td> <Button outline color="primary" on:click={updateAtc} 
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