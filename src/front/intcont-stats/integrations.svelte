<script>
    async function loadGraphIn() {
        let integData23 = [];
        let integData30 = [];

        const resData23 = await fetch('https://sos1920-23.herokuapp.com/api/v2/cigarretes-sales');
        integData23 = await resData23.json();

        const resData30 = await fetch('https://sos1920-30.herokuapp.com/api/v2/sugarconsume');
        integData30 = await resData30.json();

        console.log(integData23);
        console.log(integData30);

        /*Chart G23*/

        var chart23 = Highcharts.chart('Graph23', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Highcharts responsive chart'
            },

            subtitle: {
                text: 'Resize the frame or click buttons to change appearance'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: ['Apples', 'Oranges', 'Bananas'],
                labels: {
                    x: -10
                }
            },

            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Amount'
                }
            },

            series: [{
                name: 'Christmas Eve',
                data: [1, 4, 3]
            }, {
                name: 'Christmas Day before dinner',
                data: [6, 4, 2]
            }, {
                name: 'Christmas Day after dinner',
                data: [8, 4, 3]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        });


        document.getElementById('small23').addEventListener('click', function () {
            chart23.setSize(400);
        });

        document.getElementById('large23').addEventListener('click', function () {
            chart23.setSize(600);
        });

        document.getElementById('auto23').addEventListener('click', function () {
            chart23.setSize(null);
        });
        /*End Chart G23*/

        /*Chart G30*/
        var chart30 = Highcharts.chart('Graph30', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Highcharts responsive chart'
            },

            subtitle: {
                text: 'Resize the frame or click buttons to change appearance'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: ['Apples', 'Oranges', 'Bananas'],
                labels: {
                    x: -10
                }
            },

            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Amount'
                }
            },

            series: [{
                name: 'Christmas Eve',
                data: [1, 4, 3]
            }, {
                name: 'Christmas Day before dinner',
                data: [6, 4, 2]
            }, {
                name: 'Christmas Day after dinner',
                data: [8, 4, 3]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        });


        document.getElementById('small30').addEventListener('click', function () {
            chart30.setSize(400);
        });

        document.getElementById('large30').addEventListener('click', function () {
            chart30.setSize(600);
        });

        document.getElementById('auto30').addEventListener('click', function () {
            chart30.setSize(null);
        });
        /*End Chart G30*/

    }



</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphIn}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="Graph23"></div>
        <p class="highcharts-description">
            This demo shows how breakpoints can be defined in order to
            change the chart options depending on the screen width. All
            charts automatically scale to the container size, but in this
            case we also change the positioning of the legend and axis
            elements to accomodate smaller screens.
        </p>
    </figure>
    <div id="button-bar">
        <button id="small23">Small</button>
        <button id="large23">Large</button>
        <button id="auto23">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph30"></div>
        <p class="highcharts-description">
            This demo shows how breakpoints can be defined in order to
            change the chart options depending on the screen width. All
            charts automatically scale to the container size, but in this
            case we also change the positioning of the legend and axis
            elements to accomodate smaller screens.
        </p>
    </figure>
    <div id="button-bar">
        <button id="small30">Small</button>
        <button id="large30">Large</button>
        <button id="auto30">Auto</button>
    </div>

    <style>
        .highcharts-figure,
        .highcharts-data-table table {
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

        .highcharts-data-table td,
        .highcharts-data-table th,
        .highcharts-data-table caption {
            padding: 0.5em;
        }

        .highcharts-data-table thead tr,
        .highcharts-data-table tr:nth-child(even) {
            background: #f8f8f8;
        }

        .highcharts-data-table tr:hover {
            background: #f1f7ff;
        }

        #button-bar {
            min-width: 310px;
            max-width: 800px;
            margin: 0 auto;
        }
    </style>

</main>