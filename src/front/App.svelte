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
	import OnlineMediaApi from "./GUI OnlineMedia/OnlineMedia.svelte";
	import OnlineMediaGraph from "./GUI OnlineMedia/OnlineMediaGraph.svelte";
	import OnlineMediaGraphObesity from "./GUI OnlineMedia/OnlineMediaGraphObesity.svelte";
	import StreamingAPI from "./GUI Streaming/Streaming.svelte";
	import StreamEdit from "./GUI Streaming/StreamEdit.svelte";
	import StreamGraph from "./GUI Streaming/StreamGraph.svelte";
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
		"/onlinemedia-stats": OnlineMediaApi,
		"/onlinemedia-stats/graph":OnlineMediaGraph,
		"/onlinemedia-stats/graphObesity":OnlineMediaGraphObesity,
		"/streaming-stats": StreamingAPI,
		"/streaming-stats/:streamPlatform/:streamYear":StreamEdit,
		"/streaming-stats/graph":StreamGraph,
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