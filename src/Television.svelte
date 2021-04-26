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

  
    let televisionStats = [];

    /*async function loadInitialData() {
        console.log("Loading data...");
        const res = await fetch("api/v1/television-stats/loadInitialData").then(
        function (res) {
            if (res.ok) {
                console.log("OK");
                getGroupsTV();
                error = 0;
            } else if (res.status == 409) {
                error = 409;
                console.log("Conflict");
            } else {
                error = 404;
                console.log("Error");
            }
        }
        );
    }*/

    async function getGroupsTV() {
        console.log("Fetching data...");
        const res = await fetch("api/v1/television-stats/");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            televisionStats = json;
            console.log(`We have received ${televisionStats.length} groupsTV.`);
        } else {
            console.log("Error!");
        }
    }
    onMount(getGroupsTV);

</script>

<main>
	<table>
        <thead>
             <tr>
                <th>GroupTV</th>
                <th>country</th>
                <th>year</th>
                <th>cable/tv broadcast avg audience year</th>
                <th>avg-age</th>
                <th>avg audience month</th>
            </tr>
        </thead>
        <tbody>
            {#each televisionStats as stat}
            <tr>
                <td>{stat.groupTV}</td>
                <td>{stat.country}</td>
                <td>{stat.year}</td>
                <td>{stat.cable_tv_broadcast_avg_audience_year}</td>
                <td>{stat.avg_age}</td>
                <td>{stat.avg_audience_month}</td>
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