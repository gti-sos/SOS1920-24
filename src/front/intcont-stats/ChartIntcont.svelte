<script>

    import {onMount} from 'svelte';
    async function loadGraph(){
        /*Returning data from de backend*/
        let IntcontData = [];
        const resData = await fetch("/api/v2/intcont-stats");
        IntcontData = await resData.json();
        let totalValues=[0,0,0];
        let cont = 0;
        IntcontData.forEach((i)=>{
            totalValues[0]+=i.ccoo;
            totalValues[1]+=i.sepe;
            totalValues[2]+=i.gobesp;
        });
        console.log(totalValues);
        let GraphData =[];

        IntcontData.forEach((i)=>{
            let name = i.aut_com;
            let y = (i.gobesp * 100) / totalValues[0];
            GraphData.push({name: name, y: y});
            cont++;
        });
        console.log(GraphData);
        
        Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});

// Build the chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Gasto Público en Universidades por Comunidad Autónoma = '+ totalValues[2] +' miles de euros'
    },
    tooltip: {
        pointFormat: '% del Total: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        data: GraphData
    }]
});
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            La grafica nos muestra el porcentaje de gasto publico en educación universitaria por comunidad autónoma
            segun las estadisticas del <a href="http://estadisticas.mecd.gob.es/EducaJaxiPx/Datos.htm?path=/Recursosecon/Becas/2017-18/Universitarias//l0/&file=Universitaria2.px">GOBESP</a>
        </p>
    </figure>
</main>
<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 660px;
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