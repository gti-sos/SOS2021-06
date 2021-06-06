
<svelte:head>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
    
    <script src="https://www.rgraph.net/libraries/src/RGraph.common.effects.js"></script>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.radar.js"
        on:load={loadGraph}></script>
    
</svelte:head>

<script>
    import { onMount } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    import NotFound from "../NotFound.svelte";

    async function loadGraph() {
    var url = new URL(
        "https://crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com/api/v1/blockfacts/price/snapshot"
    );
    var parametros = {denominator: "USD", asset: "ADA" };
    url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": "Vhcl75IoYr5JhVxiaYHArbQydrj0ax",
	      "x-api-secret": "BiXE5D7gpAW0Wr3iQoTKp8lwHcNwIyyuscYhIzdKYL6lm",
      	"x-rapidapi-key": "6b8c244e56msh740f3ef7cc9ede8p112da5jsnd0536e037c36",
	      "x-rapidapi-host": "crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com",
      },
    });   

    let Datos = await res.json();

    console.log(Datos);
 
    let data = [];
    let labels = [];
    Datos.forEach((x) => {
      let moneda = x.BLOCKFACTS;
      labels.push(moneda.pair);
      data.push(parseFloat(moneda.price));
    });

    let newLabels = labels.slice(5, 12);
    let newData = data.slice(5, 12);

    console.log(newData);

    // Create the Line chart and give it all of the data that's to be shown
    // on the chart. There's four datasets but so that the lines appear to
    // be 'floating' the first dataset has a transparent color. The first
    // line is the bottom edge of the set of lines.
    new RGraph.SVG.Line({
        id: 'chart-container',
        data: [newData
            
        ],
        options: {
            filled: true,
            filledAccumulative: true,
            
            // Here's the colors being set - note the first is transparent
            // so we don't see it.
            colors: ['transparent', '#FDA354', '#C4D6ED', '#609EC8'],

            spline: true,

            // Turn off the background grid vertical lines and its border
            backgroundGridVlines: false,
            backgroundGridBorder: false,

            xaxis: false,
            yaxis: false,
            textSize: 10,
            xaxisLabels: [newLabels]
        }
    
    // Animate the chart with the trace() effect and add some responsive capability to
    // accommodate both large and small screens
    }).trace().responsive([
        {maxWidth:null,width:600,height:250,css:{'float':'right'}},
        {maxWidth:800, width:450,height:200,css:{'float':'none'}}
        
    ]);
    }
</script>

<main>
    <p align = "center">Valor de ADA(Cardano)</p>
    <div  align = "center">
        <canvas id="cvs" width="500" height="400" > [No canvas support] </canvas>
    </div>
</main>