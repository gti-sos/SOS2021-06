<script>
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

    // Always set FusionCharts as the first parameter
    fcRoot(FusionCharts, Charts, FusionTheme);

    import {
        onMount
    } from "svelte";

    let streamingStats = [];
    let hourStats = [];

    let games = [];
    let soldUnits = [];

    let yearsXaxis = new Set();
    let years = [];
    var chartConfigs={};

    async function getStreams() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/streaming-stats");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            streamingStats = json;
            console.log(`We have received ${streamingStats.length} streaming platforms.`);
            let i = 0;
            while(i<streamingStats.length){
                hourStats.push({x : ""+streamingStats[i].year, y: ""+streamingStats[i].hour_viewed/100})
                yearsXaxis.add(streamingStats[i].year);
                i++;
            }
        } else {
            console.log("Error!");
        }
        getGames();
    }

    async function getGames(){
        console.log("Fetching data...");
        const res = await fetch("https://sos2021-28.herokuapp.com/api/v1/games");
        if (res.ok){
            console.log("Ok.");
            const json = await res.json();
            games = json;
            games.forEach(data => {
                soldUnits.push({x: ""+data.year,y: data["sold-unit"]});
                yearsXaxis.add(data.year);
            });
        }
        let yearsSinRep = Array.from(yearsXaxis);
        for (var i of yearsSinRep){
            years.push({x:""+i,label:""+i})
        }
        //console.log(degreeYear)
        loadGraph()
    }

    onMount(getStreams);

    async function loadGraph(){
        const dataSource = {
  "chart": {
    "caption": "Unidades del juego mas vendido vs total de horas vistas de Streaming",
    "subcaption": "Por año",
    "xaxisname": "Años",
    "yaxisname": "",
    "xaxisminvalue": "1980",
    "xaxismaxvalue": "2030",
    "ynumberprefix": "",
    "yaxisminvalue": "100000000",
    "xnumbersuffix": "",
    "theme": "fusion",
    "plottooltext": "<b>$yDataValue</b> de <b>$seriesName</b> <br>en el año <b>$xdataValue</b>"
  },
  "categories": [
    {
      "category": years
    }
  ],
  "dataset": [
    {
      "seriesname": "Horas vistas",
      "anchorbgcolor": "5D62B5",
      "data": hourStats
    },
    {
      "seriesname": "Unidades vendidas",
      "anchorbgcolor": "#29C3BE",
      "data": soldUnits
    }
  ]
};

chartConfigs = {
   type: 'scatter',
   width: 1700,
   height: 600,
   dataFormat: 'json',
   dataSource
};
    };


</script>

<main>
 <SvelteFC {...chartConfigs} />
</main>

<style>

</style>