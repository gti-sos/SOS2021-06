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

    let onlinemediaStats = [];
    let streamingStats = [];
    let televisionStats = [];
    

    let platform_yearGraphOM = [];
    let platform_yearGraphS = [];
    let platform_yearGraphTV = [];

    
    let audienceGraphOM = [];
    let audienceGraphS = [];

    let audienceGraphTV = [];

    

    

    async function loadGraph(){

        const resOM = await fetch(BASE_API_PATH + "/onlinemedia-stats");
        onlinemediaStats = await resOM.json();
        const resS = await fetch(BASE_API_PATH + "/streaming-stats");
        streamingStats = await resS.json();
        const resTV = await fetch( "/api/v2/television-stats");
        televisionStats = await resTV.json();

    

    if (resOM.ok && resS.ok && resTV.ok){
        onlinemediaStats.forEach(stat => {
            platform_yearGraphOM.push(stat.online_media + "/" + stat.year);
    
            audienceGraphOM.push(stat.audience*1000000);

        })
        streamingStats.forEach(stat => {
            platform_yearGraphOM.push(stat.platform + "/" + stat.year);
            audienceGraphOM.push(stat.avg_audience);

        })
        televisionStats.forEach(stat => {
            platform_yearGraphOM.push(stat.groupTV + "/" + stat.year);
            audienceGraphOM.push(stat.avg_audience_month);

        })

    }
    

    console.log(platform_yearGraphOM);

    Highcharts.chart('container', {

      title: {
          text: 'Datos de las principales plataformas de pago de contenido bajo demanda en España'
      },

      yAxis: {
          title: {
              text: 'Valor'
          }
      },

      xAxis: {
          title: {
              text: 'Plataforma/Año'
          },
          categories : platform_yearGraphOM,
      },

      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

     

      series: [
        {
            name: "Audiencia Mensual",
            data: audienceGraphOM,
        },
        
        
        
      ],

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
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