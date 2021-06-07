
<svelte:head>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
        <script src="https://www.rgraph.net/libraries/src/RGraph.common.dynamic.js"></script>
        <script src="https://www.rgraph.net/libraries/src/RGraph.common.tooltips.js"></script>
   
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.activity.js"
        on:load={loadGraph}></script>
    
</svelte:head>

<script>
    import { onMount } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    import NotFound from "../NotFound.svelte";

    async function loadGraph() {
    var url = new URL(
        "https://jikan1.p.rapidapi.com/genre/anime/1/1"
    );
    //var parametros = { ingr: "pop corns" };
   // url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6b8c244e56msh740f3ef7cc9ede8p112da5jsnd0536e037c36",
	"x-rapidapi-host": "jikan1.p.rapidapi.com",
      },
    });   

    let Datos = await res.json();

    console.log(Datos);
 
    let data = [];
    let labels = [];
    Datos.anime.forEach((x) => {
      let comida = x;
      labels.push(comida.title);
      data.push(parseFloat(comida.score));
    });

    let newLabels = labels.slice(0, 8);
    let newData = data.slice(0, 8);
   console.log(newData);
   let activity = new RGraph.Activity({
        id: 'cvs',
        min: 0,
        max: 100,
        value: newData,
        options: {
            backgroundColor: 'transparent',
            backgroundGrid: true,
            backgroundGridColor: '#aaa',
            backgroundRings: false,
            colors: ['blue','gray','green','red',"brown", "orange", "yellow", "pink"],
            labels: newLabels,
            labelsBold: true,
            labelsItalic: true,
            tooltips:                        'Result: %{key}',
             tooltipsCss:                       {
                fontSize: '50pt',
                textAlign: 'left'
             },
            tooltipsFormattedKeyLabels:      ["8.51","9.17","7.22","8.54","8.04","7.80","7.93","9.07"],
            ends: 'straight',
            labelsColor: 'black'
        }
    }).grow();
    
    
    }
</script>

<main>
    <p align = "center">Nota animes</p>
    <canvas id="cvs" width="400" height="400">
        [No canvas support]
    </canvas>
</main>

<style>
  /*
  * Here's some CSS to configure the appearance of the DIV tag
  * that the chart is added to. There's positioning and sizing
  * information as well as two of the corners being rounded.
  */
  
  
</style>