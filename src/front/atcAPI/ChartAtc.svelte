<script>

    import Button from "sveltestrap/src/Button.svelte";
    import {
        pop
    } from "svelte-spa-router";


  async  function loadGraphAtc()
    {
        //recojo los datos de mi servidor
        let MyDataAtc = [];
        const resData = await fetch("/api/v2/atc-stats");
        MyDataAtc = await resData.json();

        let MyDataAtcNew = [];//datos guardados
        let cont = 0;//contador
        let listcolor = [112233,223344,334455,445566,556677,667788,778899,889911,991122,998877,887766,776655,665544,554433,443322,332211,221100,110099,
                         112233,223344,334455,445566,556677,667788,778899,889911,991122,998877,887766,776655,665544,554433,443322,332211,221100,110099 ];
        //transformo los elementos
        for(let item of MyDataAtc){
            //variable id
            let varid = "'"+cont+"'";
            //variable name
            let varname = MyDataAtc[cont].aut_com
            //variable color
            let varcolor2 = "#"+listcolor[cont];
            //variables espce,yaq,obu
            let varespce = MyDataAtc[cont].espce;
            let varyaq = MyDataAtc[cont].yaq;
            let varobu = MyDataAtc[cont].obu;

            MyDataAtcNew.push({ id: varid ,name: varname, color: varcolor2 },
                           { name: 'espce', parent: varid, value: varespce},
                           { name: 'yaq', parent: varid, value: varyaq},
                           { name: 'obu', parent: varid, value:varobu})
                           cont++;


        }
        console.log(MyDataAtcNew);
        //console.log(MyDataAtcNew.length);

        Highcharts.chart('container',
         {
    series: [{
        type: "treemap",
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
            level: 1,
            layoutAlgorithm: 'sliceAndDice',
            dataLabels: {
                
                enabled: true,
                align: 'center',//nombre izquierda o derecha
                verticalAlign: 'top',//nombre arriba o abajo
                style: {//tamaño del nombre
                    fontSize: '15px',
                    fontWeight: 'bold'
                }
            }
                }],
        data: MyDataAtcNew
                
            }],
    title: {
                        text: 'Grafica de coste medio de matrícula univesitaria'
                    }
        });

    }

</script>

<svelte:head>
    <!--librerias externas de svelte para una grafica Tree map-->>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraphAtc}"></script>
    <script src="https://code.highcharts.com/modules/treemap.js" on:load="{loadGraphAtc}"></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadGraphAtc}"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphAtc}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>

    <Button outline color="secondary" on:click="{pop}"> Atrás </Button>
</main>


