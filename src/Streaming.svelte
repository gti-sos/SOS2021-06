<script>
    import {
        onMount
    } from "svelte";

    import {
    Nav,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    NavItem,
    NavLink,
    Button,
    Table,
    UncontrolledAlert ,
  } from "sveltestrap";

  
    let streamingStats = [];

    async function getStreams() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/streaming-stats/");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            streamingStats = json;
            console.log(`We have received ${streamingStats.length} streaming platforms.`);
        } else {
            console.log("Error!");
        }
    }
    onMount(getStreams);

</script>

<main>
	<table>
        <thead>
             <tr>
                <th>platform</th>
                <th>country</th>
                <th>year</th>
                <th>hour_viewed</th>
                <th>avg_age</th>
                <th>avg_audience</th>
            </tr>
        </thead>
        <tbody>
            {#each streamingStats as stat}
            <tr>
                <td>{stat.platform}</td>
                <td>{stat.country}</td>
                <td>{stat.year}</td>
                <td>{stat.hour_viewed}</td>
                <td>{stat.avg_age}</td>
                <td>{stat.avg_audience}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>

<style>
	table{
        border: 1px solid black;
    }
</style>