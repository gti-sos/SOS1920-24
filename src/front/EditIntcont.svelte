<script>
    import {onMount} from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router"
    export let params = {};
    let intcont = {};

    let updatedAutcom=intcont.aut_com;
    let updatedYear=params.year;
    let updatedCcoo=2000;
    let updatedSepe=2000;
    let updatedGobesp=20000.0;
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
            updatedAutcom=intcont.aut_com;
            updatedYear=intcont.year;
            updatedCcoo=intcont.ccoo;
            updatedSepe=intcont.sepe;
            updatedGobesp=intcont.gobesp;
			//lo cargamos dentro de la variable
			intcont = json;
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
                year : updatedYear,
                ccoo : updatedCcoo,
                sepe : updatedSepe,
                gobesp : updatedGobesp
            }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(res){
			getIntcont();
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
                   <td>{updatedAutcom}</td>
                   <td>{updatedYear}</td>
                   <td><input bind:value = "{updatedCcoo}"></td>
                   <td><input bind:value = "{updatedSepe}"></td>
                   <td><input bind:value = "{updatedGobesp}"></td>
                   <td> <Button outline color="primary" on:click={updateIntcont} 
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