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
    let performances = [];

    let platforms = [];
    let audiencePercents = [];
    let years = [];
    let labelYear = [];
    let performance = [];

    let audienceTotal = 0;

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
                if(streamingStats[i].platform=="Twitch"){
                    platforms.push(streamingStats[i].avg_audience)
                }
                //platforms.push({label: streamingStats[i].platform+"/"+streamingStats[i].year, value: ""+streamingStats[i].avg_audience/100000})
                i++;
            }
        } else {
            console.log("Error!");
        }
        console.log(platforms)
        for(const x of platforms){
            audienceTotal += x;
        }
        for(const x of platforms){
            audiencePercents.push({value: ""+x/audienceTotal*100})
        }
        getPerformances();
    }

    async function getPerformances(){
        console.log("Fetching data...");
        const res = await fetch("/proxyGoncamper/api/v2/performances-by-degrees-us");
        if (res.ok){
            console.log("Ok.");
            const json = await res.json();
            performances = json;
            performances.forEach(data => {
                if(data["field-of-knowledge"]=="Computer-Science"){
                    years.push(data["year"]);
                }
                performance.push({value: ""+(data["credits-passed"]/data["credits-enrolled"])*100})
                
            });
        }
        years.sort()
        for (const x of years){
            labelYear.push({label: ""+x});
        }
        //console.log(degreeYear)
        loadGraph()
    }

    onMount(getStreams);
    

    async function loadGraph(){
        const dataSource = {
        "chart": {
            "caption": "Comparacion desempeño estudiantes informática vs audiencia twitch",
            "yaxisname": "",
            "subcaption": "",
            "drawcrossline": "1",
            "numbersuffix": "%",
            "plottooltext": "$seriesName tiene $dataValue en $label",
            "theme": "fusion"
        },
        "categories": [
            {
            "category": labelYear
            }
        ],
        "dataset": [
            {
            "seriesname": "Informatica",
            "data": performance
            },
            {
            "seriesname": "Twitch",
            "data": audiencePercents
            }
        ]
        };

        chartConfigs = {
        type: 'msarea',
        width: 600,
        height: 400,
        dataFormat: 'json',
        dataSource
        };
    }


</script>

<main>
    <SvelteFC {...chartConfigs} />
</main>

<style>

</style>