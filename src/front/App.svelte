<script>
  
	import NotFound from "./NotFound.svelte";
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router';
	import TelevisionApi from "./GUI Television/Television.svelte";
	import TelevisionEdit from "./GUI Television/TelevisionEdit.svelte";
	import TelevisionGraph from "./GUI Television/TelevisionGraph.svelte";
	import OnlineMediaApi from "./GUI OnlineMedia/OnlineMedia.svelte";
	import OnlineMediaGraph from "./GUI OnlineMedia/OnlineMediaGraph.svelte";
	import StreamingAPI from "./GUI Streaming/Streaming.svelte";
	import StreamEdit from "./GUI Streaming/StreamEdit.svelte";
	import StreamGraph from "./GUI Streaming/StreamGraph.svelte";
	import TeamGraph from "./TeamGraph.svelte";
	import InfoPage from "./infoPage.svelte";

	
	const routes = {
		"/":Home,
		"/television-stats": TelevisionApi,
		"/television-stats/:groupTV/:year":TelevisionEdit,
		"/television-stats/graph":TelevisionGraph,
		"/onlinemedia-stats": OnlineMediaApi,
		"/onlinemedia-stats/graph":OnlineMediaGraph,
		"/streaming-stats": StreamingAPI,
		"/streaming-stats/:streamPlatform/:streamYear":StreamEdit,
		"/streaming-stats/graph":StreamGraph,
		"/analytics":TeamGraph,
		"/info": InfoPage,
		'*': NotFound
		};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>