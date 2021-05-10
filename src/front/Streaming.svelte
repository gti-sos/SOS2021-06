<script>
    import {
        onMount
    } from "svelte";

    import {
      Nav,
      NavItem,
      NavLink,
      Table,
      Button
    } from "sveltestrap";

    let newStream = {
      platform: "",
      country: "",
      year:"",
      hour_viewed:"",
      avg_age:"",
      avg_audience:""
    }

    //Boton Cargar
    const BotonCargar = () => {
      loadInitialData();
    };

    //Boton borrar
    const BotonBorrar = () => {
      deleteData();
    };

    let element = 1;

    //API
    let streamingStats = [];
    //FUNCTIONS

    async function loadInitialData() {
        console.log("Loading data...");
        let error = 0;
        const res = await fetch("api/v1/streaming-stats/loadInitialData").then(
        function (res) {
            if (res.ok) {
                console.log("OK");
                getStreams();
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
    }

    async function getStreams() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/streaming-stats?limit=3&offset=0");
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

    async function insertStream(){
        console.log("Inserting stream "+ JSON.stringify(newStream));

        const res = await fetch("/api/v1/streaming-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newStream),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                               getStreams();
                           })
    }

    async function deleteStream(streamPlatform,streamYear){
        console.log("Deleting stream with platform "+ streamPlatform+" with year "+streamYear);

        const res = await fetch("/api/v1/streaming-stats/"+streamPlatform+"/"+streamYear,
                            {
                                method: "DELETE"
                            }
                           ).then( (res) => {
                               getStreams();
                           })
    }
    onMount(getStreams);

    async function deleteData() {
      console.log("Deleting data...");
      const res = await fetch("api/v1/streaming-stats/", {
        method: "DELETE",
      }).then(function (res) {
        if (res.ok) {
            console.log("OK");
            streamingStats = [];
            error = 0;
        } else if (res.status = 404) {
            error = 404;
            console.log("ERROR Data not found in database");
        } else {
            error = 1000;
            console.log("ERROR");
        }
      });
    }
    getStreams();

    async function nextPage(){
      if(element>streamingStats.length){
        element = 1;
      } else {
        element +=3;
      }

      const res = await fetch("/api/v1/streaming-stats?limit=3&offset="+(element-1));

      if(streamingStats.length==0){
        console.log("Error no datos");
      } else if (res.ok) {
        const json = await res.json();
        streamingStats = json;
      }
    }

    async function prevPage(){
      if(element-3>1){
        element -= 3;
      } else {
        element = 1;
      }

      const res = await fetch("/api/v1/streaming-stats?limit=3&offset="+(element-1));

      if(streamingStats.length==0){
        console.log("Error no datos");
      } else if (res.ok) {
        const json = await res.json();
        streamingStats = json;
      }
    }

</script>

<main>
    <Nav>
        <NavItem>
          <NavLink href="/" type="button" class="btn btn-primary btn-sm" style= "margin: 1em">Volver</NavLink>
        </NavItem>
        <NavItem id="Boton">
          <NavLink href="#" on:click={BotonCargar} id="Boton" type="button" class="btn btn-success btn-sm" style= "margin: 1em">
              Cargar datos iniciales</NavLink>
        </NavItem>
        <NavItem>
          {#if streamingStats.length ===0}
          <NavLink disabled href="#" on:click={BotonBorrar}  type="button" class="btn btn-danger btn-sm" style= "margin: 1em">
              Borrar todos los datos</NavLink>
          {:else}
          <NavLink href="#" on:click={BotonBorrar}  type="button" class="btn btn-danger btn-sm" style= "margin: 1em">
              Borrar todos los datos</NavLink>
         
          {/if}
        </NavItem>
    </Nav>


    {#if streamingStats.length === 0}
        <p>Se necesita  cargar los datos.</p>
    {:else}
    <Table borderer>
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
              <td><input bind:value="{newStream.platform}"></td>
              <td><input bind:value="{newStream.country}"></td>
              <td><input type="number" bind:value="{newStream.year}"></td>
              <td><input type="number" bind:value="{newStream.hour_viewed}"></td>
              <td><input type="number" bind:value="{newStream.avg_age}"></td>
              <td><input type="number" bind:value="{newStream.avg_audience}"></td>
              <td><Button on:click={insertStream}>Insertar</Button></td>
            </tr>
            {#each streamingStats as stat}
            <tr>
                <td><a href="#/streaming-stats/{stat.platform}/{stat.year}">{stat.platform}</a></td>
                <td>{stat.country}</td>
                <td>{stat.year}</td>
                <td>{stat.hour_viewed}</td>
                <td>{stat.avg_age}</td>
                <td>{stat.avg_audience}</td>
                <td><Button on:click={deleteStream(stat.platform,stat.year)}>Borrar</Button></td>
            </tr>
            {/each}
        </tbody><tbody />
      </Table>
      <Button on:click={prevPage}>Anterior</Button>
      <Button on:click={nextPage}>Siguiente</Button>
    {/if}
</main>

<style>
    main {
      text-align: center;
      padding: 3em;
      padding-top: 1em;
      margin: 0 auto;
      
    }
</style>