<script>
      
        


async function loadGraph(){

        // Grupo 24
        let DataGrup24 = [];
        const resData24 = await fetch("https://sos1920-24.herokuapp.com/api/v2/atc-stats/");
        DataGrup24 = await resData24.json();
        console.log(DataGrup24);

        // Grupo 9
        let DataGrup9 = [];
        const resData9 = await fetch("https://sos1920-09.herokuapp.com/api/v3/plugin-vehicles-stats/");
        DataGrup9 = await resData9.json();
        console.log(DataGrup9);



/**
        // Grupo 8
        let DataGrup8 = [];
        const resData8 = await fetch("https://sos1920-08.herokuapp.com/api/v1/electricity-produced-stats/docs/");
        DataGrup8 = await resData8.json();
        console.log(DataGrup8);
           
        // Grupo 5
        let DataGrup5 = [];
        const resData5 = await fetch("https://sos1920-05.herokuapp.com/api/v1/health_public");
        DataGrup5 = await resData5.json();
        console.log(DataGrup5);
        // Grupo 6
        let DataGrup6 = [];
        const resData6 = await fetch("https://sos1920-06.herokuapp.com/api/v2/accstats/");
        DataGrup6 = await resData6.json();
        console.log(DataGrup6);
        //Grupo 26
        let DataGrup26 = [];
        const resData26 = await fetch("https://sos1920-26.herokuapp.com/api/v2/global-coef");
        DataGrup26 = await resData26.json();
        console.log(DataGrup26);
        //Grupo  22
        let DataGrup22 = [];
        const resData22 = await fetch("https://sos1920-22.herokuapp.com/api/v1/og-basket-stats/");
        DataGrup22 = await resData22.json();
        console.log(DataGrup22);
**/


            //recojo los datos de mi servidor
     
     let MyDataG24New = [];//datos guardados
     let cont = 0;//contador

     for(let item of DataGrup24){
        let varname = DataGrup24[cont].aut_com;
        let varespce = DataGrup24[cont].espce;
        let varyaq = DataGrup24[cont].yaq;
        let varobu = DataGrup24[cont].obu;
        MyDataG24New.push({name: varname,points: [
             { name: 'espce',y:varespce},
             { name: 'yaq', y:varyaq},
             { name: 'obu', y:varobu}
             ]})

         cont++;
     }

     /////////////////////////////////////////////////////////////////////////////////////////
     cont = 0;

        let MyDataG9New = [];//datos guardados

        let countries = [];
        let pevStock = [];
        let annualSale = [];
        let carsPer1000 = [];


        DataGrup9.forEach(element => {
            let country = element.country;
            let pev = element["pev-stock"];
            let anu = element["annual-sale"];
            let cars = element["cars-per-1000"];

            countries.push(country);
            pevStock.push(pev);
            annualSale.push(anu);
            carsPer1000.push(cars);
        });
        /**
        console.log(countries);
        console.log(pevStock);
        console.log(annualSale);
        console.log(carsPer1000);
        **/

        for (let item of countries) {
            
            let varCo = countries[cont];
            let varP  = pevStock[cont];
            let varA  = annualSale[cont];
            let varCP = carsPer1000[cont];

            if(varCo == "Spain"){

            MyDataG9New.push({name: varCo,points: [
                {name: 'pevStock', y:varP},
                {name: 'annualSale', y:varA},
                {name: 'carsPer1000', y:varCP}
            ]

            })
             }

            cont++;
        }
        //console.log(MyDataG9New);

        var UnionG24G9 = MyDataG24New.concat(MyDataG9New); 

        //console.log(UnionG24G9);
        
            var chartG9 = JSC.chart('chartGrup9', { 
                            debug: true, 
                            type: 'treemap cushion', 
                            title_label_text: 
                                'Grafica de coste medio de matrícula univesitaria y las ventas anuales de coches electricos en España', 
                            legend_visible: false, 
                            defaultSeries_shape: { 
                                label: { 
                                text: '%name', 
                                color: '#f2f2f2', 
                                style: { fontSize: 15, fontWeight: 'bold' } 
                                } 
                            }, 
                            series: UnionG24G9
                        }); 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var chartG22 = JSC.chart('chartGrup22', { 
                                        debug: true, 
                                        type: 'treemap cushion', 
                                        title_label_text: 
                                            'Grafica de coste medio de matrícula univesitaria vs ', 
                                        legend_visible: false, 
                                        defaultSeries_shape: { 
                                            label: { 
                                            text: '%name', 
                                            color: '#f2f2f2', 
                                            style: { fontSize: 15, fontWeight: 'bold' } 
                                            } 
                                        }, 
                                        series: UnionG24G9
                                    });          



}
    
</script>

<svelte:head>
    
    <script src="https://code.jscharting.com/latest/jscharting.js" on:load="{loadGraph}"></script>
    
</svelte:head>

<main>
    <div id="chartGrup9" style="max-width: 740px;height: 400px;margin: 0px auto"></div>
    <div id="chartGrup22" style="max-width: 740px;height: 400px;margin: 0px auto"></div>

</main>

<style>
    #chartdiv {
      width: 100%;
      height: 500px;
    }
</style>