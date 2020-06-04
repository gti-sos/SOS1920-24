<script>
    async function loadGraphIn() {
        let integData23 = [];
        let integData30 = [];
        let integDataExt;
        let integDataExt2;


        let integData1 = [];
        let integData2 = [];
        let integData3 = [];
        let integData4 = [];
        let integData5 = [];
        let integData6 = [];
        let integData7 = [];
        let integData8 = [];
        let integData9 = [];
        let integData10 = [];


        let integDataExt_1 = [];
        let integDataExt_2 = [];

        //INTEXT 1
        for (let i = 0; i < 5; i++) {
            const resDataExt = await fetch("https://www.boredapi.com/api/activity");
            integDataExt = await resDataExt.json();
            integDataExt_1[i] = integDataExt.activity;
            integDataExt_2[i] = integDataExt.participants;
            /*integExtEur = integDataExt['bpi'];*/
        }
        let integDataExt2_1 = [];
        let integDataExt2_2 = [];
        //INTEXT 2
        const resDataExt2= await fetch("https://api.covid19api.com/summary");
        integDataExt2 = await resDataExt2.json();
        
        integDataExt2.Countries.forEach((i)=>{
            let cont = 0;
            while (cont<20){
                integDataExt2_1.push(i.Country);
                integDataExt2_2.push(i.TotalConfirmed);
                cont++;
            }
        });

        //Integracion grupo 23
        const proxyData = "api/v2/cigarretes-sales";
        const resData23 = await fetch(proxyData);
        integData23 = await resData23.json();
        let data23_1 = [];
        let data23_2 = [];
        integData23.forEach((i) => {
            data23_1.push(i.community);
            data23_2.push(i.cigarrete_sale);
        });

        //Integracion grupo 30
        const resData30 = await fetch('https://sos1920-30.herokuapp.com/api/v2/sugarconsume');
        integData30 = await resData30.json();
        let data30_1 = [];
        let data30_2 = [];
        integData30.forEach((i) => {
            data30_1.push(i.place + "-" + i.year);
            data30_2.push(i.sugarconsume);
        });



        //Integracion externa 1
        const resData1 = await fetch("https://sos1819-07.herokuapp.com/api/v2/subsidies-stats");
        integData1 = await resData1.json();
        let data1_1 = [];
        let data1_2 = [];
        integData1.forEach((i) => {
            data1_1.push(i.film);
            data1_2.push(i.subsidyReceibed);
        });

        //Integracion externa 2
        const resData2 = await fetch("https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries/");
        integData2 = await resData2.json();
        let data2_1 = [];
        let data2_2 = [];
        let data2_3 = [];
        integData2.forEach((i) => {
            data2_1.push(i.country);
            data2_2.push(i.emigrantman);
            data2_3.push(i.emigrantwoman);
        });

        //Integracion externa 3
        const resData3 = await fetch("https://sos1819-09.herokuapp.com/api/v2/climate-stats/");
        integData3 = await resData3.json();
        let data3_1 = [];
        let data3_2 = [];
        let data3_3 = [];
        integData3.forEach((i) => {
            data3_1.push(i.country + "-" + i.year);
            data3_2.push(i.methane_stats);
            data3_3.push(i.nitrous_oxide_stats);
        });

        //Integracion externa 4
        const resData4 = await fetch("https://sos1819-10.herokuapp.com/api/v2/issue-dioxid/");
        integData4 = await resData4.json();
        let data4_1 = [];
        let data4_2 = [];
        integData4.forEach((i) => {
            data4_1.push(i.country + "-" + i.year);
            data4_2.push(parseFloat(i.issue_metric_ton));
        });

        //Integracion externa 5
        const resData5 = await fetch("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations");
        integData5 = await resData5.json();
        let data5_1 = [];
        let data5_2 = [];
        integData5.forEach((i) => {
            data5_1.push(i.country + "-" + i.year);
            data5_2.push(i.educationExpense);
        });


        //Integracion Externa 6
        const resData6 = await fetch("https://sos1819-12.herokuapp.com/api/v1/life-expectancy-stats/");
        integData6 = await resData6.json();
        let data6_1 = [];
        let data6_2 = [];
        let data6_3 = [];
        integData6.forEach((i) => {
            data6_1.push(i.country + "-" + i.year);
            data6_2.push(i.expectancy_woman);
            data6_3.push(i.expectancy_man);
        });

        const resData7 = await fetch("https://sos1819-14.herokuapp.com/api/v1/injured-hospitalized/");
        integData7 = await resData7.json();
        let data7_1 = [];
        let data7_2 = [];
        integData7.forEach((i) => {
            data7_1.push(i.province + "-" + i.year);
            data7_2.push(parseInt(i.accident_with_victim));
        });

        const resData8 = await fetch("https://sos1819-02.herokuapp.com/api/v1/movies-stats");
        integData8 = await resData8.json();
        let data8_1 = [];
        let data8_2 = [];
        integData8.forEach((i) => {
            data8_1.push(i.name);
            data8_2.push(i.movienomination);
        });

        const resData9 = await fetch("https://sos1819-04.herokuapp.com/api/v1/suicide-rates");
        integData9 = await resData9.json();
        console.log(integData9);
        let data9_1 = [];
        let data9_2 = [];
        let data9_3 = [];
        integData9.forEach((i) => {
            data9_1.push(i.country + "-" + i.year);
            data9_2.push(i.noSuicidesMan);
            data9_3.push(i.noSuicidesWoman);
        });

        const resData10 = await fetch("https://sos1819-03.herokuapp.com/api/v1/companies");
        integData10 = await resData10.json();
        console.log(integData10);
        let data10_1 = [];
        let data10_2 = [];
        integData10.forEach((i) => {
            data10_1.push(i.country);
            data10_2.push(i.numberOfCompanies);
        });



        /*Chart G23*/

        var chart23 = Highcharts.chart('Graph23', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Grupo 23 - Venta de Cigarrillos'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data23_1,
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
                name: 'Consumo de Cigarros',
                data: data23_2
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
                text: 'Integracion Grupo 30 - Consumo de Azucar'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data30_1,
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
                name: 'Consumo de Azucar',
                data: data30_2
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
        /*Chart G1*/
        var chart1 = Highcharts.chart('Graph1', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 1 - Financiacion de Peliculas'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data1_1,
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
                name: 'Dinero Recibido',
                data: data1_2
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


        document.getElementById('small1').addEventListener('click', function () {
            chart1.setSize(400);
        });

        document.getElementById('large1').addEventListener('click', function () {
            chart1.setSize(600);
        });

        document.getElementById('auto1').addEventListener('click', function () {
            chart1.setSize(null);
        });
        /*End Chart G1*/
        /*Chart G2*/
        var chart2 = Highcharts.chart('Graph2', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 2 - Emigracion por Paises'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data2_1,
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
                name: 'Hombres Emigrantes',
                data: data2_2
            }, {
                name: 'Mujeres Emigrantes',
                data: data2_3
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


        document.getElementById('small2').addEventListener('click', function () {
            chart2.setSize(400);
        });

        document.getElementById('large2').addEventListener('click', function () {
            chart2.setSize(600);
        });

        document.getElementById('auto2').addEventListener('click', function () {
            chart2.setSize(null);
        });
        /*End Chart G2*/

        /*Chart G3*/
        var chart3 = Highcharts.chart('Graph3', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 3 - Estadisticas Climaticas'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data3_1,
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
                name: 'Estadisticas de Metano',
                data: data3_2
            }, {
                name: 'Estadisticas de Oxido Nitroso',
                data: data3_3
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


        document.getElementById('small3').addEventListener('click', function () {
            chart3.setSize(400);
        });

        document.getElementById('large3').addEventListener('click', function () {
            chart3.setSize(600);
        });

        document.getElementById('auto3').addEventListener('click', function () {
            chart3.setSize(null);
        });
        /*End Chart G3*/
        /*Chart G4*/
        var chart4 = Highcharts.chart('Graph4', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 4 - Emisiones de Combustible'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data4_1,
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
                name: 'Emision de toneladas de Combustible',
                data: data4_2
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


        document.getElementById('small4').addEventListener('click', function () {
            chart4.setSize(400);
        });

        document.getElementById('large4').addEventListener('click', function () {
            chart4.setSize(600);
        });

        document.getElementById('auto4').addEventListener('click', function () {
            chart4.setSize(null);
        });
        /*End Chart G4*/
        /*Chart G5*/
        var chart5 = Highcharts.chart('Graph5', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 5 - Gastos en Educacion'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data5_1,
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
                name: 'Gasto en Educacion',
                data: data5_2
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


        document.getElementById('small5').addEventListener('click', function () {
            chart5.setSize(400);
        });

        document.getElementById('large5').addEventListener('click', function () {
            chart5.setSize(600);
        });

        document.getElementById('auto5').addEventListener('click', function () {
            chart5.setSize(null);
        });
        /*End Chart G5*/
        /*Chart G6*/
        var chart6 = Highcharts.chart('Graph6', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 6 - Esperanza de Vida'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data6_1,
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
                name: 'Mujeres',
                data: data6_2
            }, {
                name: 'Hombres',
                data: data6_3
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


        document.getElementById('small6').addEventListener('click', function () {
            chart6.setSize(400);
        });

        document.getElementById('large6').addEventListener('click', function () {
            chart6.setSize(600);
        });

        document.getElementById('auto6').addEventListener('click', function () {
            chart6.setSize(null);
        });
        /*End Chart G6*/
        /*Chart G7*/
        var chart7 = Highcharts.chart('Graph7', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 7 - Accidentes'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data7_1,
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
                name: 'Accidentes con Victimas',
                data: data7_2
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


        document.getElementById('small7').addEventListener('click', function () {
            chart7.setSize(400);
        });

        document.getElementById('large7').addEventListener('click', function () {
            chart7.setSize(600);
        });

        document.getElementById('auto7').addEventListener('click', function () {
            chart7.setSize(null);
        });
        /*End Chart G7*/
        /*Chart G8*/
        var chart8 = Highcharts.chart('Graph8', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion Externa 8 - Peliculas mas nominadas a los Oscars'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data8_1,
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
                name: 'Nominaciones',
                data: data8_2
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


        document.getElementById('small8').addEventListener('click', function () {
            chart8.setSize(400);
        });

        document.getElementById('large8').addEventListener('click', function () {
            chart8.setSize(600);
        });

        document.getElementById('auto8').addEventListener('click', function () {
            chart8.setSize(null);
        });
        /*End Chart G8*/
        /*Chart G9*/
        var chart9 = Highcharts.chart('Graph9', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion externa 9 - Suicidios'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data9_1,
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
                name: 'Suicidios de Hombres',
                data: data9_2
            }, {
                name: 'Suicidios de Mujeres',
                data: data9_3
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


        document.getElementById('small9').addEventListener('click', function () {
            chart9.setSize(400);
        });

        document.getElementById('large9').addEventListener('click', function () {
            chart9.setSize(600);
        });

        document.getElementById('auto9').addEventListener('click', function () {
            chart9.setSize(null);
        });
        /*End Chart G9*/
        /*Chart G10*/
        var chart10 = Highcharts.chart('Graph10', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion externa 10 - Compañias por Pais'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: data10_1,
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
                name: 'Numero de Compañias',
                data: data10_2
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


        document.getElementById('small10').addEventListener('click', function () {
            chart10.setSize(400);
        });

        document.getElementById('large10').addEventListener('click', function () {
            chart10.setSize(600);
        });

        document.getElementById('auto10').addEventListener('click', function () {
            chart10.setSize(null);
        });
        /*End Chart G10*/

        /*Chart EXT*/
        var chartExt = Highcharts.chart('GraphExt', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Integracion externa 11 - Actividades Random'
            },

            subtitle: {
                text: 'Cambia la apariencia con los botones o reajustando la ventana'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: integDataExt_1,
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
                name: 'Participantes',
                data: integDataExt_2
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


        document.getElementById('smallExt').addEventListener('click', function () {
            chartExt.setSize(400);
        });

        document.getElementById('largeExt').addEventListener('click', function () {
            chartExt.setSize(600);
        });

        document.getElementById('autoExt').addEventListener('click', function () {
            chartExt.setSize(null);
        });
        /*End Chart EXT*/
        /*Chart EXT*/
        var chartExt2 = Highcharts.chart('GraphExt2', {

chart: {
    type: 'column'
},

title: {
    text: 'Integracion externa 11 - Covid Total Confirmados por Pais'
},

subtitle: {
    text: 'Cambia la apariencia con los botones o reajustando la ventana'
},

legend: {
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical'
},

xAxis: {
    categories: integDataExt2_1,
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
    name: 'Casos confirmados',
    data: integDataExt2_2
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


document.getElementById('smallExt2').addEventListener('click', function () {
chartExt2.setSize(400);
});

document.getElementById('largeExt2').addEventListener('click', function () {
chartExt2.setSize(600);
});

document.getElementById('autoExt2').addEventListener('click', function () {
chartExt2.setSize(null);
});
/*End Chart EXT2*/
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
    </figure>
    <div id="button-bar">
        <button id="small23">Small</button>
        <button id="large23">Large</button>
        <button id="auto23">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph30"></div>
    </figure>
    <div id="button-bar">
        <button id="small30">Small</button>
        <button id="large30">Large</button>
        <button id="auto30">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph1"></div>
    </figure>
    <div id="button-bar">
        <button id="small1">Small</button>
        <button id="large1">Large</button>
        <button id="auto1">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph2"></div>

    </figure>
    <div id="button-bar">
        <button id="small2">Small</button>
        <button id="large2">Large</button>
        <button id="auto2">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph3"></div>

    </figure>
    <div id="button-bar">
        <button id="small3">Small</button>
        <button id="large3">Large</button>
        <button id="auto3">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph4"></div>
    </figure>
    <div id="button-bar">
        <button id="small4">Small</button>
        <button id="large4">Large</button>
        <button id="auto4">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph5"></div>
    </figure>
    <div id="button-bar">
        <button id="small5">Small</button>
        <button id="large5">Large</button>
        <button id="auto5">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph6"></div>
    </figure>
    <div id="button-bar">
        <button id="small6">Small</button>
        <button id="large6">Large</button>
        <button id="auto6">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph7"></div>
    </figure>
    <div id="button-bar">
        <button id="small7">Small</button>
        <button id="large7">Large</button>
        <button id="auto7">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph8"></div>
    </figure>
    <div id="button-bar">
        <button id="small8">Small</button>
        <button id="large8">Large</button>
        <button id="auto8">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph9"></div>
    </figure>
    <div id="button-bar">
        <button id="small9">Small</button>
        <button id="large9">Large</button>
        <button id="auto9">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="Graph10"></div>
    </figure>
    <div id="button-bar">
        <button id="small10">Small</button>
        <button id="large10">Large</button>
        <button id="auto10">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="GraphExt"></div>
    </figure>
    <div id="button-bar">
        <button id="smallExt">Small</button>
        <button id="largeExt">Large</button>
        <button id="autoExt">Auto</button>
    </div>
    <figure class="highcharts-figure">
        <div id="GraphExt2"></div>
    </figure>
    <div id="button-bar">
        <button id="smallExt2">Small</button>
        <button id="largeExt2">Large</button>
        <button id="autoExt2">Auto</button>
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