<script>
    import {onMount} from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router"
    import Input from "sveltestrap/src/Input.svelte";

    export let params = {};
    let atc = {};
    let updatedAut_com = params.aut_com;
    let updatedYear = params.year;
    let updatedEspce = parseFloat(params.espce);
    let updatedYaq=parseInt(params.yaq);
    let updatedObu=parseInt(params.obu);

    onMount(getAtc);

    async function getAtc() {
        console.log("Fetching atc...");
        const res = await fetch("/api/v2/atc-stats/" + params.aut_com + "/" + params.year);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            atc = json;
            updatedAut_com = atc.aut_com;
            updatedYear = atc.year;
            updatedEspce = atc.espce;
            updatedYaq = atc.yaq;
            updatedObu = atc.obu;
            console.log("Received contact.");
        } else {
            console.log("ERROR!");
        }
    }

    async function updateAtc() {
        console.log("Updating atc...");
        const res = await fetch("/api/v2/atc-stats/" + params.aut_com + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                aut_com: params.aut_com,
                year: parseInt(params.year),
                espce: updatedEspce,
                yaq: updatedYaq,
                obu: updatedObu
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if (res.ok) {
                getAtc();
                AlertInstructions();
            
            } else if (res.status == 404){
                errorAlert=("No se han podido encontrar los datos.");
            }else {
                errorAlert=("");
            }
           
        });
    }

	function errorAlert(error){
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 33%;";
		alert_element.className = " alert alert dismissible in alert-danger ";
        alert_element.innerHTML = "ERROR. La instruccion no se a procesado correctamente " + error;
        setTimeout(() => {
			
		}, 10000);
	}

	function AlertInstructions(){
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 33%;";
		alert_element.className = " alert alert dismissible in alert-info ";
        alert_element.innerHTML = "La instruccion se a procesado correctamente ";
        setTimeout(() => {
			
		}, 10000);
	}

</script>

<main>
    <div role ="alert" id ="div_alert" style = "background-color:rebeccapurple;">
	</div>
    <h2  style="text-align: center;"><small> Editar datos: </small></h2>
    <h2  style="text-align: center; margin-bottom: 2%;"><small><strong>{params.aut_com}</strong> - <strong>{params.year}</strong></small></h2>
    {#await atc}
        Loading atc...
    {:then atc}
        <Table bordered>
            <thead>
				<tr>
					<th>Comunidad Autonoma</th>
					<th>Año</th>
					<th>Datos de la pagina espce</th>
					<th>Datos de la pagina yaq</th>
                    <th>Datos de la pagina obu</th>
                    <th> Acciones </th>
				</tr>
			</thead>
            <tbody>
                <tr>
                    <td>{updatedAut_com}</td>
                    <td>{updatedYear}</td>
                    <td><Input type="number" placeholder="0.0" step="0.01" min="0"  bind:value={updatedEspce}/></td>
                    <td><Input type="number"                                        bind:value={updatedYaq}/></td>
                    <td><Input type="number"                                        bind:value={updatedObu}/></td>
                    <td> <Button outline  color="primary" on:click={updateAtc}> <i class="fas fa-pencil-alt"></i> Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}"><i class="fas fa-arrow-circle-left"></i> Atrás</Button>
</main>