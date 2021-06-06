
<svelte:head>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.svg.common.core.js"></script>
    
   
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.svg.hbar.js"
        on:load={loadGraph}></script>
    
</svelte:head>

<script>
    import { onMount } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    import NotFound from "../NotFound.svelte";

    async function loadGraph() {
    var url = new URL(
        "https://coinranking1.p.rapidapi.com/coins"
    );
    //var parametros = { ingr: "pop corns" };
   // url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6b8c244e56msh740f3ef7cc9ede8p112da5jsnd0536e037c36",
	      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      },
    });   

    let Datos = await res.json();

    console.log(Datos);
 
    let data = [];
    let labels = [];
    Datos.data.coins.forEach((x) => {
      let comida = x;
      labels.push(comida.name);
      data.push(parseFloat(comida.price));
    });

    let newLabels = labels.slice(4, 8);
    let newData = data.slice(4, 8);
   console.log(newData);
   // Create the HBar chart. There's only a small amount of data given
    // to the chart.
    new RGraph.SVG.HBar({
        id: 'chart-container',
        data: newData,
        options: {
            yaxisLabels: newLabels,
            yaxisColor: 'white',
            yaxisTickmarks: null,
            xaxis: false,
            
            // Turn off the background grid horizontal lines
            backgroundGridHlines: false,
            backgroundGridBorder: false,
            backgroundGridColor: 'white',

            title: 'Valor de las Mejores AltCoins',
            textColor: 'white',
            textSize: 8,
            
            // Use the RGraph short gradient syntax to add some colors
            // to the chart.
            colors: [
                'Gradient(#9B68C0:#E4C1FD)',
                'Gradient(#9B9B9B:#E5E5E5)',
                'Gradient(#B38D1A:#F7DD91)',
                'Gradient(#4E81B4:#B2D4F6)',
                'Gradient(#9B0303:#E57F7F)'
            ],
            
            // So that all of the bars are a separate color (as defined
            // above) the colorsSequential option should be given.
            colorsSequential: true,

            //labelsAbove: ,
            xaxisScaleUnitsPre: '$',
            xaxisScaleUnitsPost: ''
        }
    
    // Draw the chart and add a responsive configuration that resizes the chart when you use a
    // smaller screen
    }).draw().responsive([
        {maxWidth:null,width:650,height:300},
        {maxWidth:800, width:400,height:250}
    ]);
    }
</script>

<main>
    <p style="padding-left: 22%;">Valor Criptomonedas($)</p>
    <div  id="chart-container"></div>
</main>

<style>
  /*
  * Here's some CSS to configure the appearance of the DIV tag
  * that the chart is added to. There's positioning and sizing
  * information as well as two of the corners being rounded.
  */
  main{
      margin-top: 5%;
      margin-left: 25%;
  }
  div#chart-container {
      width: 650px;
      height: 300px;
      display: inline-block;
      background-image: linear-gradient(45deg, #000049,#0000CB);
      border-bottom-right-radius: 25px;
      border-top-left-radius: 25px;
  }
</style>