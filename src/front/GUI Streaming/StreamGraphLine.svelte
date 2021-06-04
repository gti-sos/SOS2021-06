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

    let streamingStats = [];

    let platformyearStats = [];
    let hourStats = [];
    let ageStats = [];
    let audienceStats = [];

    async function getStreams() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/streaming-stats");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            streamingStats = json;
            console.log(`We have received ${streamingStats.length} streaming platforms.`);
            streamingStats.forEach(stat => {
                platformyearStats.push(stat.platform+"/"+stat.year);
                hourStats.push(stat.hour_viewed/1000000000);
                ageStats.push(stat.avg_age);
                audienceStats.push(stat.avg_audience/100000);
            });
        } else {
            console.log("Error!");
        }
        loadGraph()
    }
    onMount(getStreams);
    console.log(platformyearStats)
    async function loadGraph(){
            Highcharts.chart('container', {

      title: {
          text: 'Datos plataformas de streaming'
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
          categories : platformyearStats
      },

      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      series: [{
          name: 'Horas visualizadas anuales (Miles de millones)',
          data: hourStats
      },
      {
          name: 'Edad media audiencia',
          data: ageStats
      },
      {
          name: 'Average audience (Cientos de miles)',
          data: audienceStats
      }
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