<script type="text/javascript">
  async function loadGraph() {
      let HostelryData = [];
      //let DataGraph = [];   Se usa diferentes contenedores en vez de uno global
      let aux = ["x"];
      let aux_1 = ["Turistas durante 2020"];
      let aux_2 = ["Turistas durante 2019"];        
      const resData = await fetch("/api/v2/television-stats");
      HostelryData = await resData.json(); 
      //Recorrer los recursos de hostelries
      HostelryData.forEach((f) =>{
        aux.push(f.groupTV+" - "+f.year)
        aux_1.push(f.cable_tv_broadcast_avg_audience_year)
        aux_2.push(f.avg_audience_month)
      });
      //console.log(turistas_2019);
      //console.log(turistas_2020);
      //REFERENCIA:
      //  https://naver.github.io/billboard.js/demo/#Chart.RadarChart
      //DESCARGA -> IMPORTAR 
      //  https://naver.github.io/billboard.js/release/latest/doc/
      var chart = bb.generate({
          data: {
              x: "x",
              columns: [
              aux,
              aux_1,
              aux_2
              ],
              type: "radar",
              labels: false       //desactiva los numeros en cada punto de la gráfica
          },
          title: {
      text: 'Hostelería España'
    },
    
          radar: {
              axis: {
              max: 21000000
              },
              level: {
              depth: 3
              },
              direction: {
              clockwise: true
              }
          },
          bindto: "#radarChart"
      });
  }

loadGraph();
</script>

<svelte:head>

</svelte:head>

<main>

  <div id="radarChart"></div>
  
  <p style="text-align:center;">
      En la gráfica podemos observar el número de turistas en España según las Comunidades Autonomas.
  </p>
</main>