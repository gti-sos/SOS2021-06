<script>
    import {
        onMount
    } from "svelte";

   // import Table from "sveltestrap/src/Table.svelte";

    import {
    Nav,
    NavItem,
    NavLink,
    Button,
    Table
    
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
    let onlinemediaStats = [];
    let newOnlineMedia ={
        online_media: "",
        country: "",
        year: "",
        account_price_per_month: "",
        mark: "",
        audience: "",

    }

    const BASE_CONTACT_API_PATH = "/api/v1";

    //Funciones
    async function loadInitialData() {
        console.log("Loading data...");
        const res = await fetch(BASE_CONTACT_API_PATH+"/onlinemedia-stats/loadInitialData").then(
        function (res) {
            if (res.ok) {
                console.log("OK");
                getOnlineMedia();
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
    async function getOnlineMedia(){
        console.log("Fetching contacts...");
        const res = await fetch(BASE_CONTACT_API_PATH+"/onlinemedia-stats/");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            onlinemediaStats = json;
            console.log(`We have received ${onlinemediaStats.length} OnlineMedia.`);
        }else{
            console.log("Error!");
        }
    } 
    
    async function deleteData() {
      console.log("Deleting data...");
      const res = await fetch(BASE_CONTACT_API_PATH+"/onlinemedia-stats", {
        method: "DELETE",
      }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          onlinemediaStats = [];
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

    async function insertOnlineMedia(){
        console.log("Inserting OnlineMedia "+ JSON.stringify(newOnlineMedia));

        const res = await fetch(BASE_CONTACT_API_PATH+"/onlinemedia-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newOnlineMedia),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                               getOnlineMedia();
                           })
    }
    async function deleteOnlineMedia(groupName,year){
        console.log("Deleting OnlineMedia with name "+ groupName);

        const res = await fetch(BASE_CONTACT_API_PATH+"/onlinemedia-stats/"+groupName+"/"+year,
                            {
                                method: "DELETE"
                            }
                           ).then(function(res){
                            visible=true;
                            if (res.status==200) {
                                getOnlineMedia();
                                console.log("Data Base deteled");
                                color = "success";
                                alertBox = "La OnlineMedia (" +groupName+") ha sido eliminado correctamente"
                            } else if ((res.status = 404)) {
                                console.log("ERROR Data not found in database");
                                color = "danger";
                                alertBox = "No existen datos para borrar"
                            } else {
                                console.log("ERROR");
                                color = "danger";
                                alertBox = "No se ha podido borrar los datos"
                            }
                            });
                        }

    async function updateOnlineMedia(groupName, year){
      console.log("Editing OnlineMedia with name "+ groupName);
            const res = await fetch(BASE_CONTACT_API_PATH+"/onlinemedia-stats/"+groupName + "/" + year, {
                    method:"PUT",
                    body:JSON.stringify(newOnlineMedia),
                    headers:{
                        "Content-Type": "application/json"
                    }
                }).then(function (res) {
                    
                    if (res.status == 200){
                        console.log("Data updated");
                        getOnlineMedia();
                        
                    }else if(res.status == 400){
                        console.log("ERROR Data was not correctly introduced");
                        
                    }else if(res.status == 409){
                        console.log("ERROR There is already a data with that province and year in the da tabase");
                        
                    }
                });	
            }
    
    onMount(getOnlineMedia);
</script>

<main>
    <Nav>
        <NavItem>
          <NavLink href="/" type="button" class="btn btn-primary btn-sm" style= "margin: 1em">Volver</NavLink>
        </NavItem>
        <NavItem id="Boton">
          {#if onlinemediaStats.length ===0}
          <NavLink  href="#" on:click={BotonCargar} id="Boton" type="button" class="btn btn-success btn-sm" style= "margin: 1em">
            Cargar datos iniciales</NavLink>
          {:else}
          <NavLink disabled href="#" on:click={BotonCargar} id="Boton" type="button" class="btn btn-success btn-sm" style= "margin: 1em">
              Cargar datos iniciales</NavLink>
          {/if}
        </NavItem>
        <NavItem>
          {#if onlinemediaStats.length ===0}
          <NavLink disabled href="#" on:click={BotonBorrar}  type="button" class="btn btn-danger btn-sm" style= "margin: 1em">
              Borrar todos los datos</NavLink>
          {:else}
          <NavLink href="#" on:click={BotonBorrar}  type="button" class="btn btn-danger btn-sm" style= "margin: 1em">
              Borrar todos los datos</NavLink>
         
          {/if}
        </NavItem>
      </Nav>
	<table>
        <thead>
             <tr>
                <th>Plataforma</th>
                <th>País</th>
                <th>Año</th>
                <th>Precio mensual(€)</th>
                <th>Nota en Google Play Store España</th>
                <th>Audiencia</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="text" bind:value="{newOnlineMedia.online_media}"></td>
                <td><input type="text" bind:value="{newOnlineMedia.country}"></td>
                <td><input type="number" bind:value={newOnlineMedia.year}></td>
                <td><input type="number" bind:value={newOnlineMedia.account_price_per_month}></td>
                <td><input type="number" bind:value={newOnlineMedia.mark}></td>
                <td><input type="number" bind:value={newOnlineMedia.audience}></td>
                <td><Button on:click={insertOnlineMedia}>Insert</Button></td>
            </tr>
            {#each onlinemediaStats as stat}
            <tr>
                <td><a href="#/onlinemedia-stats/{stat.online_media}">{stat.online_media}</a></td>
                <td>{stat.country}</td>
                <td>{stat.year}</td>
                <td>{stat.account_price_per_month}</td>
                <td>{stat.mark}</td>
                <td>{stat.audience}</td>
                <td><Button on:click={deleteOnlineMedia(stat.online_media,stat.year)}>Delete</Button></td>
                <td><Button on:click={updateOnlineMedia(stat.online_media,stat.year)}>Update</Button></td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>

<style>
    main {
      text-align: center;
      padding: 3em;
      padding-top: 1em;
      margin: 0 auto;
    }
  </style>
