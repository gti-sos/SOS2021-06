

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<script>

let datos = [];

let gCountry = [];
let gYear = [];
let gObesitymale = [];
let gObesityfemale = [];
let gObesitytotal = [];

async function loadGraph(){
    console.log("Fetching data...");
    const res = await fetch("/ProxyObesity/api/integration/obesity-stats");
    datos = await res.json();
    if (res.ok) {
        
      datos.forEach(stat => {
        gCountry.push(stat.country);
        gYear.push(stat.year);
        gObesitymale.push({name:stat.country + "/" + stat.year, y:stat.man_percent});
        gObesityfemale.push(stat.woman_percent);
        gObesitytotal.push(stat.total_population);
      });
      console.log(gCountry);
    }

    Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
                type : 'pie',
                name: 'Porcentaje de Hombres con Obesidad',
                data: gObesitymale
            
            }]
        });
   
  }

</script>

<main>
    <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
     
    </p>
    </figure> 
</main>

<style>
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


input[type="number"] {
	min-width: 50px;
}
</style>





