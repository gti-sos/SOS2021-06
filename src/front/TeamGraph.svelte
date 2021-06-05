<script>

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
import { onMount } from "svelte";
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
onMount(getStreams);
async function loadGraph(){
    const dataSource = {
  "chart": {
    "caption": "Audience Distribution for our platforms",
    "subcaption": "",
    "showpercentvalues": "1",
    "defaultcenterlabel": "Audience Distribution",
    "aligncaptionwithcanvas": "0",
    "captionpadding": "0",
    "decimals": "1",
    "plottooltext": "<b>$percentValue</b> of total audience users were on <b>$label</b>",
    "centerlabel": "# Users: $value",
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

</script>

<SvelteFC {...chartConfigs} />

    
    
<main>

</main>

<style>

</style>