<script>
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import { onMount } from 'svelte';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    
    // Always set FusionCharts as the first parameter
    fcRoot(FusionCharts, Charts, FusionTheme);
    let cartas = [];
    async function getStats(){
      var url = new URL(
          "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/qualities/legendary"
      );
      var parametros = { quality: "legendary" };
      url.search = new URLSearchParams(parametros).toString();
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "b95f3dd7f4mshd37d0dead37000ap1b3771jsn4839541239d8",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
            "useQueryString": true
        },
      });
  
      let Datos = await res.json();
  
      console.log(Datos);
      let legendariasNorm = 0;
      let legendariasHunt= 0;
      let legendariasDruid= 0;
      let legendariasPalad= 0;
      let legendariasMage= 0;
      let legendariasDem= 0;
      let legendariasPriest= 0;
      let legendariasRogue= 0;
      let legendariasShaman= 0;
      let legendariasWarlock= 0;
      let legendariasWarrior= 0;
      for(var i=0;i<Datos.length;i++){
        if(Datos[i].playerClass=="Neutral"){
          legendariasNorm += 1;
        } else if(Datos[i].playerClass=="Hunter"){
          legendariasHunt += 1;
        } else if(Datos[i].playerClass=="Druid"){
          legendariasDruid += 1;
        } else if(Datos[i].playerClass=="Paladin"){
          legendariasPalad += 1;
        } else if(Datos[i].playerClass=="Mage"){
          legendariasMage += 1;
        } else if(Datos[i].playerClass=="Demon Hunter"){
          legendariasDem += 1;
        } else if(Datos[i].playerClass=="Priest"){
          legendariasPriest += 1;
        } else if(Datos[i].playerClass=="Rogue"){
          legendariasRogue += 1;
        } else if(Datos[i].playerClass=="Shaman"){
          legendariasShaman += 1;
        } else if(Datos[i].playerClass=="Warlock"){
          legendariasWarlock += 1;
        } else if(Datos[i].playerClass=="Warrior"){
          legendariasWarrior += 1;
        } 
      }
      cartas.push({label:"Neutral",value:""+legendariasNorm})
      cartas.push({label:"Hunter",value:""+legendariasHunt})
      cartas.push({label:"Druid",value:""+legendariasDruid})
      cartas.push({label:"Paladin",value:""+legendariasPalad})
      cartas.push({label:"Mage",value:""+legendariasMage})
      cartas.push({label:"Demon King",value:""+legendariasDem})
      cartas.push({label:"Priest",value:""+legendariasPriest})
      cartas.push({label:"Rogue",value:""+legendariasRogue})
      cartas.push({label:"Shaman",value:""+legendariasShaman})
      cartas.push({label:"Warlock",value:""+legendariasWarlock})
      cartas.push({label:"Warrior",value:""+legendariasWarrior})
  
      console.log(cartas)
      loadGraph()
    }
  
    var chartConfigs = {};
    onMount(getStats)
  
    async function loadGraph(){
      const dataSource = {
      "chart": {
        "caption": "Nº Cartas legendarias de hearthstone por clase",
        "subcaption": "",
        "pyaxisname": "No. de cartas",
        "theme": "fusion",
        "showsecondarylimits": "0",
        "showdivlinesecondaryvalue": "0",
        "plottooltext": "$label, tiene : <b>$dataValue</b> cartas legensarias del total: <b>$sum</b>",
        "drawcrossline": "1"
      },
      "data": cartas
    };
    
    chartConfigs = {
       type: 'pareto2d',
       width: 800,
       height: 400,
       dataFormat: 'json',
       dataSource
    };
    }
   
    </script>
    
    <SvelteFC {...chartConfigs} />
      <main>
  
      </main>
      <style>
  
      </style>