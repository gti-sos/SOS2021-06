<script type="text/javascript">
    async function loadGraph() {

        var url = new URL("https://burger-items.p.rapidapi.com/burgers");

    var parametros = {
        type: "optp",

    };
    url.search = new URLSearchParams(parametros).toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1cfce798a7mshf98d29e01aed103p1ffca3jsna2fe39f7b06d",
	    "x-rapidapi-host": "burger-items.p.rapidapi.com",
      },
    }); 

    let Datos = await res.json();
    console.log(Datos);
        let aux= [];
        let aux_1 = [];
        let aux_2 = [];
        let aux_3 = [];   
        let aux_4 = [];   
        let aux_5 = [];   
        let aux_6 = [];     
        let aux_7 = [];      
       
        
          aux.push(Datos.buns);
          aux_1.push(Datos.tomato);
          aux_2.push(Datos.onion);
          aux_3.push(Datos.lettuce);
          aux_4.push(Datos.cheese);
          aux_5.push(Datos.bacon);
          aux_6.push(Datos.chicken);
          aux_7.push(Datos.beef);
       
             
        console.log("casos confirmados",aux);
        console.log("fallecimientos", aux_1);
        console.log("casos confirmados",aux_2);
        console.log("fallecimientos", aux_3);
        console.log("casos confirmados",aux_4);
        console.log("fallecimientos", aux_5);
        console.log("casos confirmados",aux_6);
        console.log("fallecimientos", aux_7);
        
        var chart = bb.generate({
  data: {
    columns: [
	["Pan", aux],
	["Tomate", aux_1],
    ["Cebolla", aux_2],
    ["Lechuga", aux_3],
    ["Queso", aux_4],
    ["bacon", aux_5],
    ["Pollo", aux_6],
    ["carne", aux_7] 
    ],
    type: "donut", // for ESM specify as: donut()
    onclick: function(d, i) {
	console.log("onclick", d, i);
   },
    onover: function(d, i) {
	console.log("onover", d, i);
   },
    onout: function(d, i) {
	console.log("onout", d, i);
   }
  },
  donut: {
    title: "Hamburguesa"
  },
  bindto: "#donutChart"
});


    }
  
  loadGraph();
  </script>
  
  <svelte:head>
  
  </svelte:head>
  
  <main>
  
    <div id="radarChart"></div>
    
    <p style="text-align:center;">
       Grafica basada en los porcentajes de ingredientes que componen una hamburguesa
    </p>
  </main>