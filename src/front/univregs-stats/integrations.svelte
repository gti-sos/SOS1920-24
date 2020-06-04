<script>
import Button from "sveltestrap/src/Button.svelte";
    import {
        pop
    } from "svelte-spa-router";
    async  function loadGraph(){
      //mis datos 
      let MyData = [];
      const resData = await fetch("api/v2/univregs-stats");
      MyData = await resData.json();
      console.log(MyData);
        
      let DataGob= [];//datos guardados
        //let DataEduc= [];//datos guardados
      let DataOffer = [];//datos guardados

      let cont = 0;//contador
      
      //quiero que categories represente las comunidades autonomas
      let ejeX1 = [];
      let ejeX2=[];
      let ejeX3 = [];
      let ejeXEx1 = [];
      let ejeXEx2 = [];

     //vamos a tocar el series que es lo que muestra el data
      for(let item of MyData){
        let varname = item.community;
        let gob = item.univreg_educ;
        //let educ = item.univreg_gob
        let offer = item.univreg_offer;
        DataGob.push(gob);
        //DataEduc.push(educ);
        DataOffer.push(offer);
        ejeX1.push(varname);
        ejeX2.push(varname);
        ejeX3.push(varname);
        ejeXEx1.push(varname);
        ejeXEx2.push(varname); 
        cont++;
            
      }
      //console.log(ejeX1);
      //console.log(cont);
      

      //vamos a obtener los datos del grupo 21. Traffic-injuries
      let MyData21 = [];
      const resData21 = await fetch("https://sos1920-21.herokuapp.com/api/v2/traffic-injuries");
      MyData21 = await resData21.json();
      //console.log(MyData21);
      let muertos = [];
      let accidentes = [];
      
      for(let i=0;i<cont;i++){
        accidentes.push(0);
        muertos.push(0);
      }  
      for(let item2 of MyData21 ){
        if(item2.year === 2018){
         
          let varname2 = item2.auto_com;
          let accident = item2.accident;
          let dead = item2.dead;
          muertos.push(dead);
          accidentes.push(accident);
          ejeX1.push(varname2);      
        } 
      }
        
      //console.log(DataGob);
      //console.log(ejeX1);
      Highcharts.chart('container21', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Comparacion de oferta y demanda de plazas universitarias con las muertes y accidentes de trafico'
      },
      xAxis: {
        categories: ejeX1
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Datos recogidos'
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
      }, /*{
        name: 'DemandaEduc',
        data: DataEduc
      },*/ {
        name: 'Oferta',
        data: DataOffer
      },{
        name: 'Muertos',
        data: muertos
      },{
        name: 'Accidentes',
        data: accidentes
      }]
    });

      //vamos con los datos de global-divorces
      /*let MyData10 = [];
      const resData10 = await fetch("https://sos1920-10.herokuapp.com/api/v2/global-divorces");
      MyData10 = await resData10.json();
      console.log(MyData10);*/
      const BASE_API_URL_G10 = "api/v2/global-divorces";
      const resG10 = await fetch(BASE_API_URL_G10);
      let MyData10 = await resG10.json();
      let divorcios = [];
      for(let i=0;i<cont;i++){
        divorcios.push(0);
        
      }
      
      for(let item of MyData10){
        let varname = item.country;
        let divorce = item.divorce;
        divorcios.push(divorce);
        ejeX2.push(varname);
      }
      
      Highcharts.chart('container10', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Oferta y demanda de plaza universitarias vs divorcios'
      },
      xAxis: {
        categories: ejeX2
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Datos recogidos'
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
      }, /*{
        name: 'DemandaEduc',
        data: DataEduc
      },*/ {
        name: 'Oferta',
        data: DataOffer
      },{
        name: 'Divorcios',
        data: divorcios
      }]
    });
      
    //vamos con los datos de equipos de futbol 
      let MyData26 = [];
      const resData26 = await fetch("https://sos1920-26.herokuapp.com/api/v3/global-transfers");
      MyData26 = await resData26.json();
      console.log(MyData26);
      let firmas = [];
      let ventas = [];

      for(let i=0;i<cont;i++){
        firmas.push(0);
        ventas.push(0);
      }
      
      for(let item of MyData26){
          let varname = item.team;
          let signing = item.signing;
          let sale = item.sale;
          firmas.push(signing);
          ventas.push(sale);
          ejeX3.push(varname);
      }
        
      console.log(ejeX3);

        Highcharts.chart('container26', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Comparacion de oferta y demanda de plazas universitarias con firmas y ventas de equipos de futbol'
      },
      xAxis: {
        categories: ejeX3
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Datos recogidos'
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
      }, /*{
        name: 'DemandaEduc',
        data: DataEduc
      },*/ {
        name: 'Oferta',
        data: DataOffer
      },{
        name: 'Firmas',
        data: firmas
      },{
        name: 'Ventas',
        data: ventas
      }]
    });
      
      //https://disease.sh/v2/states?sort=deaths&yesterday=false

      let MyDataEx1 = [];
      const resDataEx1 = await fetch("https://disease.sh/v2/states?sort=deaths&yesterday=false");
      MyDataEx1 = await resDataEx1.json();
      //console.log(MyDataEx1);
      let casos = [];
      let muertes = [];
      for(let i=0;i<cont;i++){
        casos.push(0);
        muertes.push(0);
      }
      let i = 0;
      for (let item of MyDataEx1) {
        
        let varname = item.state;
        let cases = item.cases;
        let deaths = item.deaths;
        if(i<11){
          i++;
          casos.push(cases);
          muertes.push(deaths);
          ejeXEx1.push(varname);
        }
        
      }

      Highcharts.chart('containerEx1', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'oferta y demanda de pla.univ vs muertes y casos de covid en 10 estados de EEUU'
      },
      xAxis: {
        categories: ejeXEx1
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Datos recogidos'
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
      },{
        name: 'Oferta',
        data: DataOffer
      },{
        name: 'Muertes',
        data: muertes
      },{
        name: 'Casos',
        data: casos
      }]
    });

      let MyDataEx2 = [];
      const resDataEx2 = await fetch("https://canada-holidays.ca/api/v1/holidays");
      MyDataEx2 = await resDataEx2.json();
      console.log(MyDataEx2);
      
      let MyRealDataEx2 = MyDataEx2.holidays[0];
      console.log(MyRealDataEx2);
      
      let valor = [];
      for(let i=0;i<cont;i++){
        valor.push(0);
      }
      let varname = MyRealDataEx2.nameEn;
      let value  = MyRealDataEx2.provinces.length;
      ejeXEx2.push(varname);
      valor.push(value);
      console.log(value.length);
      console.log(ejeXEx2);

      Highcharts.chart('containerEx2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'oferta y demanda de pla.univ vs nºProvincias en Canada que tienen una fiesta'
      },
      xAxis: {
        categories: ejeXEx2
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Datos recogidos'
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
      },{
        name: 'Oferta',
        data: DataOffer
      },{
        name: 'Nº Provincias',
        data: valor
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
        <div id="container21"></div>
        <p class="highcharts-description">
         
        </p>
      </figure>

      <figure class="highcharts-figure">
        <div id="container10"></div>
        <p class="highcharts-description">
         
        </p>
      </figure>
    
    <figure class="highcharts-figure">
      <div id="container26"></div>
      <p class="highcharts-description">
         
      </p>
    </figure>
    <figure class="highcharts-figure">
      <div id="containerEx1"></div>
      <p class="highcharts-description">
         
      </p>
    </figure>
    <figure class="highcharts-figure">
      <div id="containerEx2"></div>
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
