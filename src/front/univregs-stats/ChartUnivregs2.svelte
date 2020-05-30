<svelte:head>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"></script>
  <link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" type="text/css" rel="stylesheet">
  <link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css" type="text/css" rel="stylesheet">
 

</svelte:head> 
    

<main>

  
  <div id="container"></div>
</main>
 
    
      
    
<script>
  
  anychart.onDocumentReady(function () {
          // create data set on our data
    var dataSet = anychart.data.set([
            ['Lip gloss', 22998, 12043],
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
  
          // map data for the first series, take x from the zero column and value from the first column of data set
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });
  
          // map data for the second series, take x from the zero column and value from the second column of data set
    var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });
  
          // create column chart
    var chart = anychart.column();
  
          // turn on chart animation
    chart.animation(true);
  
          // set chart title text settings
    chart.title('Top 10 Products by Revenue in two Regions');
  
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
    setupSeries(series, 'Florida');
  
          // create second series with mapped data
    series = chart.column(secondSeriesData);
    series.xPointPosition(0.25);
    setupSeries(series, 'Texas');
  
          // set chart padding
    chart.barGroupsPadding(0.3);
  
          // format numbers in y axis label to match browser locale
    chart.yAxis().labels().format('${%Value}{groupsSeparator: }');
  
          // set titles for Y-axis
    chart.yAxis().title('Revenue in Dollars');
  
          // turn on legend
    chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);
  
    chart.interactivity().hoverMode('single');
  
    chart.tooltip().format('${%Value}{groupsSeparator: }');
  
          // set container id for the chart
    chart.container('container');
  
          // initiate chart drawing
    chart.draw();
  });
      
</script>


<style>
  html,
  body,
  #container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
        
</style>
                  