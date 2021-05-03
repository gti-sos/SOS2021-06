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

    //Boton Cargar
    const BotonCargar = () => {
      loadInitialData();
    };

    //Boton borrar
    const BotonBorrar = () => {
      deleteData();
    };

    //API
    let televisionStats = [];
    let newGroupTV ={
            groupTV:"",
            country:"",
            year:"",
            cable_tv_broadcast_avg_audience_year:"",
            avg_age:"",
            avg_audience_month:""
    }

    const BASE_API_PATH = "/api/v1";
    
    //Functions

   async function loadInitialData() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_PATH+"/television-stats/loadInitialData").then(
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
    }
    async function getGroupsTV() {
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH+"/television-stats");
        if (res.ok) {
            console.log("Ok.");
            const json = await res.json();
            televisionStats = json;
            console.log(`We have received ${televisionStats.length} groupsTV.`);
        } else {
            console.log("Error!");
        }
    }
   

    async function deleteData() {
      console.log("Deleting data...");
      const res = await fetch(BASE_API_PATH+"/television-stats", {
        method: "DELETE",
      }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          televisionStats = [];
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

    async function insertGroupTV(){
        console.log("Inserting GroupTV "+ JSON.stringify(newGroupTV));

        const res = await fetch(BASE_API_PATH+"/television-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newGroupTV),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                               getGroupsTV();
                           })
    }
    async function deleteGroupTV(groupName,year){
        console.log("Deleting GroupTV with name "+ groupName);

        const res = await fetch(BASE_API_PATH+"/television-stats/"+groupName + "/" + year,
                            {
                                method: "DELETE"
                            }
                           ).then( (res) => {
                               getGroupsTV();
                           })
    }

    async function editGroupTV(groupName, year){
      console.log("Editing GroupTV with name "+ groupName);
            const res = await fetch(BASE_API_PATH+"/television-stats/"+groupName + "/" + year, {
                    method:"PUT",
                    body:JSON.stringify(newGroupTV),
                    headers:{
                        "Content-Type": "application/json"
                    }
                }).then(function (res) {
                    visible=true;
                    if (res.status == 200){
                        console.log("Data updated");
                        getGroupsTV();
                        color = "success";
                        checkMSG ="Entrada modificada correctamente en la base de datos";
                    }else if(res.status == 400){
                        console.log("ERROR Data was not correctly introduced");
                        color = "danger";
                        checkMSG= "Los datos de la entrada no fueron introducidos correctamente";
                    }else if(res.status == 409){
                        console.log("ERROR There is already a data with that province and year in the da tabase");
                        color = "danger";
                        checkMSG= "Ya existe una entrada en la base de datos con los datos introducidos";
                    }
                });	
            }
    onMount(getGroupsTV);
  </script>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/" type="button" class="btn btn-primary btn-sm" style= "margin: 1em">Volver</NavLink>
      </NavItem>
      <NavItem id="Boton">
        {#if televisionStats.length ===0}
        <NavLink  href="#" on:click={BotonCargar} id="Boton" type="button" class="btn btn-success btn-sm" style= "margin: 1em">
          Cargar datos iniciales</NavLink>
        {:else}
        <NavLink disabled href="#" on:click={BotonCargar} id="Boton" type="button" class="btn btn-success btn-sm" style= "margin: 1em">
            Cargar datos iniciales</NavLink>
        {/if}
      </NavItem>
      <NavItem>
        {#if televisionStats.length ===0}
        <NavLink disabled href="#" on:click={BotonBorrar}  type="button" class="btn btn-danger btn-sm" style= "margin: 1em">
            Borrar todos los datos</NavLink>
        {:else}
        <NavLink href="#" on:click={BotonBorrar}  type="button" class="btn btn-danger btn-sm" style= "margin: 1em">
            Borrar todos los datos</NavLink>
       
        {/if}
      </NavItem>
    </Nav>

  <!-- Table -->
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
              <td><input type = "text" bind:value="{newGroupTV.groupTV}"></td>
              <td><input type = "text" bind:value="{newGroupTV.country}"></td>
              <td><input type="number" bind:value={newGroupTV.year}></td>
              <td><input type="number" bind:value={newGroupTV.cable_tv_broadcast_avg_audience_year}></td>
              <td><input type="number" bind:value={newGroupTV.avg_age}></td>
              <td><input type="number" bind:value={newGroupTV.avg_audience_month}></td>
              <td><Button outline color="primary" on:click={insertGroupTV}>Insertar</Button></td>     
          </tr>
          {#each televisionStats as stat}
              <tr>
                  <td><a href="#/television-stats/{stat.groupTV}">{stat.groupTV}</a></td>
                  <td>{stat.country}</td>
                  <td>{stat.year}</td>
                  <td>{stat.cable_tv_broadcast_avg_audience_year}</td>
                  <td>{stat.avg_age}</td>
                  <td>{stat.avg_audience_month}</td>
                  <td><Button outline color="danger" on:click={deleteGroupTV(stat.groupTV,stat.year)}>Borrar</Button></td>
                  <td><Button outline color="info" on:click="{editGroupTV(stat.groupTV, stat.year)}">Editar</Button></td>
              </tr>
          {/each}
      </tbody>
  </Table>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 3em;
      padding-top: 1em;
      margin: 0 auto;
    }
  </style>