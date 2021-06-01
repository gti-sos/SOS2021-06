<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
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
    

    let platform_yearGraph = [];
    let priceGraph = [];
    let markGraph = [];
    let audienceGraph = [];
    

    async function getOnlineMedia() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/onlinemedia-stats");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            onlinemediaStats = json;
            console.log(`We have received ${onlinemediaStats.length} streaming platforms.`);
        } else {
            console.log("Error!");
        }
    }
    onMount(getOnlineMedia);

    async function loadGraph(){

        const res = await fetch(BASE_API_PATH + "/onlinemedia-stats");
        onlinemediaStats = await res.json();

    if (res.ok){
        onlinemediaStats.forEach(stat => {
            platform_yearGraph.push(stat.online_media + "/" + stat.year);
            priceGraph.push(stat.account_price_per_month);
            markGraph.push(stat.mark);
            audienceGraph.push(stat.audience);

        })
    }

    Highcharts.chart('container', {
    chart: {
        type: 'areaspline'
    },
    title: {
          text: 'Datos de las principales plataformas de pago de contenido bajo demanda en España'
      },

      yAxis: {
          title: {
              text: 'Valor'
          }
      },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 60,
        y: 45,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        title: {
              text: 'País/Año'
          },
          categories : platform_yearGraph,
        
    },
    
    
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [
        {
          name: "Precio por subscripción mensual",
          data: priceGraph,
        },
        {
          name: "Nota en Google Play España",
          data: markGraph,
        },
        {
          name: "Audiencia (Millones)",
          data: audienceGraph,
        }
        
      ]
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

<!--<svelte:head>
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
    

    let platform_yearGraph = [];
    let priceGraph = [];
    let markGraph = [];
    let audienceGraph = [];
    

    async function getOnlineMedia() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/onlinemedia-stats");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            onlinemediaStats = json;
            console.log(`We have received ${onlinemediaStats.length} streaming platforms.`);
        } else {
            console.log("Error!");
        }
    }
    onMount(getOnlineMedia);

    async function loadGraph(){

        const res = await fetch(BASE_API_PATH + "/onlinemedia-stats");
        onlinemediaStats = await res.json();

    if (res.ok){
        onlinemediaStats.forEach(stat => {
            platform_yearGraph.push(stat.online_media + "/" + stat.year);
            priceGraph.push(stat.account_price_per_month);
            markGraph.push(stat.mark);
            audienceGraph.push(stat.audience);

        })
    }

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
              text: 'País/Año'
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
          name: "Precio por subscripción mensual",
          data: priceGraph,
        },
        {
          name: "Nota en Google Play España",
          data: markGraph,
        },
        {
          name: "Audiencia (Millones)",
          data: audienceGraph,
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
</style>-->
