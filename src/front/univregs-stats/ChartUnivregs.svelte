<script>
  import Button from "sveltestrap/src/Button.svelte";
    import {
        pop
    } from "svelte-spa-router";
    async  function loadGraph(){

      //recojo los datos de mi servidor
      //https://sos1920-24.herokuapp.com/#/univreg-stats
      ///api/v2/univregs-stats
      let MyData = [];
      const resData = await fetch("api/v2/univregs-stats");
      MyData = await resData.json();
      console.log(MyData);
      
      let DataGob= [];//datos guardados
      let DataEduc= [];//datos guardados
      let DataOffer = [];//datos guardados

      let ArrayPoint = {};
      let cont = 0;//contador
      
      //quiero que categories represente las comunidades autonomas
      let ejeX = [];
      

     //vamos a tocar el series que es lo que muestra el data
     for(let item of MyData){
        let varname = item.community;
        let gob = item.univreg_educ;
        let educ = item.univreg_gob;
        let offer = item.univreg_offer;
        DataGob.push(gob);
        DataEduc.push(educ);
        DataOffer.push(offer);
        ejeX.push(varname);
        
        cont++;
        
      }
      console.log(DataGob);
      console.log(ejeX);
      /*
        {
        name: 'John',
        data: [5, 3, 4, 7, 2,5,6]
      }
      */
      
    //parte del chart

      Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Oferta y demanda de plaza universitarias'
      },
      xAxis: {
        categories: ejeX
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Plazas universitarias'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: ( // theme
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color
            ) || 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'DemandaGob',
        data: DataGob
      }, {
        name: 'DemandaEduc',
        data: DataEduc
      }, {
        name: 'Oferta',
        data: DataOffer
      }]
    });


  }

</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
  <script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadGraph}" ></script>
  <script src="https://code.highcharts.com/modules/export-data.js" on:load="{loadGraph}"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js " on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
     
    </p>
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

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #EBEBEB;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
 

</style>