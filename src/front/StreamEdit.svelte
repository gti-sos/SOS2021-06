<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_API_PATH = "/api/v1";
    export let params = {};
    let stat = {};
    let updatePlatform = "XXXX";
    let updateCountry = "XXXX";
    let updateYear = 0;
    let updateHours = 0;
    let updateAge = 0;
    let updateAudience = 0;
    let errorMsg = "";
    let okMsg = "";
    
    async function getStat() {
      console.log("Fetching stat..." + params.streamPlatform + " " + params.streamYear);
      const res = await fetch(
        BASE_API_PATH +"/streaming-stats/" + params.streamPlatform +"/" + params.streamYear
      );
  
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        stat = json;
        updatePlatform = stat.platform;
        updateCountry = stat["country"];
        updateYear = stat.year;
        updateHours = stat["hour_viewed"];
        updateAge = stat["avg_age"];
        updateAudience = stat["avg_audience"];

       
        console.log("Received stat.");
        
      } else {
        if(res.status===404){
          errorMsg = "No se encuentra el dato solicitado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }        
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    }
  
    async function updateStat() {
      console.log(
        "Updating stat..." +
          JSON.stringify(params.streamPlatform) +
          JSON.stringify(params.streamYear)
      );
  
      const res = await fetch(
        BASE_API_PATH +
          "/streaming-stats/" +
          params.streamPlatform +
          "/" +
          params.streamYear,
        {
          method: "PUT",
          body: JSON.stringify({
            "platform": params.streamPlatform,
            "country": updateCountry,
            "year": parseInt(params.streamYear),
            "hour_viewed": parseInt(updateHours),
            "avg_age": parseInt(updateAge),
            "avg_audience": parseInt(updateAudience),
            
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getStat();
          errorMsg = "";
          okMsg = "Operación realizada correctamente";
        } else {
          if(res.status===409){
          errorMsg = "El dato ya se encuentra cargado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se ha encontrado el dato solicitado";
        }
          okMsg = "";
          getStat();
          console.log("ERROR!" + errorMsg);
        }
      });
    }
  
    onMount(getStat);
  </script>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="#/streaming-stats">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <h2>
      Editar campo <strong>{params.streamPlatform}</strong>
      <strong>{params.streamYear}</strong>
    </h2>
    <Table bordered>
      <thead>
        <tr>
          <th>Plataforma</th>
          <th>Pais</th>
          <th>Año</th>
          <th>Horas vistas</th>
          <th>Edad media</th>
          <th>Audiencia media</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updatePlatform}</td>
          <td><input type="text" bind:value={updateCountry} /></td>
          <td>{updateYear}</td>
          <td><input type="number" bind:value={updateHours} /></td>
          <td><input type="number" bind:value={updateAge} /></td>
          <td><input type="number" bind:value={updateAudience} /></td>

          <td>
            <Button outline color="primary" on:click={updateStat}>Actualizar</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    {#if errorMsg}
      <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
    <p style="color: green">{okMsg}</p>
    {/if}
  
  </main>
  
  <style>
    main{
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
  </style>
