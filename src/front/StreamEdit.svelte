<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import {
      Table,
      Button
    } from "sveltestrap";

    export let params = {};
    let stream = {};
    let updatedPlatform = params.streamPlatform;
    let updatedCountry = "";
    let updatedYear = params.streamYear;
    let updatedHours = "";
    let updatedAge = "";
    let updatedAudience = "";
    let errorMsg = "";

    onMount(getStream());

    async function getStream() {

        console.log("Fetching stream...");
        const res = await fetch("/api/v1/streaming-stats/"+params.streamPlatform+"/"+params.streamYear);
        console.log(res);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            stream = json;
            updatedPlatform = stream.platform;
            updatedCountry = stream.country;
            updatedYear = stream.year;
            updatedHours = stream.hour_viewed;
            updatedAge = stream.avg_age;
            updatedAudience = stream.avg_audience;
            console.log("Received stream");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }

    async function updateStream() {

        console.log("Updating stream..." + JSON.stringify(params.streamPlatform));

        const res = await fetch("/api/v1/streaming-stats/"+params.streamPlatform+"/"+params.streamYear, {
            method: "PUT",
            body: JSON.stringify({
                platform: updatedPlatform,
                country: updatedCountry,
                year: updatedYear,
                hour_viewed: updatedHours,
                avg_age: updatedAge,
                avg_audience: updatedAudience
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getStream();
        });
    }
</script>

<main>
    <h3>Edit Stream <strong>{params.streamPlatform}</strong></h3>
        <Table bordered>
            <thead>
                <tr>
                    <th>plataforma</th>
                    <th>pais</th>
                    <th>año</th>
                    <th>horas vistas</th>
                    <th>edad media</th>
                    <th>audiencia media</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedPlatform}</td>
                    <td><input bind:value="{updatedCountry}"></td>
                    <td>{updatedYear}</td>
                    <td><input type="number" bind:value="{updatedHours}"></td>
                    <td><input type="number" bind:value="{updatedAge}"></td>
                    <td><input type="number" bind:value="{updatedAudience}"></td>
                    <td> <Button outline color="primary" on:click={updateStream}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click={pop}>Volver</Button>
</main>