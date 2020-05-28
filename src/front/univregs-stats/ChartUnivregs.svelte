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
 

  //parte del chart

  Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Stacked column chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
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
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
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
      Chart showing stacked columns for comparing quantities. Stacked charts
      are often used to visualize data that accumulates to a sum. This chart
      is showing data labels for each individual section of the stack.
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