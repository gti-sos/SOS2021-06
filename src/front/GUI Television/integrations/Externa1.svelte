<script type="text/javascript">
  async function loadGraph() {
    var url = new URL("https://covid-19-statistics.p.rapidapi.com/reports");

    var parametros = {
      region_name: "Spain",
      iso: "ESP",
      region_province: "Andalusia",
    };
    url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1cfce798a7mshf98d29e01aed103p1ffca3jsna2fe39f7b06d",
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
      },
    });

    let Datos = await res.json();
    console.log(Datos);
    let aux = [];
    let aux_1 = [];
    let aux_2 = [];
    Datos.data.forEach((f) => {
      aux.push(f.date);
      aux_1.push(f.confirmed);
      aux_2.push(f.deaths);
    });

    console.log("casos confirmados", aux_1);
    console.log("fallecimientos", aux_2);

    var chart = bb.generate({
      data: {
        columns: [
          ["Casos confirmados", aux_1],
          ["Fallecimientos", aux_2],
        ],
        type: "pie", // for ESM specify as: pie()
        onclick: function (d, i) {
          console.log("onclick", d, i);
        },
        onover: function (d, i) {
          console.log("onover", d, i);
        },
        onout: function (d, i) {
          console.log("onout", d, i);
        },
      },
      title: {
        text: 'Grafica Covid en España'
      },
      bindto: "#pieChart",
    });
  }

  loadGraph();
</script>

<main>
  <div id="pieChart" />

  <p style="text-align:center;">
    En la gráfica podemos observar el porcentaje de personas fallecidas con
    respecto al de casos confirmados, en este mes.
  </p>
  <p style="text-align:center;">Pais: España, Andalucia</p>
</main>
<style>
  main{
    margin: 4%;
  }
</style>