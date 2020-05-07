<script>
	import Router from 'svelte-spa-router'
	import Intcont from './intcont-stats/App.svelte';
	import Home from './Home.svelte'
	import NotFound from './NotFound.svelte'
	import EditIntcont from './intcont-stats/EditIntcont.svelte';
	import Atc from './atcAPI/App.svelte';
	import EditAtc from './atcAPI/EditAtc.svelte';


	const routes = {
		"/": Home,
		"/intcont-stats": Intcont,
		"/intcont-stats/:aut_com/:year": EditIntcont,
		"/atc-stats": Atc,
		"/atc-stats/:aut_com/:year": EditAtc,
		"*": NotFound
		
	};
</script>


