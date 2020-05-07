<script>
	import Router from 'svelte-spa-router'
	import Intcont from './intcont-stats/App.svelte';
	import Home from './Home.svelte'
	import NotFound from './NotFound.svelte'
	import EditIntcont from './intcont-stats/EditIntcont.svelte';
	import GUI1 from './GUI1/Home.svelte';

	const routes = {
		"/": Home,
		"/intcont-stats": Intcont,
		"/intcont-stats/:aut_com/:year": EditIntcont,
		"/gui1": GUI1,
		"*": NotFound
		
	};
</script>


<main>
	<Router {routes} />
</main>