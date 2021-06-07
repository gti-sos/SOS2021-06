<script type="text/javascript">
  async function loadGraph() {
    let Data = [];
    let aux = ["x"];
    let aux_1 = ["Media Audiencia anual"];
    let aux_2 = ["Media Audiencia mesual"];
    const resData = await fetch("/api/v2/television-stats");
    Data = await resData.json();
    Data.forEach((f) => {
      aux.push(f.groupTV + " - " + f.year);
      aux_1.push(f.cable_tv_broadcast_avg_audience_year);
      aux_2.push(f.avg_audience_month);
    });

    var chart = bb.generate({
      data: {
        x: "x",
        columns: [aux, aux_1, aux_2],
        type: "radar",
        labels: false,
      },
      title: {
        text: 'Grafica de audiendias de grupos TV'
      },

      radar: {
        axis: {
          max: 21000000,
        },
        level: {
          depth: 3,
        },
        direction: {
          clockwise: true,
        },
      },
      bindto: "#radarChart",
    });
  }

  loadGraph();
</script>

<svelte:head />

<main>
  <div id="radarChart" />

  <p style="text-align:center;">
    Se muestra en la grafica las medias de las audiencias por año/mes y la edad media de las personas que ven dicha cadena.
  </p>
</main>
<style>
  main{
    margin:5%;
  }
</style>