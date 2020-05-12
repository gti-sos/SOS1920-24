<script>
  async  function loadGraphAtc()
    {
        //recojo los datos de mi servidor
        let MyDataAtc = [];

        const resData = await fetch("/api/v2/atc-stats");
        MyDataAtc = await resData.json();

        //console.log(MyDataAtc);

        

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
            //colores de caja
            {
            id: '1',
            name: 'Andalucia',
            color: "#EC2500" 
            },{
            id: '2',
            name: 'Aragon',
            color: "#DC7633" 
            },{
            id: '3',
            name: 'Asturias',
            color: "#34495E" 
            },{
            id: '4',
            name: 'IslasBaleares',
            color: "#48C9B0" 
            },{
            id: '5',
            name: 'Canarias',
            color: "#626567" 
            },{
            id: '6',
            name: 'Cantabria',
            color: "#1A237E" 
            },{
            id: '7',
            name: 'CastillaYLeon',
            color: "#EC2500" 
            },{
            id: '8',
            name: 'CastillaLaMancha',
            color: "#EC2500" 
            },{
            id: '9',
            name: 'Catalunya',
            color: "#EC2500" 
            },{
            id: '10',
            name: 'ComunidadValenciana',
            color: "#EC2500" 
            },{
            id: '11',
            name: 'Extremadura',
            color: "#EC2500" 
            }, 
            {
            id: '12',
            name: 'Galicia',
            color: "#ECE100"
            }, 
            {
            id: '13',
            name: 'Madrid',
            color: '#EC9800'
            }, {
            id: '14',
            name: 'Murcia',
            color: '#EC9800'
            },{
            id: '15',
            name: 'Navarra',
            color: '#EC9800'
            },{
            id: '16',
            name: 'PaisVasco',
            color: '#EC9800'
            },{
            id: '17',
            name: 'LaRioja',
            color: '#EC9800'
            },
            //elementos de las cajas
                    {
                    name: 'espce',
                    parent: '1',
                    value: 757.2
                    }, 
                    {
                    name: 'yaq',
                    parent: '1',
                    value: 757
                    },
                    {
                    name: 'obu',
                    parent: '1',
                    value: 757
                    }, 

                    {
                    name: 'espce',
                    parent: '2',
                    value: 1403.4
                    }, 
                    {
                    name: 'yaq',
                    parent: '2',
                    value: 1403
                    },
                    {
                    name: 'obu',
                    parent: '2',
                    value: 1550
                    }, 

                    {
                    name: 'espce',
                    parent: '3',
                    value: 1255.8
                    }, 
                    {
                    name: 'yaq',
                    parent: '3',
                    value: 1322
                    },
                    {
                    name: 'obu',
                    parent: '3',
                    value: 1322
                    }, 

                    {
                    name: 'espce',
                    parent: '4',
                    value: 1249.2
                    }, 
                    {
                    name: 'yaq',
                    parent: '4',
                    value: 1388
                    },
                    {
                    name: 'obu',
                    parent: '4',
                    value: 1388
                    }, 

                    {
                    name: 'espce',
                    parent: '5',
                    value: 941.4
                    }, 
                    {
                    name: 'yaq',
                    parent: '5',
                    value: 1046
                    },
                    {
                    name: 'obu',
                    parent: '5',
                    value: 1137
                    }, 

                    {
                    name: 'espce',
                    parent: '6',
                    value: 964.2
                    }, 
                    {
                    name: 'yaq',
                    parent: '6',
                    value: 964
                    },
                    {
                    name: 'obu',
                    parent: '6',
                    value: 999
                    }, 

                    {
                    name: 'espce',
                    parent: '7',
                    value: 1724.4
                    }, 
                    {
                    name: 'yaq',
                    parent: '7',
                    value: 1815
                    },
                    {
                    name: 'obu',
                    parent: '7',
                    value: 1815
                    }, 

                    {
                    name: 'espce',
                    parent: '8',
                    value: 1132.2
                    }, 
                    {
                    name: 'yaq',
                    parent: '8',
                    value: 1132
                    },
                    {
                    name: 'obu',
                    parent: '8',
                    value: 1132
                    }, 

                    {
                    name: 'espce',
                    parent: '9',
                    value: 2371.8
                    }, 
                    {
                    name: 'yaq',
                    parent: '9',
                    value: 2372
                    },
                    {
                    name: 'obu',
                    parent: '9',
                    value: 2372
                    }, 

                    {
                    name: 'espce',
                    parent: '10',
                    value: 1269.0
                    }, 
                    {
                    name: 'yaq',
                    parent: '10',
                    value: 1389
                    },
                    {
                    name: 'obu',
                    parent: '10',
                    value: 1493
                    }, 

                    {
                    name: 'espce',
                    parent: '11',
                    value: 1110.6
                    }, 
                    {
                    name: 'yaq',
                    parent: '11',
                    value: 1111
                    },
                    {
                    name: 'obu',
                    parent: '11',
                    value: 1111
                    }, 

                    {
                    name: 'espce',
                    parent: '12',
                    value: 835.8
                    }, 
                    {
                    name: 'yaq',
                    parent: '12',
                    value: 836
                    },
                    {
                    name: 'obu',
                    parent: '12',
                    value: 836
                    }, 

                    {
                    name: 'espce',
                    parent: '13',
                    value: 1568.4
                    }, 
                    {
                    name: 'yaq',
                    parent: '13',
                    value: 1609
                    },
                    {
                    name: 'obu',
                    parent: '13',
                    value: 1693
                    }, 

                    {
                    name: 'espce',
                    parent: '14',
                    value: 1006.8
                    }, 
                    {
                    name: 'yaq',
                    parent: '14',
                    value: 1007
                    },
                    {
                    name: 'obu',
                    parent: '14',
                    value: 1007
                    }, 

                    {
                    name: 'espce',
                    parent: '15',
                    value: 1383.0
                    }, 
                    {
                    name: 'yaq',
                    parent: '15',
                    value: 1383
                    },
                    {
                    name: 'obu',
                    parent: '15',
                    value: 1352
                    }, 

                    {
                    name: 'espce',
                    parent: '16',
                    value: 1190.4
                    }, 
                    {
                    name: 'yaq',
                    parent: '16',
                    value: 1190
                    },
                    {
                    name: 'obu',
                    parent: '16',
                    value: 1190
                    }, 

                    {
                    name: 'espce',
                    parent: '17',
                    value: 1410.6
                    }, 
                    {
                    name: 'yaq',
                    parent: '17',
                    value: 1411
                    },
                    {
                    name: 'obu',
                    parent: '17',
                    value: 1411
                    }, 

                    //elemento por defecto
                        {
                                name: 'Susanne',
                                parent: 'Kiwi',
                                value: 2,
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