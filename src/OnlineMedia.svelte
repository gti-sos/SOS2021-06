<script>
    import {
        onMount
    } from "svelte";

   // import Table from "sveltestrap/src/Table.svelte";

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
 
    let onlinemediaStats = [];

    async function getOnlineMedia(){
        console.log("Fetching contacts...");
        const res = await fetch("/api/v1/onlinemedia-stats/");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            onlinemediaStats = json;
            console.log(`We have received ${onlinemediaStats.length} OnlineMedia.`);
        }else{
            console.log("Error!");
        }
    }   
    
    onMount(getOnlineMedia);
</script>

<main>
	<table>
        <thead>
             <tr>
                <th>online_media</th>
                <th>country</th>
                <th>year</th>
                <th>account_price_per_month</th>
                <th>mark</th>
                <th>audience</th>
            </tr>
        </thead>
        <tbody>
            {#each onlinemediaStats as stat}
            <tr>
                <td>{stat.online_media}</td>
                <td>{stat.country}</td>
                <td>{stat.year}</td>
                <td>{stat.account_price_per_month}</td>
                <td>{stat.mark}</td>
                <td>{stat.audience}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>
