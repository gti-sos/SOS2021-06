<script>
    import {
        onMount
    } from "svelte";
    import {
      Nav,
      NavItem,
      NavLink,
      Table,
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
    //Functions

   async function loadInitialData() {
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
    }
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

    async function deleteData() {
      console.log("Deleting data...");
      const res = await fetch("api/v1/television-stats/", {
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
    getGroupsTV();
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
    {#if televisionStats.length === 0}
      <p>Se necesita  cargar los datos.</p>
    {:else}
      <Table borderer>
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
        </tbody><tbody />
      </Table>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 3em;
      padding-top: 1em;
      margin: 0 auto;
      
    }
    table {
      text-align: center;
      padding: 3em;
      padding-top: 1em;
      margin: 0 auto;
      
    }
  </style>