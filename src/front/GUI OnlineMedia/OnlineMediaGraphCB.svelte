<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<script>

let datos = [];
let array = [];
let gDistrict = [];
let gYear = [];
let gFundraising = [];
let gSpectator = [];
let gSPV = [];

async function loadGraph(){
    let MyData = [];
    let MyDataEmp = [];
      
        let MyDataArray = [];
        let MyDataArray1 = [];
        let MyDataArray2 = [];
    
    const resData = await fetch("https://sos2021-26.herokuapp.com/api/v2/culturaBASE");
    MyData = await resData.json();

    if(MyData.length == 0){
            console.log("Array vacío");
        
        }else{
            MyData.forEach( (e) => {
                MyDataArray.push({name: e.district + " " + e.year, value: e.fundraising});
                MyDataArray1.push({name: e.district + " " + e.year, value: e.spectator});
                MyDataArray2.push({name: e.district + " " + e.year, value: e.spending_per_view});
        
            });
            MyDataEmp.push({name: 'Recaudación total (contada por millones)', data: MyDataArray});
            MyDataEmp.push({name: 'Espectadores (contados por millones)', data: MyDataArray1});  
            MyDataEmp.push({name: 'Gasto por espectador', data: MyDataArray2});  
        }

    Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Datos cinematográficos en España'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name} :</b> {point.value}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '60%',
            maxSize: '160%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: MyDataEmp
        });
  }

</script>

<main>
    
    <figure class="highcharts-figure">
    <p class="highcharts-description"></p>
    <div id="container"></div>
    
    </figure> 
</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>