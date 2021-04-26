<script>
  
	
	import NotFound from "./NotFound.svelte";
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router';
	import TelevisionApi from "./Television.svelte";
	
	import StreamingAPI from "./Streaming.svelte";
	
	const routes = {
		"/":Home,
		"/television-stats": TelevisionApi,

		"/streaming-stats": StreamingAPI,
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>