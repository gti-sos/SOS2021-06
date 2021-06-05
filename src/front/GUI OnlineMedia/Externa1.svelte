
<svelte:head>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
    
    <script src="https://www.rgraph.net/libraries/src/RGraph.common.csv.js"></script>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.hbar.js"
        on:load={loadGraph}></script>
    
</svelte:head>

<script>
    import { onMount } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    import NotFound from "../NotFound.svelte";

    const BASE_API_PATH = "/api/v1";

    let onlinemediaStats = [];

    let platform_yearGraph = [];
    let priceGraph = [];
    let markGraph = [];
    let audienceGraph = [];

    async function loadGraph() {
        const res = await fetch(BASE_API_PATH + "/onlinemedia-stats");
        onlinemediaStats = await res.json();

        if (res.ok) {
            onlinemediaStats.forEach((stat) => {
                platform_yearGraph.push(stat.online_media + "/" + stat.year);
                priceGraph.push(stat.account_price_per_month);
                markGraph.push(stat.mark);
                audienceGraph.push(stat.audience);
            });
        }

       // Use the CSV connector to read the sample.csv file from the server
    let x = new RGraph.CSV({url: '/sample.csv', callback: function (csv)
    {
        // Fetch the first row of the CSV file, starting at the second column
        // (as with many things in programming - counting starts at zero)
        var data = csv.getRow(0, 1);

        // Create and show the Horizontal Bar chart using the data that was
        // retrieved from the CSV file. The only other configuration is the
        // addition of some labels and widening the left margin.
       let y = new RGraph.HBar({
            id: 'cvs',
            data: data,
            options: {
                yaxisLabels: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                marginLeft: 95
            }
        }).draw();
    }});
    }
</script>

<main>
    <div  align = "center">
        <canvas id="cvs" width="500" height="400"> [No canvas support] </canvas>
    </div>
</main>