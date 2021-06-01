<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/variwide.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
</svelte:head>

<script>

const BASE_API_PATH = "http://sos2021-27.herokuapp.com/api/v2";

let Datas = [];

let graphProvince = [];
let graphBudget= [];
let graphInvest_promotion = [];
let graphLiquid = [];
let graphPercentage = [];


async function loadGraph(){

    console.log("Fetching data...");
    const res = await fetch(BASE_API_PATH + "/province-budget-and-investment-in-social-promotion");
    Datas = await res.json();
    if (res.ok) {
        console.log("va bien");
      Datas.forEach(stat => {
        graphProvince.push(stat.province+"-"+stat.year);
        graphBudget.push(stat.budget);
        graphInvest_promotion.push(stat.invest_promotion);
        graphLiquid.push(stat.liquid);
        graphPercentage.push(stat.percentage);
      });
    }
    Highcharts.chart('container', {

chart: {
  type: 'variwide'
},

title: {
  text: 'Labor Costs in Europe, 2016'
},

subtitle: {
  text: 'Source: <a href="http://ec.europa.eu/eurostat/web/' +
    'labour-market/labour-costs/main-tables">eurostat</a>'
},

xAxis: {
  type: 'category'
},

caption: {
  text: 'Column widths are proportional to GDP'
},

legend: {
  enabled: false
},

series: [{
  name: 'Labor Costs',
  data: [
    ['Norway', 50.2, 335504],
    ['Denmark', 42, 277339],
    ['Belgium', 39.2, 421611],
    ['Sweden', 38, 462057],
    ['France', 35.6, 2228857],
    ['Netherlands', 34.3, 702641],
    ['Finland', 33.2, 215615],
    ['Germany', 33.0, 3144050],
    ['Austria', 32.7, 349344],
    ['Ireland', 30.4, 275567],
    ['Italy', 27.8, 1672438],
    ['United Kingdom', 26.7, 2366911],
    ['Spain', 21.3, 1113851],
    ['Greece', 14.2, 175887],
    ['Portugal', 13.7, 184933],
    ['Czech Republic', 10.2, 176564],
    ['Poland', 8.6, 424269],
    ['Romania', 5.5, 169578]

  ],
  dataLabels: {
    enabled: true,
    format: '€{point.y:.0f}'
  },
  tooltip: {
    pointFormat: 'Labor Costs: <b>€ {point.y}/h</b><br>' +
      'GDP: <b>€ {point.z} million</b><br>'
  },
  colorByPoint: true
}]

});
}
</script>
<main>

</main>

<style>
#container {
  height: 500px;
}

.highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
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