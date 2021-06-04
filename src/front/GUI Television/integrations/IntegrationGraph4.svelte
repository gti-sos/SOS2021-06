<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"on:load={loadGraph}></script>
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
  polar: true,
  type: 'line'
},

accessibility: {
  description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
},

title: {
  text: 'Budget vs spending',
  x: -80
},

pane: {
  size: '80%'
},

xAxis: {
  categories: graphProvince,
  tickmarkPlacement: 'on',
  lineWidth: 0
},

yAxis: {
  gridLineInterpolation: 'polygon',
  lineWidth: 0,
  min: 0
},

tooltip: {
  shared: true,
  pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
},

legend: {
  align: 'right',
  verticalAlign: 'middle',
  layout: 'vertical'
},

series: [{
  name: 'Allocated Budget',
  data: graphBudget,
  pointPlacement: 'on'
}, {
  name: 'Actual Spending',
  data: graphLiquid,
  pointPlacement: 'on'
}],

responsive: {
  rules: [{
    condition: {
      maxWidth: 500
    },
    chartOptions: {
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
      },
      pane: {
        size: '70%'
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
    <p class="highcharts-description">
      A spiderweb chart or radar chart is a variant of the polar chart.
      Spiderweb charts are commonly used to compare multivariate data sets,
      like this demo using six variables of comparison.
    </p>
  </figure>
</main>

<style>
.highcharts-figure, .highcharts-data-table table {
  min-width: 320px;
  max-width: 700px;
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