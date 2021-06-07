<script type="text/javascript">
  async function loadGraph() {
    var url = new URL("https://radio-browser.p.rapidapi.com/json/stations");

    var parametros = {
      reverse: "false",
      offset: "0",
      limit: "10",
      hidebroken: "false",
    };
    url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1cfce798a7mshf98d29e01aed103p1ffca3jsna2fe39f7b06d",
        "x-rapidapi-host": "radio-browser.p.rapidapi.com",
      },
    });

    let Datos = await res.json();
    console.log(Datos);
    let aux = ["x"];
    let aux_1 = ["votos"];
    Datos.forEach((f) => {
      aux.push(f.name);
      aux_1.push(f.votes);
    });

    console.log("aux", aux);
    console.log("aux1", aux_1);

    var chart = bb.generate({
      data: {
        x: "x",
        columns: [aux, aux_1],
        type: "area", // for ESM specify as: bar()
      },
      axis: {
        x: {
          type: "category",
          tick: {
            rotate: 75,
            multiline: false,
            tooltip: true,
          },
          height: 130,
        },
      },
      title: {
        text: 'Grafica Radio/votos'
      },
      bindto: "#areaChart",
    });
  }

  loadGraph();
</script>

<svelte:head />

<main>
  <div id="areaChart" />

  <p style="text-align:center;">
    Grafica de emisoras de radio con los votos de cada una.
  </p>
</main>
<style>
  main{
    margin: 4%;
  }
</style>
