
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
        "https://edamam-food-and-grocery-database.p.rapidapi.com/parser"
    );
    var parametros = { ingr: "pop corns" };
    url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6b8c244e56msh740f3ef7cc9ede8p112da5jsnd0536e037c36",
	    "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
      },
    });   

    let Datos = await res.json();

    console.log(Datos);
 
    let data = [];
    let labels = [];
    Datos.hints.forEach((x) => {
      let comida = x.food;
      labels.push(comida.label);
      data.push(parseFloat(comida.nutrients.ENERC_KCAL));
    });

    let newLabels = labels.slice(5, 12);
    let newData = data.slice(5, 12);

    new RGraph.Radar({
      id: "cvs",
      data: [newData],
      options: {
        backgroundCirclesPoly: false,
        backgroundCirclesSpacing: 55,
        colors: ["transparent"],
        axesColor: "transparent",
        highlights: true,
        colorsStroke: ["green"],
        linewidth: 4,
        labels: newLabels,
        labelsAxes: "n",
        textSize: 8,
      },
    })
      .trace()
      .responsive([
        {
          maxWidth: null,
          width: 500,
          height: 400,
          css: { float: "center" },
        },
        {
          maxWidth: 600,
          width: 300,
          height: 300,
          css: { float: "none" },
        },
      ]);
    }
</script>

<main>
    <p align = "center">Consumo de Palomitas(Kcal)</p>
    <div  align = "center">
        <canvas id="cvs" width="500" height="400" > [No canvas support] </canvas>
    </div>
</main>