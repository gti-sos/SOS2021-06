

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

    //window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Datos de las principales plataformas de pago de contenido bajo demanda en España"
        },	
        axisY: {
            title: "Valor",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },	
        data: [
            {
                type: "column",
                name: "Precio por subscripción mensual",
                showInLegend: true,
                dataPoints: priceGraph
            },{
                type: "column",
                name: "Nota en Google Play España",
                showInLegend: true,
                dataPoints: markGraph
        
            },{
                type: "column",
                name: "Audiencia (Millones)",
                showInLegend: true,
                dataPoints: audienceGraph
            }]
    });
    chart.render();
}

</script>

<svelte:head>
    <script
        src="https://canvasjs.com/assets/script/canvasjs.min.js" on:load={loadGraph}>
    </script>
</svelte:head>

<main>
    <div id="chartContainer" style="height: 370px; width: 100%;" />
</main>
