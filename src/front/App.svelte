<script>
  
	import NotFound from "./NotFound.svelte";
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router';
	import TelevisionApi from "./GUI Television/Television.svelte";
	import TelevisionEdit from "./GUI Television/TelevisionEdit.svelte";
	import OnlineMediaApi from "./OnlineMedia.svelte";
	import StreamingAPI from "./Streaming.svelte";
	import StreamEdit from "./StreamEdit.svelte";
	import InfoPage from "./infoPage.svelte";

	
	const routes = {
		"/":Home,
		"/television-stats": TelevisionApi,
		"/onlinemedia-stats": OnlineMediaApi,
		"/streaming-stats": StreamingAPI,
		"/television-stats/:groupTV/:year":TelevisionEdit,
		"/streaming-stats/:streamPlatform/:streamYear":StreamEdit,
		"/info": InfoPage,
		'*': NotFound
		};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>