<script>

async  function loadGraphAtc(){

     //recojo los datos de mi servidor
     let MyDataAtc = [];
     const resData = await fetch("/api/v2/atc-stats");
     MyDataAtc = await resData.json();
     let MyDataAtcNew = [];//datos guardados
     let ArrayPoint = {};
     let cont = 0;//contador

     for(let item of MyDataAtc){
        let varname = MyDataAtc[cont].aut_com;
        let pepe = "\[]";
        let varespce = MyDataAtc[cont].espce;
        let varyaq = MyDataAtc[cont].yaq;
        let varobu = MyDataAtc[cont].obu;
         MyDataAtcNew.push({name: varname,points: [
             { name: 'espce',y:varespce},
             { name: 'yaq', y:varyaq},
             { name: 'obu', y:varobu}
             ]})

         cont++;
     }

    // console.log(MyDataAtc);
     console.log(MyDataAtcNew);

            var chart = JSC.chart('chartDiv', { 
                debug: true, 
                type: 'treemap cushion', 
                title_label_text: 
                    'Grafica de coste medio de matrícula univesitaria', 
                legend_visible: false, 
                defaultSeries_shape: { 
                    label: { 
                    text: '%name', 
                    color: '#f2f2f2', 
                    style: { fontSize: 15, fontWeight: 'bold' } 
                    } 
                }, 
                series: MyDataAtcNew
            }); 

    }
</script>

<svelte:head>

    <script src="https://code.jscharting.com/latest/jscharting.js" on:load="{loadGraphAtc}"></script>
    
   
</svelte:head>

<main>
   
    <div id="chartDiv" style="max-width: 740px;height: 400px;margin: 0px auto">
    </div>


</main>

<style>
    #chartdiv {
      width: 100%;
      height: 500px;
    }
</style>

