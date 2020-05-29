<script>
      
async function loadGraph(){

        // Grupo 24
        let DataGrup24 = [];
        const resData24 = await fetch("https://sos1920-24.herokuapp.com/api/v2/atc-stats/");
        DataGrup24 = await resData24.json();
       // console.log(DataGrup24);

        // Grupo 9
        let DataGrup9 = [];
        const resData9 = await fetch("https://sos1920-09.herokuapp.com/api/v3/plugin-vehicles-stats/");
        DataGrup9 = await resData9.json();
        //console.log(DataGrup9);

         //Grupo  22
        let DataGrup22 = [];
        const resData22 = await fetch("https://sos1920-22.herokuapp.com/api/v1/og-basket-stats/");
        DataGrup22 = await resData22.json();
        //console.log(DataGrup22);

        // Grupo 5
        let DataGrup5 = [];
        const resData5 = await fetch("https://sos1920-05.herokuapp.com/api/v1/health_public");
        DataGrup5 = await resData5.json();
        //console.log(DataGrup5);

        // Grupo 8
        let DataGrup8 = [];
        const resData8 = await fetch("https://sos1920-08.herokuapp.com/api/v2/electricity-produced-stats");
        DataGrup8 = await resData8.json();
        //console.log(DataGrup8);

        // Grupo 6 Leandro
        let DataGrup6 = [];
        const resData6 = await fetch("https://sos1920-06.herokuapp.com/api/v2/accstats/");
        DataGrup6 = await resData6.json();
        //console.log(DataGrup6);




/**
        //Grupo 26 
        let DataGrup26 = [];
        const resData26 = await fetch("https://sos1920-26.herokuapp.com/api/v2/global-coef");
        DataGrup26 = await resData26.json();
        console.log(DataGrup26);

**/
     
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

     //////////////////////////////////////////////GRUPO 9///////////////////////////////////////////
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
            ]})
            }
            cont++;
        }

        var UnionG24G9 = MyDataG24New.concat(MyDataG9New); 
        
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
///////////////////////////////////////////////////GRUPO 22/////////////////////////////////////////////////////////////
        cont = 0;
        let MyDataG22New = [];//datos guardados

        for(let item of DataGrup22){
        let varname = DataGrup22[cont].country;
        let varpoints      = DataGrup22[cont].points;
        let varthreepoints = DataGrup22[cont].threepoints;
        let varrebounds    = DataGrup22[cont].rebounds;
            
        MyDataG22New.push({name: varname,points: [
             { name: 'points',y:varpoints},
             { name: 'threepoints', y:varthreepoints},
             { name: 'rebounds', y:varrebounds}
             ]})
            

         cont++;
     }
     //console.log(MyDataG22New);
     var UnionG24G22 = MyDataG24New.concat(MyDataG22New);

            var chartG22 = JSC.chart('chartGrup22', { 
                                        debug: true, 
                                        type: 'treemap cushion', 
                                        title_label_text: 
                                            'Grafica de coste medio de matrícula univesitaria y Finales de baloncesto de los juegos olimpicos', 
                                        legend_visible: false, 
                                        defaultSeries_shape: { 
                                            label: { 
                                            text: '%name', 
                                            color: '#f2f2f2', 
                                            style: { fontSize: 15, fontWeight: 'bold' } 
                                            } 
                                        }, 
                                        series: UnionG24G22
                                    });          

////////////////////////////////////////////////////GRUPO 5//////////////////////////////////////////////////////////////

