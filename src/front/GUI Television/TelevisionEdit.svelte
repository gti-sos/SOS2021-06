<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_API_PATH = "/api/v2";
    export let params = {};

    let stat = {};
    let updateGroupTV = "XXXX";
    let updateCountry = "XXXX";
    let updateYear = 0;
    let updateCable_tv_broadcast_avg_audience_year = 0;
    let updateAvg_age = 0;
    let updateAvg_audience_month = 0;
    let errorMsg = "";
    let okMsg = "";
    
    async function getStat() {
      console.log("Fetching stat..." + params.groupTV + " " + params.year);
      const res = await fetch(
        BASE_API_PATH +"/television-stats/" + params.groupTV +"/" + params.year
      );
  
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        stat = json;
        updateGroupTV = stat.groupTV;
        updateCountry = stat["country"];
        updateYear = stat.year;
        updateCable_tv_broadcast_avg_audience_year = stat["cable_tv_broadcast_avg_audience_year"];
        updateAvg_age = stat["avg_age"];
        updateAvg_audience_month = stat["avg_audience_month"];

       
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
          JSON.stringify(params.groupTV) +
          JSON.stringify(params.year)
      );
  
      const res = await fetch(
        BASE_API_PATH +
          "/television-stats/" + params.groupTV + "/" + params.year,
        {
          method: "PUT",
          body: JSON.stringify({
            "groupTV": params.groupTV,
            "country": updateCountry,
            "year": parseInt(params.year),
            "cable_tv_broadcast_avg_audience_year": parseInt(updateCable_tv_broadcast_avg_audience_year),
            "avg_age": parseInt(updateAvg_age),
            "avg_audience_month": parseInt(updateAvg_audience_month),
            
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
        <NavLink 
        type="button"
        class="btn btn-primary btn-sm"
        href="#/television-stats">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <h2>
      Editar GrupoTV <strong>{params.groupTV}</strong> del año
      <strong>{params.year}</strong>
    </h2><br>
    <Table bordered>
      <thead>
        <tr>
          <th>GrupoTV</th>
          <th>Pais</th>
          <th>Año</th>
          <th>Cable/tv broadcast media audiencia/año</th>
          <th>Media edad</th>
          <th>Media audiencia/mes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updateGroupTV}</td>
          <td><input type="text" bind:value={updateCountry} /></td>
          <td>{updateYear}</td>
          <td><input type="number" bind:value={updateCable_tv_broadcast_avg_audience_year} /></td>
          <td><input type="number" bind:value={updateAvg_age} /></td>
          <td><input type="number" bind:value={updateAvg_audience_month} /></td>

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
    padding: 3em;
    padding-top: 1em;
    margin: 0 auto;
    }
  </style>
