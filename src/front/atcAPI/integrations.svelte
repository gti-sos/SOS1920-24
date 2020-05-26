<script>

async function loadGraph(){

        //let data_apiExterna = [];
        let MyDataAtc = [];
        const resData = await fetch("https://sos1920-09.herokuapp.com/api/v3/plugin-vehicles-stats/");
        MyDataAtc = await resData.json();

        console.log(MyDataAtc);

}
    



</script>

<svelte:head>
    <!--librerias externas de svelte para una grafica Tree map-->>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/treemap.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
</main>