<script>
    let MyData = [];

    const resData = await fetch("/data");
    MyData = await resData.json();


</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          Chart showing how an HTML table can be used as the data source for the
          chart using the Highcharts data module. The chart is built by
          referencing the existing HTML data table in the page. Several common
          data source types are available, including CSV and Google Spreadsheet.
        </p>
      
        <table id="datatable">
          <thead>
            <tr>
              <th></th>
              <th>Jane</th>
              <th>John</th>
              <th>Alvaro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Apples</th>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <th>Manzanas</th>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <th>Peras</th>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <th>Pears</th>
              <td>2</td>
              <td>0</td>
            </tr>
            <tr>
              <th>Plums</th>
              <td>5</td>
              <td>11</td>
            </tr>
            <tr>
              <th>Bananas</th>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <th>Oranges</th>
              <td>2</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </figure>
    </main>