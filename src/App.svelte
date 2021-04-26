<script>
  
	
	import NotFound from "./NotFound.svelte";
	import Home from './Home.svelte'
	import Router from 'svelte-spa-router';
	import TelevisionApi from "./Television.svelte";
	import OnlineMediaAPI from "./OnlineMedia.svelte";
	
	const routes = {
		"/":Home,
		"/television-stats": TelevisionApi,
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>