let MyDataG5New = [];//datos guardados
     cont = 0;//contador

     for(let item of DataGrup5){
        let varname     = DataGrup5[cont].country;
        let vartotalS   = DataGrup5[cont].total_spending;
        let varpublicS  = DataGrup5[cont].public_spending;
        let varpublicSP = DataGrup5[cont].public_spending_pib;
        MyDataG5New.push({name: varname,points: [
             { name: 'totalS',y:vartotalS},
             { name: 'publicS', y:varpublicS},
             { name: 'publicSP', y:varpublicSP}
             ]})

         cont++;
     }
     //console.log(MyDataG5New);

     var UnionG24G5 = MyDataG24New.concat(MyDataG5New);

            var chartG22 = JSC.chart('chartGrup5', { 
                                        debug: true, 
                                        type: 'treemap cushion', 
                                        title_label_text: 
                                            'Grafica de coste medio de matrícula univesitaria y Salud publica   ', 
                                        legend_visible: false, 
                                        defaultSeries_shape: { 
                                            label: { 
                                            text: '%name', 
                                            color: '#f2f2f2', 
                                            style: { fontSize: 15, fontWeight: 'bold' } 
                                            } 
                                        }, 
                                        series: UnionG24G5
                                    });          

     /////////////////////////////////////////////GRUPO 8/////////////////////////////////////////////////////////
     let MyDataG8New = [];//datos guardados
     cont = 0;//contador

     for(let item of DataGrup8){
        let varname     = DataGrup8[cont].state;
        let varCoal     = DataGrup8[cont].coal;
        let varHidro    = DataGrup8[cont].hydro;
        let varSolar    = DataGrup8[cont].solar;
        if( varname == "Hawaii" || varname == "Florida"){
        MyDataG8New.push({name: varname , points: [
             { name: 'hidro', y:varHidro},
             ]})
            }
         cont++;
     }
    //console.log(MyDataG8New);

    var UnionG24G8 = MyDataG24New.concat(MyDataG8New);

     var chartG22 = JSC.chart('chartGrup8', { 
                                        debug: true, 
                                        type: 'treemap cushion', 
                                        title_label_text: 
                                            'Grafica de coste medio de matrícula univesitaria Y    ', 
                                        legend_visible: false, 
                                        defaultSeries_shape: { 
                                            label: { 
                                            text: '%name', 
                                            color: '#f2f2f2', 
                                            style: { fontSize: 15, fontWeight: 'bold' } 
                                            } 
                                        }, 
                                        series: UnionG24G8
                                    });   

///////////////////////////////////////////////////Grupo 6////////////////////////////////////////////////

        let MyDataG6New = [];//datos guardados
             cont = 0;//contador             
             for(let item of DataGrup6){
        let varname       = DataGrup6[cont].province;
        let varVicTotal     = DataGrup6[cont].accvictotal;
        let varVicinter    = DataGrup6[cont].accvicinter;
        let varFall        = DataGrup6[cont].accfall;
      
        MyDataG6New.push({name: varname,points: [
             { name: 'VicTotal', y:varVicTotal},
             { name: 'Vicinter', y:varVicinter},
             { name: 'Fall'    , y:varFall}
             ]})
            
         cont++;
     }
    //console.log(MyDataG6New);

    var UnionG24G6 = MyDataG24New.concat(MyDataG6New);

     var chartG22 = JSC.chart('chartGrup6', { 
                                        debug: true, 
                                        type: 'treemap cushion', 
                                        title_label_text: 
                                            'Grafica de coste medio de matrícula univesitaria Y Accidentes de coche    ', 
                                        legend_visible: false, 
                                        defaultSeries_shape: { 
                                            label: { 
                                            text: '%name', 
                                            color: '#f2f2f2', 
                                            style: { fontSize: 15, fontWeight: 'bold' } 
                                            } 
                                        }, 
                                        series: UnionG24G6
                                    });

}

async function loadGraphApiExternas(){

    /**
        //api externa 1
        let DataEx1 = [];
        "https://sos1920-24.herokuapp.com/api/v2/atc-stats/"
        const resDataEx1 = await fetch("https://covidtracking.com/api/v1/states/current.json");
        DataEx1 = await resDataEx1.json();
        console.log(DataEx1);
    **/

        const BASE_API_URL_External02 = "/v1/states/current.json";
        const resData           = await fetch("https://sos1920-24.herokuapp.com/api/v2/atc-stats/");
        
        const resDataExternal02 = await fetch(BASE_API_URL_External02);
        let MyData = await resData.json();
        let DataExternal02 = await resDataExternal02.json();

        console.log(MyData);
        console.log(DataExternal02);









        //api externa 2
        let DataEx3 = [];
        const resDataEx3 = await fetch("https://corona-api.com/countries");
        DataEx3 = await resDataEx3.json();
        console.log(DataEx3);




}

loadGraph(); //cors
loadGraphApiExternas(); //proxy

    
</script>

<svelte:head>
    
    <script src="https://code.jscharting.com/latest/jscharting.js" on:load="{loadGraph}"></script>
    <script src="https://code.jscharting.com/latest/jscharting.js" on:load="{loadGraphApiExternas}"></script>
    
</svelte:head>

<main>
    <div id="chartGrup9" style="max-width: 740px;height: 400px;margin: 0px auto"></div>
    <div id="chartGrup22" style="max-width: 740px;height: 400px;margin: 0px auto"></div>
    <div id="chartGrup5" style="max-width: 740px;height: 400px;margin: 0px auto"></div>
    <div id="chartGrup8" style="max-width: 740px;height: 400px;margin: 0px auto"></div>
    <div id="chartGrup6" style="max-width: 740px;height: 400px;margin: 0px auto"></div>

</main>

<style>
    #chartdiv {
      width: 100%;
      height: 500px;
    }
</style>