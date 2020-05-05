//svelte main file
import App from './App.svelte';

//initial svelte start
const app = new App({
	target: document.querySelector("#App"),
	props: {

	}
});

export default app;