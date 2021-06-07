<script>
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import { onMount } from 'svelte';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    
    // Always set FusionCharts as the first parameter
    fcRoot(FusionCharts, Charts, FusionTheme);
    let labels = [];
    let values = [];
    let poblaciones = [];
    async function getStats(){
      var url = new URL(
          "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all"
      );

      const res = await fetch(url, {
        method: "GET",
        headers: {
            "x-rapidapi-key": "b95f3dd7f4mshd37d0dead37000ap1b3771jsn4839541239d8",
	        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
	        "useQueryString": true
        },
      });
      
      let Datos = await res.json();
      //console.log(Datos);
      
      let i = 0;
      for(i=0;i<Datos.length;i++){
          poblaciones.push([Datos[i].name,Datos[i].population])
      }
      poblaciones.sort((a,b) => a[1] - b[1]);
      let top20 =poblaciones.slice(poblaciones.length-20,)
      //console.log(top15[0])
      top20.reverse();
      for (var x of top20){
        labels.push({label:""+x[0]});
        values.push({value:""+x[1]});
      }
      console.log(labels);
      console.log(values);
        loadGraph()
    }
    onMount(getStats);

    var chartConfigs = {};
    async function loadGraph(){
        const dataSource = {
      "chart": {
        "caption": "Top 20 Paises en el Mundo por Poblacion",
        "subcaption": "",
        "plottooltext": "Poblacion Total: $dataValue",
        "yaxisname": "Poblacion",
        "xaxisname": "Paises",
        "theme": "fusion"
      },
      "categories": [
        {
          "category": labels
        }
      ],
      "dataset": [
    {
      "data": values
    }
  ]
     
    };
    
     chartConfigs = {
       type: 'scrollbar2d',
       width: 600,
       height: 400,
       dataFormat: 'json',
       dataSource
    };
    }
        
    
    
    </script>
    
    <SvelteFC {...chartConfigs} />