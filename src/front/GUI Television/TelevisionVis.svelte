
 <svelte:head>
    <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css" on:load={loadGraph}>  
  </svelte:head>
  <script>
    import bb, {area, areaSpline} from "billboard.js/dist/billboard.pkgd";
    let graphData = [];

    async function loadGraph(){
      const res = await fetch("/api/v2/television-stats")
      const fireData = await res.json()
      if(res.ok){
        console.log("[INFO] Se han cargado los datos correctamente los datos.")
        console.log(fireData)
      }else{
        console.log("[ERR] Se ha producido un error cargando los datos.")
      }
      let aux = []
      let aux_1 = ["Número de incendios"]
      let aux_2 = ["Número de especies afectas"]
      fireData.forEach((f) =>{
        aux.push(f.groupTV+" - "+f.year)
        aux_1.push(f.cable_tv_broadcast_avg_audience_year)
        aux_2.push(f.avg_audience_month)
      });
      graphData = [aux_1, aux_2]
      console.log("[INFO] Datos recogidos de: "+aux)
      console.log("[INFO] Datos cargados para la gráfica: "+graphData)
      var chart2 = bb.generate({
  data: {
    x: "x",
    columns: [
	["x", "Item1", "Item2", "Item3", "Item4", "Item5", "Item6",],
    ],
    type: "bar", // for ESM specify as: bar()
    groups: [
      [
        "data1",
        "data2"
      ]
    ],
    stack: {
      normalize: true
    }
  },
  axis: {
    x: {
      type: "category"
    }
  },
  bindto: "#areaChart"
});
chart.load({
    columns:graphData
  })
    }
    </script>

    <main>
      <div id="barChart"></div>
    </main>