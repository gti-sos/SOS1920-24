<script>
    import {onMount} from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router"
    import Input from "sveltestrap/src/Input.svelte";

    export let params = {};
    let atc = {};
    let updatedAut_com = "";
    let updatedYear = 0;
    let updatedEspce=0.0;
    let updatedYaq=0;
    let updatedObu=0;

    onMount(getAtc);

    async function getAtc() {
        console.log("Fetching atc...");
        const res = await fetch("/api/v1/atc-stats/" + params.aut_com + "/" + params.year);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            atc = json;
            updatedAut_com = atc.aut_com;
            updatedYear = atc.year;
            updatedEspce = atc["updated-Espce"];
            updatedYaq = atc["updated-Yaq"];
            updatedObu = atc["updated-Obu"];
            console.log("Received contact.");
        } else {
            console.log("ERROR!");
        }
    }

    async function updateAtc() {
        console.log("Updating atc...");
        const res = await fetch("/api/v1/atc-stats/" + params.aut_com + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                aut_com: params.aut_com,
                year: parseInt(params.year),
                "updated-Espce": updatedEspce,
                "updated-Yaq": updatedYaq,
                "updated-Obu": updatedObu
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if (res.ok) {
                getAtc();
                updateAlert();
            } else if (res.status == 404){
                errorAlert=("Se ha intentado borrar un elemento inexistente.");
            }else {
                errorAlert=("");
            }
           
        });
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
    
    function updateAlert(){
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = " alert alert dismissible in alert-info ";
		alert_element.innerHTML = "<strong>¡Datos actualizado!</strong> El dato se ha actualizado correctamente!";
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

    
    <div role ="alert" id ="div_alert" style = "display: none;">
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
                    <td><Input type="number" placeholder="0.0" step="0.01" min="0"  bind:value="{updatedEspce}"/></td>
                    <td><Input type="number"                                        bind:value="{updatedYaq}"/></td>
                    <td><Input type="number"                                        bind:value="{updatedObu}"/></td>
                    <td> <Button outline  color="primary" on:click={updateAtc}> <i class="fas fa-pencil-alt"></i> Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    <Button outline color="secondary" on:click="{pop}"><i class="fas fa-arrow-circle-left"></i> Atrás</Button>
</main>