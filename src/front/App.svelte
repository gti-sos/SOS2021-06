<script>
  
	import NotFound from "./NotFound.svelte";
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router';
	import TelevisionApi from "./GUI Television/Television.svelte";
	import TelevisionEdit from "./GUI Television/TelevisionEdit.svelte";
	import OnlineMediaApi from "./OnlineMedia.svelte";
	import StreamingAPI from "./GUI Streaming/Streaming.svelte";
	import StreamEdit from "./GUI Streaming/StreamEdit.svelte";
	import StreamGraph from "./GUI Streaming/StreamGraph.svelte";
	import InfoPage from "./infoPage.svelte";

	
	const routes = {
		"/":Home,
		"/television-stats": TelevisionApi,
		"/onlinemedia-stats": OnlineMediaApi,
		"/streaming-stats": StreamingAPI,
		"/television-stats/:groupTV/:year":TelevisionEdit,
		"/streaming-stats/:streamPlatform/:streamYear":StreamEdit,
		"/streaming-stats/graph":StreamGraph,
		"/info": InfoPage,
		'*': NotFound
		};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>