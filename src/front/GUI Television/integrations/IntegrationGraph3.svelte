<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/cylinder.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>


</svelte:head>
<script>

const BASE_API_PATH = "/proxyHeroku/api/v2";

let Datas = [];


let graphCountry = [];
let graphYear = [];
let graphchildren_out_school_male = [];
let graphchildren_out_school_female = [];
let graphchildren_out_school_total = [];



async function loadGraph(){

    console.log("Fetching data...");
    const res = await fetch(BASE_API_PATH + "/children-out-school");
    Datas = await res.json();
    if (res.ok) {
        console.log("va bien");
      Datas.forEach(stat => {
        graphCountry.push(stat.country+"-"+stat.year);
        graphYear.push(stat.avg_age);
        graphchildren_out_school_male.push(stat.children_out_school_male);
        graphchildren_out_school_female.push(stat.children_out_school_female);
        graphchildren_out_school_total.push(stat.children_out_school_total);
      });
    }


    Highcharts.chart('container', {
  chart: {
    type: 'cylinder',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      depth: 50,
      viewDistance: 25
    }
  },
  title: {
    text: 'Numero total de abandonos escolares'
  },
  xAxis: {
    categories: graphCountry
  },
  plotOptions: {
    series: {
      depth: 25,
      colorByPoint: true
    }
  },
  series: [{
    data: graphchildren_out_school_total,
    name: 'Cylinders',
    showInLegend: false
  }]
});
}
</script>

<main>
  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      Chart showing basic use of 3D cylindrical columns. A 3D cylinder chart
      is similar to a 3D column chart, with a different shape.
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