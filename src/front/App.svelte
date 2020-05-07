<script>
	import Router from 'svelte-spa-router'

	import Intcont from './intcont-stats/App.svelte';
	import Univreg from './univregs-stats/App.svelte';

	import Atc from './atcAPI/App.svelte';
	import EditAtc from './atcAPI/EditAtc.svelte';
	
	import EditIntcont from './intcont-stats/EditIntcont.svelte';
	import Edit from './univregs-stats/Edit.svelte';
	
	import Home from './Home.svelte'
	import NotFound from './NotFound.svelte'

	
	

	const routes = {
		"/": Home,
		"/intcont-stats": Intcont,
		"/intcont-stats/:aut_com/:year": EditIntcont,

		"/univreg-stats": Univreg,
		"/univreg-stats/:aut_com/:year": Edit,

		"/atc-stats": Atc,
		"/atc-stats/:aut_com/:year": EditAtc,
		
		"*": NotFound
		
	};
</script>


<main>
	<Router {routes} />
</main>