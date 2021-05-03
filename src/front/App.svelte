<script>
  
	import NotFound from "./NotFound.svelte";
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router';
	import TelevisionApi from "./Television.svelte";
	import OnlineMediaApi from "./OnlineMedia.svelte";
	import StreamingAPI from "./Streaming.svelte";
	import InfoPage from "./infoPage.svelte";
	
	const routes = {
		"/":Home,
		"/television-stats": TelevisionApi,
		"/onlinemedia-stats": OnlineMediaApi,
		"/streaming-stats": StreamingAPI,
		"/info": InfoPage,
		'*': NotFound
		};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>