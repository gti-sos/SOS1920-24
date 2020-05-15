<script>
  async  function loadGraphAtc()
    {
        //recojo los datos de mi servidor
        let MyDataAtc = [];
        const resData = await fetch("/api/v2/atc-stats");
        MyDataAtc = await resData.json();


        let MyDataAtcNew = [];//datos guardados
        let cont = 0;//contador
        
        //transformo los elementos
        for(let item of MyDataAtc){

            MyDataAtcNew += "{ id: '"+cont+"' ,"+"name: '"+MyDataAtc[cont].aut_com +"', color: \"#626567\" },"
            +"{ name: 'espce', parent: '"+cont+"', value:"+MyDataAtc[cont].espce+"},"
            +"{ name: 'yaq', parent: '"+cont+"', value:"+MyDataAtc[cont].yaq+"},"
            +"{ name: 'obu', parent: '"+cont+"', value:"+MyDataAtc[cont].obu+"},\n"

            cont++;
        }

        console.log(MyDataAtcNew);

        //let test1 = { id: '2' ,name: 'Asturias', color: "#626567" },{ name: 'espce', parent: '2', value: 1255.8 },{ name: 'yaq', parent: '2', value:1322},{ name: 'obu', parent: '2', value:1322},

        /**
            {id: '1', name: 'Canarias', color: "#626567" },
            {name: 'espce', parent: '1', value: 941.4}, 
                    { name: 'yaq', parent: '1', value: 1046 },
                    {name: 'obu', parent: '1',value: 1137}
                    **/

       

        

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
                align: 'left',
                verticalAlign: 'top',
                style: {
                    fontSize: '15px',
                    fontWeight: 'bold'
                }
            }
                }],
        data: 
         [
             MyDataAtcNew,

         { id: '1',name: 'Canarias', color: "#626567" },
         { name: 'espce', parent: '1', value: 941.4}, 
         { name: 'yaq',parent: '1',value: 1046 },
         { name: 'obu', parent: '1', value: 1137},

         

         

                    //elemento por defecto
                        {
                                name: 'TestDefecto',
                                parent: 'Kiwi',
                                value: 1000,
                                color: '#9EDE00'
                            }
            ]
            
    
            }],
                    title: {
                        text: 'Grafica de coste medio de matrícula univesitaria'
                    }
        });

    }

</script>

<svelte:head>
    <!--librerias externas de svelte para una grafica Tree map-->>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphAtc}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>

</main>