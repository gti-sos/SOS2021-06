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
    let hourStats = [];
    let ageStats = [];
    let audienceStats = [];

    async function getStreams() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/streaming-stats");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            streamingStats = json;
            console.log(streamingStats);
            console.log(`We have received ${streamingStats.length} streaming platforms.`);
            let i = 0;
            while(i<streamingStats.length){

				platforms.push({label: ""+streamingStats[i].platform+"/"+streamingStats[i].year});
				hourStats.push({value: ""+streamingStats[i].hour_viewed/1000000000});
				ageStats.push({value: ""+streamingStats[i].avg_age});
				audienceStats.push({value: ""+streamingStats[i].avg_audience/100000});
				i++;
			}
        } else {
            console.log("Error!");
        }
        console.log(platforms)
    loadGraph();
}
    onMount(getStreams);
    console.log(platforms)
    var chartConfigs={};

async function loadGraph(){
    const dataSource = {
        "chart": {
            "caption": "Datos streaming",
            "yaxisname": "",
            "stack100percent": "0",
            "theme": "fusion",
            "yaxismaxvalue": "100",
            "decimals": "1",
            "drawcrossline": "0"
        },
        "categories": [
            {
            "category": platforms
            }
        ],
        "dataset": [
            {
            "seriesname": "Horas visualizadas anuales (Miles de millones)",
            "data": hourStats
            },
            {
            "seriesname": "Edad media audiencia",
            "data": ageStats
            },
            {
            "seriesname": "Average audience (Cientos de miles)",
            "data": audienceStats
            }
        ]
    };

    chartConfigs = {
        type: 'marimekko',
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