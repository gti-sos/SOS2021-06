<script>
    import {
        onMount
    } from "svelte";

    let streamingStats = [];
    let performances = [];

    let platforms = [];
    let degreeYear = [];
    let performance = [];

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
        getPerformances();
    }

    async function getPerformances(){
        console.log("Fetching data...");
        const res = await fetch("http://sos2021-09.herokuapp.com/api/v2/performances-by-degrees-us/");
        if (res.ok){
            console.log("Ok.");
            const json = await res.json();
            performances = json;
            let i = 0;
            while(i<performances.length){
                degreeYear.push(performances[i]["field-of-knowledge"]+"/"+performances[i].year);
                performance.push(performances[i].performance-percents);
            }
        }
    }

    onMount(getStreams);
    console.log(degreeYear);
    console.log(performance);
</script>

<main>

</main>

<style>

</style>