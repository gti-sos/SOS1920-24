<script type="text/javascript">
    window.onload = async function () {
    
        let IntcontData = [];
        const resData = await fetch("/api/v2/intcont-stats");
        IntcontData = await resData.json();
        let totalValues=[0,0,0];
        let cont = 0;
        IntcontData.forEach((i)=>{
            totalValues[0]+=i.ccoo;
            totalValues[1]+=i.sepe;
            totalValues[2]+=i.gobesp;
        });
        let GraphData = [];
        let GraphData2 = [];
        let GraphData3 = [];
    
            IntcontData.forEach((i)=>{
                let name = i.aut_com;
                let y = i.ccoo;
                let y2 = i.sepe;
                let y3 = i.gobesp/10;
                GraphData.push({label: name, y: y});
                GraphData2.push({label: name, y: y2});
                GraphData3.push({label: name, y: y3});
                cont++;
            });
            
        console.log(totalValues);
        console.log(GraphData);
    
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true		
        title:{
            text: "Contratos de Practicas y Gasto Publico en Universidad en España"
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            name: "CCOO - Contratos de Practicas",
            showInLegend: true,
            dataPoints: GraphData
        },{
            type: "column",
            name: "SEPE - Contratos de Practicas",
            showInLegend: true,
            dataPoints: GraphData2
    
        },{
            type: "column",
            name: "GOBESP - Gasto Publico Universitario 1/10000 euros",
            showInLegend: true,
            dataPoints: GraphData3
        }]
    });
    chart.render();
    
    }
    </script>
    
    <main>
    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"> </script>
    </main>
    