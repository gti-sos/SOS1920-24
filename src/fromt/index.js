//este es siempre igual
import App from './App.svelte';//primer componente

const app = new App({//te creas una nueva aplicacion de svelte sobre
	target: document.querySelector("#App"),// un elemento index.html => lo tenemos en public, con querySelector quiere decir que busque en el fichero html del public y busque un div con una id igual a la que le ponemos
	/**props: {
		name: 'world'
	}**/
});

export default app;