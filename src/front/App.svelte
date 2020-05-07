<<<<<<< HEAD
<script>
	import Router from 'svelte-spa-router'
	import Intcont from './intcont-stats/App.svelte';
	import Home from './Home.svelte'
	import NotFound from './NotFound.svelte'
	import EditIntcont from './intcont-stats/EditIntcont.svelte';

	const routes = {
		"/": Home,
		"/intcont-stats": Intcont,
		"/intcont-stats/:aut_com/:year": EditIntcont,
		"*": NotFound
		
	};
</script>


<main>
	<Router {routes} />
</main>
=======
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
		"/atc-stats": Atc,
		"/atc-stats/:aut_com/:year": EditAtc,
		"*" : NotFound
	}
</script>

<main>
	<h1 class="display-2" style="text-align:center;" >SOS1920-24</h1>
	<Router {routes}/>

</main>

>>>>>>> fc25ade... cambios 52
