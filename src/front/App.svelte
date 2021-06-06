<script>
  
	import NotFound from "./NotFound.svelte";
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router';
	import TelevisionApi from "./GUI Television/Television.svelte";
	import TelevisionEdit from "./GUI Television/TelevisionEdit.svelte";
	import TelevisionGraph from "./GUI Television/TelevisionGraph.svelte";
	import TelevisionHighChart from "./GUI Television/TelevisionHighChart.svelte";
	import TelevisionVis from "./GUI Television/TelevisionVis.svelte";
	import IntegrationGraph3 from "./GUI Television/integrations/IntegrationGraph3.svelte";
	import IntegrationGraph4 from "./GUI Television/integrations/IntegrationGraph4.svelte";
	import Externa1 from "./GUI Television/integrations/Externa1.svelte";
	import Externa2 from "./GUI Television/integrations/Externa2.svelte";
	import Externa4 from "./GUI Television/integrations/Externa4.svelte";
	import Externa3 from "./GUI Television/integrations/Externa3.svelte";
	import OnlineMediaApi from "./GUI OnlineMedia/OnlineMedia.svelte";
	import OnlineMediaGraph from "./GUI OnlineMedia/OnlineMediaGraph.svelte";
	import OnlineMediaGraphObesity from "./GUI OnlineMedia/OnlineMediaGraphObesity.svelte";
	import OnlineMediaGraphCB from "./GUI OnlineMedia/OnlineMediaGraphCB.svelte";
	import OnlineMediaCanvas from "./GUI OnlineMedia/OnlineMediaCanvas.svelte";
	import OnlineMediaRGraph from "./GUI OnlineMedia/OnlineMediaGraphRgraph.svelte";
	import OnlineMediaExt1 from "./GUI OnlineMedia/Externa1.svelte";
	import OnlineMediaExt2 from "./GUI OnlineMedia/Externa2.svelte";
	import OnlineMediaExt3 from "./GUI OnlineMedia/Externa3.svelte";
	import StreamingAPI from "./GUI Streaming/Streaming.svelte";
	import StreamEdit from "./GUI Streaming/StreamEdit.svelte";
	import StreamGraph from "./GUI Streaming/StreamGraphBar.svelte";
	import StreamGraphFusion from "./GUI Streaming/StreamGraphFusion.svelte";
	import IntegrationPerf from "./GUI Streaming/IntegrationGraphPerformances.svelte";
	import IntegrationGames from "./GUI Streaming/IntegrationGraphGames.svelte";
	import TeamGraph from "./TeamGraph.svelte";
	import InfoPage from "./infoPage.svelte";
	import Integrations from "./Integrations.svelte";









	
	const routes = {
		"/":Home,
		"/television-stats": TelevisionApi,
		"/television-stats/:groupTV/:year":TelevisionEdit,
		"/television-stats/graph":TelevisionGraph,
		"/television-stats/graph3":IntegrationGraph3,
		"/television-stats/graph4":IntegrationGraph4,
		"/television-stats/graph1":TelevisionHighChart,
		"/television-stats/graph2":TelevisionVis,
		"/television-stats/graph5":Externa1,
		"/television-stats/graph6":Externa2,
		"/television-stats/graph7":Externa3,
		"/television-stats/graph8":Externa4,
		"/onlinemedia-stats": OnlineMediaApi,
		"/onlinemedia-stats/graph":OnlineMediaGraph,
		"/onlinemedia-stats/graphObesity":OnlineMediaGraphObesity,
		"/onlinemedia-stats/graphCB":OnlineMediaGraphCB,
		"/onlinemedia-stats/canvas":OnlineMediaCanvas,
		"/onlinemedia-stats/rgraph":OnlineMediaRGraph,
		"/onlinemedia-stats/ext1":OnlineMediaExt1,
		"/onlinemedia-stats/ext2":OnlineMediaExt2,
		"/onlinemedia-stats/ext3":OnlineMediaExt3,
		"/streaming-stats": StreamingAPI,
		"/streaming-stats/:streamPlatform/:streamYear":StreamEdit,
		"/streaming-stats/graph":StreamGraph,
		"/streaming-stats/graphfusion":StreamGraphFusion,
		"/streaming-stats/integrationPerf":IntegrationPerf,
		"/streaming-stats/integrationGames":IntegrationGames,
		"/analytics":TeamGraph,
		"/info": InfoPage,
		"/integrations": Integrations,
		'*': NotFound
		};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>