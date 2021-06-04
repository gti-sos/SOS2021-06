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

    let platforms = [];

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

                platforms.push({label: streamingStats[i].platform+"/"+streamingStats[i].year, value: ""+streamingStats[i].avg_audience/100000})
				i++;
			}
        } else {
            console.log("Error!");
        }
    loadGraph();
}
    onMount(getStreams);
    console.log(platforms)
    var chartConfigs={};

async function loadGraph(){
    const dataSource = {
        "chart": {
            "caption": "Audience Share of Streaming Platforms",
            "plottooltext": "<b>$percentValue</b> of the streaming audience was on $label servers",
            "showlegend": "1",
            "showpercentvalues": "1",
            "legendposition": "bottom",
            "usedataplotcolorforlabels": "1",
            "theme": "fusion"
        },
        "data": platforms
        };

    chartConfigs = {
        type: 'pie2d',
        width: 600,
        height: 400,
        dataFormat: 'json',
        dataSource
    };
};

</script>

<main>
    <figure class="chart">
        <div id="chart-container"></div>
    </figure>
    <SvelteFC {...chartConfigs}/>
</main>

<style>

</style>