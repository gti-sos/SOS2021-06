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
    const res = await fetch("http://sos2021-10.herokuapp.com/api/integration/obesity-stats");
    datos = await res.json();
    if (res.ok) {
        
      datos.forEach(stat => {
        gCountry.push(stat.country);
        gYear.push(stat.year);
        gObesitymale.push(stat.man_percent);
        gObesityfemale.push(stat.woman_percent);
        gObesitytotal.push(stat.total_population);
      });
    }

    Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Obesidad en el mundo'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value} habitantes'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
                name: gCountry,
                data: gObesitymale
            },
            {
                name: 'Porcentaje de Mujeres con Obesidad',
                data: gObesityfemale
            },
            {
                name: 'Población Total',
                data: gObesitytotal
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
</style>