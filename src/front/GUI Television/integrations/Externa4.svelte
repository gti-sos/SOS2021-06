<script type="text/javascript">
    async function loadGraph() {

        var url = new URL ("https://gamerpower.p.rapidapi.com/api/giveaways");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1cfce798a7mshf98d29e01aed103p1ffca3jsna2fe39f7b06d",
	    "x-rapidapi-host": "gamerpower.p.rapidapi.com",
      },
    }); 
    
    let Dato = await res.json();
    var Datos= Dato.slice(0,10);
    console.log(Datos);
        let aux = ["x"];
        let aux_1 = ["Usuarios"];   
        Datos.forEach((f) =>{
          aux.push(f.title)
          aux_1.push(f.users)
        });

        console.log("aux",aux);
        console.log("aux1",aux_1);
        
        
        var chart = bb.generate({
  data: {
    x: "x",
    columns: [
	aux,
    aux_1
    ],
    type: "step", // for ESM specify as: bar()
  },
  axis: {
    x: {
      type: "category",
      tick: {
        rotate: 75,
        multiline: false,
        tooltip: true
      },
      height: 130
    }
  },
  bindto: "#stepChart_3"
});

    }
  
  loadGraph();
  </script>
  
  <svelte:head>
  
  </svelte:head>
  
  <main>
  
    <div id="#rotateXAxisTickText"></div>
    
    <p style="text-align:center;">
        Grafica de cantidad usuarios que juegan a distintos juegos
    </p>
  </main>