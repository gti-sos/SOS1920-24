<script>
	import Router from 'svelte-spa-router'

	import Intcont from './intcont-stats/App.svelte';
	import Univreg from './univregs-stats/App.svelte';
	import Atc from './atcAPI/App.svelte';

	import EditAtc from './atcAPI/EditAtc.svelte';
	import EditIntcont from './intcont-stats/EditIntcont.svelte';
	import Edit from './univregs-stats/Edit.svelte';

	import ChartAtc from './atcAPI/ChartAtc.svelte';
	import ChartIntcont from './intcont-stats/ChartIntcont.svelte';
	import ChartUnivregs from './univregs-stats/ChartUnivregs.svelte';

	import ChartAtc2 from './atcAPI/ChartAtc2.svelte';
	import ChartIntcont2 from './intcont-stats/ChartIntcont2.svelte';

	import IntegrationAtc from './atcAPI/integrations.svelte'


	import ChartGroup from './ChartGroup.svelte';
	
	import Home from './Home.svelte'
	import NotFound from './NotFound.svelte'

	
	

	const routes = {
		"/": Home,
		"/intcont-stats": Intcont,
		"/intcont-stats/:aut_com/:year": EditIntcont,
		"/intcont-stats/chart": ChartIntcont,
		"/intcont-stats/chart2": ChartIntcont2,

		"/univreg-stats": Univreg,
		"/univreg-stats/:aut_com/:year": Edit,
		"/univreg-stats/chart": ChartUnivregs,

		"/atc-stats": Atc,
		"/atc-stats/:aut_com/:year": EditAtc,
		"/atc-stats/chart": ChartAtc,
		"/atc-stats/chart2": ChartAtc2,
		"/atc-stats/integrations": IntegrationAtc,

		"/analytics": ChartGroup,

		
		"*": NotFound
		
	};
</script>


<main>
	<Router {routes} />
</main>