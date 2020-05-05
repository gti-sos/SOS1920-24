<!--pagina principal-->
<script>
	//tabla de rutas
	import Router from 'svelte-spa-router';
	
	
	import Home from './Home.svelte';
	import Atc from './atcAPI/App.svelte';
	import EditAtc from './atcAPI/EditAtc.svelte';




	import NotFound from './NotFound.svelte';
	

	const routes = {
		"/":Home,
		
		"/atc": Atc,
		"/atc-stats/:aut_com/:year": EditAtc,


		"*" : NotFound
	}
</script>

<main>

	<h1>Manager API</h1>
	<Router {routes}/>

</main>

