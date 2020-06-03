<svelte:head>
  

  <script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-ui.min.js "on:load="{loadGraph}"></script>
  <script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-exports.min.js "></script>
  <script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-base.min.js"></script>
 
  

  <link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" type="text/css" rel="stylesheet">
  <link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css" type="text/css" rel="stylesheet">
  

</svelte:head> 
    

<main>

  
  <div id="container"></div>
</main>
 
    
      
    
<script>
  
  
  async function loadGraph() {
          // create data set on our data
    
          let MyData = [];
      const resData = await fetch("api/v2/univregs-stats");
      MyData = await resData.json();
      console.log(MyData);
      
      let NewData=[]; // esto sera mi nueva dataset
      let DataGob= [];//datos guardados
      let DataEduc= [];//datos guardados
      let DataOffer = [];//datos guardados

      let ArrayPoint = {};
      let cont = 0;//contador

     //vamos a tocar el series que es lo que muestra el data
     for(let item of MyData){
        let varname = item.community;
        let gob = item.univreg_educ;
        let educ = item.univreg_gob;
        let offer = item.univreg_offer;
        NewData.push([varname,gob,offer]);
        
        cont++;
        
      }
    console.log(NewData)
    var dataSet = anychart.data.set(NewData);
    
    var dataSet2 = anychart.data.set([['Lip gloss', 22998, 12043],
          ['Eyeliner', 12321, 15067],
          ['Eyeshadows', 12998, 12043],
          ['Powder', 10261, 14419],
          ['Mascara', 11261, 10419],
          ['Foundation', 10342, 10119],
          ['Rouge', 11624, 7004],
          ['Lipstick', 8814, 9054],
          ['Eyebrow pencil', 11012, 5067],
          ['Nail polish', 9814, 3054]
        ]);
            console.log(dataSet2);
            console.log(dataSet);
  
          // map data for the first series, take x from the zero column and value from the first column of data set
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });
  
          // map data for the second series, take x from the zero column and value from the second column of data set
    var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });
  
          // create column chart
    var chart = anychart.column();
  
          // turn on chart animation
    chart.animation(true);
  
          // set chart title text settings
    chart.title('Oferta y demanda de plazas universitarias segun la comunidad autonoma');
  
          // temp variable to store series instance
    var series;
  
          // helper function to setup label settings for all series
    var setupSeries = function (series, name) {
      series.name(name);
      series.selected().fill('#f48fb1 0.8').stroke('1.5 #c2185b');
    };
  
          // create first series with mapped data
    series = chart.column(firstSeriesData);
    series.xPointPosition(0.45);
    setupSeries(series, 'Demanda');
  
          // create second series with mapped data
    series = chart.column(secondSeriesData);
    series.xPointPosition(0.25);
    setupSeries(series, 'Oferta');
  
          // set chart padding
    chart.barGroupsPadding(0.3);
  
          // format numbers in y axis label to match browser locale
    chart.yAxis().labels().format('{%Value}{groupsSeparator: } plazas');
  
          // set titles for Y-axis
    chart.yAxis().title('Plazas universitarias');
  
          // turn on legend
    chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);
  
    chart.interactivity().hoverMode('single');
  
    chart.tooltip().format('{%Value}{groupsSeparator: } plazas');
  
          // set container id for the chart
    chart.container('container');
  
          // initiate chart drawing
    chart.draw();
  };
      
</script>


<style>
  
  
        
</style>
                  