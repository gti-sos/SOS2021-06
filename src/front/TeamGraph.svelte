<script>

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
import { onMount } from "svelte";
import { Nav, NavItem, NavLink, Table, Button, Alert,  Pagination, PaginationItem,
    PaginationLink } from "sveltestrap";
// Always set FusionCharts as the first parameter
fcRoot(FusionCharts, Charts, FusionTheme);


let streamingStats = [];
let televisionStats = [];
let onlinemediaStats = [];
let platformyearStats = [];
var chartConfigs = {};

async function getStreams() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/streaming-stats");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            streamingStats = json;
            console.log(`We have received ${streamingStats.length} streaming platforms.`);
            streamingStats.forEach(stat => {
                platformyearStats.push({label:stat.platform+"/"+stat.year,value:""+stat.avg_audience});
            });
        } else {
            console.log("Error!");
        }
        const resOM = await fetch("/api/v1/onlinemedia-stats");
        if(resOM.ok){
            console.log("Ok.");
            const json = await resOM.json();
            onlinemediaStats = json;
            console.log(`We have received ${onlinemediaStats.length} onlinemedia platforms.`);
            onlinemediaStats.forEach(stat => {
                platformyearStats.push({label:stat.online_media + "/" + stat.year,value:""+(stat.audience*1000000)});
            });
        } else {
            console.log("Error!");
        }
        const resTV = await fetch("/api/v2/television-stats");
        if(resTV.ok){
            console.log("Ok.");
            const json = await resTV.json();
            televisionStats = json;
            console.log(`We have received ${televisionStats.length} television platforms.`);
            televisionStats.forEach(stat => {
                platformyearStats.push({label:stat.groupTV + "/" + stat.year,value:""+stat.avg_audience_month});
            });
        } else {
            console.log("Error!");
        }
        console.log(platformyearStats)
        loadGraph()
    }

    async function loadInitialData() {
    console.log("Loading data...");

    const res = await fetch(
     "/api/v1/streaming-stats/loadInitialData"
    ).then(function (res) {
      if(res.ok){
         getStreams(); 
      }
    });
    
  }
onMount(getStreams);
async function loadGraph(){
    const dataSource = {
  "chart": {
    "caption": "Distribucion de Audiencias de las diferentes plataformas",
    "subcaption": "",
    "showpercentvalues": "1",
    "defaultcenterlabel": "Distribución de Audiencia",
    "aligncaptionwithcanvas": "0",
    "captionpadding": "0",
    "decimals": "1",
    "plottooltext": "<b>$percentValue</b> de la audiencia total está en<b>$label</b>",
    "centerlabel": "Audiencia: $value",
    "theme": "fusion"
  },
  "data": platformyearStats
};

chartConfigs = {
   type: 'doughnut2d',
   width: 1000,
   height: 800,
   dataFormat: 'json',
   dataSource
};
}

const BotonCargar = () => {
    loadInitialData();
  };

</script>



    
    
<main>
<Nav>
    <NavItem id="Boton">
      
        <NavLink
          href="#"
          on:click={BotonCargar}
          id="Boton"
          type="button"
          class="btn btn-success btn-sm"
          style="margin: 1em"
        >
          Cargar datos en su totalidad</NavLink
        >
     
    </NavItem>
</Nav>
<div><SvelteFC {...chartConfigs} /></div>

</main>

<style>

</style>