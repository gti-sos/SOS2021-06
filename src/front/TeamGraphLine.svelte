<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<script>
    import {
        onMount
    } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";


    const BASE_API_PATH = "/api/v1";
    const BASE_API_PATH2 = "/api/v2";

    let onlinemediaStats = [];
    let streamingStats = [];
    let televisionStats = [];

    let platform_yearGraph = [];
    
    let audienceGraphOM = ["","","","","",""];
    let audienceGraphS = ["","","","","","","","","","",""];

    let audienceGraphTV = [];

    

    

    async function loadGraph(){

        const resOM = await fetch(BASE_API_PATH + "/onlinemedia-stats");
        onlinemediaStats = await resOM.json();
        const resS = await fetch(BASE_API_PATH + "/streaming-stats");
        streamingStats = await resS.json();
        const resTV = await fetch( BASE_API_PATH2 + "/television-stats");
        televisionStats = await resTV.json();

    

    if (resOM.ok && resS.ok && resTV.ok){

        televisionStats.forEach(stat => {
            platform_yearGraph.push(stat.groupTV + "/" + stat.year);
            audienceGraphTV.push(stat.avg_audience_month);

        }),
        onlinemediaStats.forEach(stat => {
            platform_yearGraph.push(stat.online_media + "/" + stat.year);
            audienceGraphOM.push(stat.audience*1000000);

        }),
        streamingStats.forEach(stat => {
            platform_yearGraph.push(stat.platform + "/" + stat.year);
            audienceGraphS.push(stat.avg_audience);

        });
    }
    

    console.log(platform_yearGraph);

    Highcharts.chart('container', {

      title: {
          text: 'Datos de las audiencias de las principales plataformas audiovisuales en España'
      },

      yAxis: {
          title: {
              text: 'Audiencia (Millones)'
          }
      },

      xAxis: {
          title: {
              text: 'Plataforma/Año'
          },
          categories : platform_yearGraph, 
      },

      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      series: [
        {
            name: "Audiencia Mensual Tv",
            data: audienceGraphTV,
        },
        {
            name: "Audiencia Mensual Online media",
            data: audienceGraphOM,
        },
        {
            name: "Audiencia Mensual streaming",
            data: audienceGraphS,
        }],

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 800
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }

      });
    }
</script>

<main>
    <div>
        <h2>Gráfica lineal</h2>
    </div>
    <figure class="highcharts-figure">
        <div id="container"></div>
        
      </figure>
</main>

<style>
.highcharts-figure, .highcharts-data-table table {
    min-width: 360px; 
    max-width: 800px;

    margin: 1em auto;
}
main {
    margin: 50px auto;
    text-align: center;
}
#container{
    height: 450px;
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
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>