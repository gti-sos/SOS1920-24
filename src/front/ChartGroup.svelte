<script>

import Button from "sveltestrap/src/Button.svelte";
    import {
        pop
    } from "svelte-spa-router";

    async function loadGraph(){
        //atc
        let MyDataAtc = [];
        const resDataAtc = await fetch("/api/v2/atc-stats");
        MyDataAtc = await resDataAtc.json();
        //console.log(MyDataAtc);
        //intcont
        let MyDataIntcont = [];
        const resDataIntcont = await fetch("/api/v2/intcont-stats");
        MyDataIntcont = await resDataIntcont.json();
        //console.log(MyDataIntcont);
        //univregs
        let MyDataUnivRegs = [];
        const resDataUnivRegs = await fetch("/api/v2/univregs-stats");
        MyDataUnivRegs = await resDataUnivRegs.json();
        //console.log(MyDataUnivRegs);
    
        

        let MyDataAtcNew = [];//datos guardados atc
        let MyDataIntcontNew = [];//datos guardados intcont
        let MyDataUnivRegsNew = [];//datos guardados intcont
        let cont = 0;//contador

        for(let item of MyDataAtc){
            //atc
            let varnameAtc = MyDataAtc[cont].aut_com;
            let varespce = MyDataAtc[cont].espce;
            let varyaq = MyDataAtc[cont].yaq;
            let varobu = MyDataAtc[cont].obu;
            let varValueAtc = varespce + varyaq + varobu;
            MyDataAtcNew.push({name: varnameAtc, value: varValueAtc })

            //intcont
            let varnameIntcont = MyDataIntcont[cont].aut_com;
            let varccoo = MyDataIntcont[cont].ccoo;
            let varsepe = MyDataIntcont[cont].sepe;
            let vargobesp = MyDataIntcont[cont].gobesp;
            let varValueIntcont = varccoo+varsepe+vargobesp;
            MyDataIntcontNew.push({name :varnameIntcont, value: varValueIntcont })
            
            //univreg
            let varnameUnivRegs = MyDataUnivRegs[cont].community;

            let vargob = MyDataUnivRegs[cont].univreg_gob;
            let vareduc = MyDataUnivRegs[cont].univreg_educ;
            let varoffer = MyDataUnivRegs[cont].univreg_offer;
            let varValueUnivRegs = vargob+vareduc+varoffer;
            MyDataUnivRegsNew.push({name :varnameUnivRegs, value: varValueUnivRegs})
            
            cont++;
        }
        //console.log(MyDataAtcNew);
        //console.log(MyDataIntcontNew);
        //console.log(MyDataUnivRegsNew);

        let DataGraft = [

            {name : "Atc", data: MyDataAtcNew},
            {name : "Intcont", data : MyDataIntcontNew},
            {name : "UnivRegs", data : MyDataUnivRegsNew}

        ]

        console.log(DataGraft);

        Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Grafica sobre Costo promedio de matrícula, Cantidad de matrícula universitaria, Residuos públicos en la universidad / contratos de pasantía'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value} Euros'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: DataGraft
    });

    
    }
</script>

<svelte:head>
	
	<script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
	<script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>
	<script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>
	<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
    
</svelte:head>

<main>

	<figure class="highcharts-figure">
		<div id="container"></div>
	</figure>
	
	<Button outline color="secondary" on:click="{pop}"><i class="fas fa-arrow-circle-left"></i> Atrás</Button>

</main>

<style>

.highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
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