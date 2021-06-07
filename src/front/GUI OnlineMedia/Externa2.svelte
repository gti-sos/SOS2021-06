
<svelte:head>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
    
    <script src="https://www.rgraph.net/libraries/src/RGraph.common.effects.js"></script>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.rose.js"
        on:load={loadGraph}></script>
    
</svelte:head>

<script>
    import { onMount } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    import NotFound from "../NotFound.svelte";

    async function loadGraph() {
    var url = new URL(
        "https://leejaew-hotels-in-singapore-v1.p.rapidapi.com/hotels"
    );
    var parametros = {country: "Singapore" };
    url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6b8c244e56msh740f3ef7cc9ede8p112da5jsnd0536e037c36",
	    "x-rapidapi-host": "leejaew-hotels-in-singapore-v1.p.rapidapi.com",
      },
    });   

    let Datos = await res.json();

    console.log(Datos);
 
    let data = [];
    let labels = [];
    Datos.forEach((x) => {
      let moneda = x;
      labels.push(moneda.name);
      data.push(parseFloat(moneda.totalrooms));
    });

    let newLabels = labels.slice(0, 10);
    let newData = data.slice(0, 10);

    console.log(newData);
    let labels_small = newLabels;
    let labels_large = newLabels;

    // This is a stacked 3D Rose chart. The data is the same as a regular stacked
    // Rose chart and looks just like the data that you'd pass to a grouped or
    // stacked Bar chart.

    new RGraph.Rose({
        id: 'cvs',
        data: newData,

        options: {
            // A custom property used in the tooltips
            myNames: ['Wilf','Harry','Gerrard'],

            colorsStroke: 'rgba(0,0,0,0)',
            margin: 7,
            variant: '3d',
            variantThreedDepth: 10,
            labelsAxes: 'n',
            colors: ['gradient(#faa:red)','Gradient(#afa:green)','gradient(#aaf:#ddf)'],
            
            // Tooltips, given as a template string
            tooltips: '%{property:myNames[%{index}]} on %{property:labels[%{group}]}: <b>%{value}%</b>',
            
            // Some CSS styles that are added to the tooltips
            tooltipsCss: {
                fontSize:'20pt'
            },

            labels: labels_large,
            textAccessible: false
        }
    }).grow({frames: 15}).responsive([
        {maxWidth: null, width: 800, height: 500,options:{labels:labels_large,variant:'3d'},css: {'float':'right'}},
        {maxWidth: 1800, width: 1400, height: 350,options:{labels:labels_small,variant:'none'},css: {'float':'none'}}
    ]);
    }
</script>

<main>
    <p align = "center">Numero de habitaciones de los hoteles de Singapur</p>
    <div  align = "center">
        <canvas id="cvs" width="500" height="400" > [No canvas support] </canvas>
    </div>
</main>
