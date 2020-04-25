//este es siempre igual
import App from './App.svelte';//primer componente

const app = new App({//te creas una nueva aplicacion de svelte sobre
	target: document.querySelector("#App")
});

export default app;