<!-- las aplicaciones svelte tiene 3 partes 
1) codigo script
2) codigo html
3) estilos -->
<script>
	//export let name;
	/**dar variable y coger variables con svelte**/
	//1)esto es para bajar datos, es decir, para mostrar datos
	//let definir una variable para que este disponible
	/**let myvar =1;**/
	//2)tambien podemos capturar datos que se pongan en la pagina
	
	/**como usamos MyContentTable**/
	import MyContentTable from './MyContentTable.svelte';//carga el componente svelte(html creado en src) en MycontentTable
	/****/

	
</script>

<main>
	<h1>Hello {name}!</h1>
	<!-- {myvar} -->
	<!--en input sirve para cambiar el contenido de la variable -->>
	<!-- vamos a capturar la informacion que tenga la variable name-->
	
	<input bind:value={name}>

	<MyContentTable/><!--nuevo componente-->>
	
	
</main>

