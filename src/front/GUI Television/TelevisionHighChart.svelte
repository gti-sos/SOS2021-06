<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on on:load={loadGraph}></script>


</svelte:head>
<script>
const BASE_API_PATH = "/api/v2";
let televisionData = [];
let graphGroupTVyear = [];
let graphCountry = [];
let graphCable_tv_broadcast_avg_audience_year = [];
let graphAvg_age = [];
let graphAvg_audience_month = [];
async function loadGraph(){
    console.log("Fetching data...");
    const res = await fetch(BASE_API_PATH + "/television-stats");
    televisionData = await res.json();
    if (res.ok) {
        console.log("va bien");
      televisionData.forEach(stat => {
        graphGroupTVyear.push(stat.groupTV+"-"+stat.year);
        graphAvg_age.push(stat.avg_age);
        graphCable_tv_broadcast_avg_audience_year.push(stat.cable_tv_broadcast_avg_audience_year);
        graphAvg_audience_month.push(stat.avg_audience_month);
      });
    }
    Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Grafica de audiendias de grupos TV'
  },
  xAxis: {
    categories: graphGroupTVyear
  },
  credits: {
    enabled: false
  },
  series: [{
            name: 'Media edad',
            data: graphAvg_age,
        },
        {
            name: 'Cable/tv broadcast media audiencia/año',
            data: graphCable_tv_broadcast_avg_audience_year,
        },
        {
            name: 'Media audiencia/mes',
            data: graphAvg_audience_month,
        }]
});
}
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          Se muestra en la grafica las medias de las audiencias por año/mes y la edad media de las personas que ven dicha cadena.
        </p>
      </figure>
</main>

<style>
    #container {
  height: 400px; 
}
.highcharts-figure, .highcharts-data-table table {
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