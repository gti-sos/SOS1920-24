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
	import ContactsTable from './ContactsTable.svelte';
</script>

<main>
<ContactsTable/> <!--nuevo componente-->

</main>

>>>>>>> fc25ade... cambios 52
