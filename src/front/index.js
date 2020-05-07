<<<<<<< HEAD
//svelte main file
import App from './App.svelte';

//initial svelte start
const app = new App({
	target: document.querySelector("#App"),
	props: {

	}
=======
//este es siempre igual
import App from './App.svelte';//primer componente

const app = new App({//te creas una nueva aplicacion de svelte sobre
	target: document.querySelector("#App")
>>>>>>> fc25ade... cambios 52
});

export default app;