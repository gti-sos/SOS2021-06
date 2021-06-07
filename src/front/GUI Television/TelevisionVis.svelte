<script type="text/javascript">
  async function loadGraph() {
      let HostelryData = [];
      let aux = ["x"];
      let aux_1 = ["Media Audiencia anual"];
      let aux_2 = ["Media Audiencia mesual"];        
      const resData = await fetch("/api/v2/television-stats");
      HostelryData = await resData.json(); 
      HostelryData.forEach((f) =>{
        aux.push(f.groupTV+" - "+f.year)
        aux_1.push(f.cable_tv_broadcast_avg_audience_year)
        aux_2.push(f.avg_audience_month)
      });
      
      var chart = bb.generate({
          data: {
              x: "x",
              columns: [
              aux,
              aux_1,
              aux_2
              ],
              type: "radar",
              labels: false      
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