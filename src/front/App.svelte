<script>
	import Router from 'svelte-spa-router'
	import IntcontTable from './IntcontTable.svelte';
	import Home from './Home.svelte'
	import NotFound from './NotFound.svelte'
	import EditIntcont from './EditIntcont.svelte';
	import GUI1 from './GUI1/Home.svelte';
	import GUI2 from './GUI2/Home.svelte';
	const routes = {
		"/": Home,
		"/intconts": IntcontTable,
		"/intcont/:aut_com": EditIntcont,
		"/gui1": GUI1,
		"/gui2": GUI2,
		"*": NotFound
		
	};
</script>


<main>
	<Router {routes} />
</main>