<script>
    async  function loadGraph(){
 
     //recojo los datos de mi servidor
     let MyData = [];
     const resData = await fetch("https://sos1920-24.herokuapp.com/api/v2/univregs-stats");
     MyData = await resData.json();
     console.log(MyData);
     let NewData= [];//datos guardados
     let ArrayPoint = {};
     let cont = 0;//contador
 
     //iniciamos a rellenar la tabla con datos
 
     //primero accedemos a la parte de la tabla donde se alojaran los datos
     var contenido = document.querySelector('#datos');
 
     //bucle for con los datos json
     
     contenido.innerHTML = ''
             for(let item of MyData){
                 // console.log(valor.nombre)
 
                 //quiero que sea por orden, nombre+año, valor1,valor2,valor3
                 contenido.innerHTML += `
                 
                 <tr>
                     <th> ${item.community} </th>
                     <td>${ item.univreg_gob }</td>
                     <td>${ item.univreg_educ }</td>
                     <td>${ item.univreg_offer}</td>
                 </tr>
                 
                 ` ;
                 cont++;
             }
 
     NewData = document.querySelector('#datatable');
     console.log(NewData);
     // parte del chart
 
     Highcharts.chart('container' ,{
       data: {
         table: 'datatable'
       },
       chart: {
         type: 'column'
       },
       title: {
         text: 'Grafica sobre oferta y demanda de plaza universitaria'
       },
       yAxis: {
         allowDecimals: false,
         title: {
           text: 'Units'
         }
       },
       tooltip: {//si cambio lo del eje Y se cambia el nombre que aparece reflejado en las barras
         formatter: function () {
           return '<b>' + this.series.name + '</b><br/>' +
 
             this.point.y + ' ' + this.point.name;
         }
       }
     });
 }
 
 </script>
 
 <svelte:head>
     <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
     <script src="https://code.highcharts.com/modules/series-label.js" on:load="{loadGraph}"></script>
     <script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadGraph}"></script>
     <script src="https://code.highcharts.com/modules/export-data.js" on:load="{loadGraph}"></script>
     <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
 </svelte:head>
 
 <main>
     <figure class="highcharts-figure">
         <div id="container"></div>
         <p class="highcharts-description">
           Grafica que representa la oferta y la demanda de plazas universitarias por comunidades autonomas de España.
         </p>
       
         
           <table id="datatable">
             <thead>
               <tr>
                 <th>Comunidad</th>
                 <th>demanda-gob</th>
                 <th>demanda-educ</th>
                 <th>oferta</th>
               </tr>
             </thead>
             <tbody id="datos">
                 
             </tbody>
           </table>
       </figure>
 </main>
 
 <style>
 
 #container {
   height: 400px;
 }
 
 .highcharts-figure, .highcharts-data-table table {
   min-width: 310px;
   max-width: 800px;
   margin: 1em auto;
 }
 
 #datatable {
   font-family: Verdana, sans-serif;
   border-collapse: collapse;
   border: 1px solid #EBEBEB;
   margin: 10px auto;
   text-align: center;
   width: 100%;
   max-width: 500px;
 }
 #datatable caption {
   padding: 1em 0;
   font-size: 1.2em;
   color: #555;
 }
 #datatable th {
     font-weight: 600;
   padding: 0.5em;
 }
 #datatable td, #datatable th, #datatable caption {
   padding: 0.5em;
 }
 #datatable thead tr, #datatable tr:nth-child(even) {
   background: #f8f8f8;
 }
 #datatable tr:hover {
   background: #f1f7ff;
 }
 
 </style>