
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"on:load={loadInitialData}></script>
</svelte:head>

<script>

const BASE_API_PATH = "https://sos2021-27.herokuapp.com/api/v2";


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
        graphProvince.push(stat.province);
        graphBudget.push(stat.budget);
        graphInvest_promotion.push(stat.invest_promotion);
        graphLiquid.push(stat.liquid);
        graphPercentage.push(stat.percentage);
      });
    }

Highcharts.chart('container', {
  chart: {
    type: 'columnpyramid'
  },
  title: {
    text: 'Presupuesto y dinero de inversiones sociales'
  },
  colors: ['#C79D6D', '#B5927B', '#CE9B84', '#B7A58C', '#C7A58C'],
  xAxis: {
    categories: graphProvince,
    crosshair: true,
    labels: {
      style: {
        fontSize: '14px'
      }
    },
    type: 'category'
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Height (m)'
    }
  },
  tooltip: {
    valueSuffix: ' m'
  },
  series: [{
    name: 'Presupuesto',
    colorByPoint: true,
    data: graphBudget,
    showInLegend: false
  },
  {
  name: 'Dinero Liquido',
    colorByPoint: true,
    data: graphLiquid,
    showInLegend: false
  }]
});
}



async function loadInitialData() {
    console.log("Loading data...");

    const res = await fetch(
     "https://sos2021-27.herokuapp.com/api/v2/province-budget-and-investment-in-social-promotion/loadInitialData"
    ).then(function (res) {
      if(res.ok){
        loadGraph(); 
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