<script>
import { onMount } from "svelte";
import { is_empty } from "svelte/internal";
import { Nav, NavItem, NavLink, Table, Button, Alert,  Pagination, PaginationItem,
    PaginationLink,} from "sveltestrap";


  const BASE_API_PATH = "/api/v2";

  //Variables Alertas
  let visible = false;
  let color = "";
  let alertBox = "";

  function offAlert () {
    visible = false;
  }

  //Boton Cargar
  const BotonCargar = () => {
    loadInitialData();
  };

  //Boton borrar
  const BotonBorrar = () => {
    deleteData();
  };


  //Variables paginacion
  let limit = 10;
  let offset = 0;
	let currentPage = 1; 
	let moreData = true; 


  function upOffset (numPag) {
		offset += numPag;
		currentPage += numPag;
		getGroupsTV();
	}

  function downOffset () {
		offset = 0;
		currentPage = 1;
		getGroupsTV();
	}
  
  function deleteInputs() {
    let reset= {
    groupTV: "",
    country: "",
    year: "",
    cable_tv_broadcast_avg_audience_year: "",
    avg_age: "",
    avg_audience_month: "",
  };
  newGroupTV=reset;
  }

  //API
  let televisionStats = [];
  let newGroupTV = {
    groupTV: "",
    country: "",
    year: "",
    cable_tv_broadcast_avg_audience_year: "",
    avg_age: "",
    avg_audience_month: "",
  };

  onMount(getGroupsTV);


  //Functions

  async function SearchGroupsTV() {
		let url = BASE_API_PATH+"/television-stats?"
    
		console.log("Searching GroupTVs...");

		let searchTV= {
			groupTV: newGroupTV.groupTV,
			country: newGroupTV.country,
			year: parseInt(newGroupTV.year),
			cable_tv_broadcast_avg_audience_year: parseInt(newGroupTV.cable_tv_broadcast_avg_audience_year),
			avg_age: parseInt(newGroupTV.avg_age),
			avg_audience_month: parseInt(newGroupTV.avg_audience_month),
		};
    
    
      Object.entries(searchTV).forEach(([x,y]) => {
      if(isNaN(y) && !is_empty(y)){
				url = url + "&" + x + "=" + y;
      };
      if(!isNaN(y) && (y)!=""){
        url = url + "&" + x + "=" + y;
      }
		});

		console.log(url);
		const res = await fetch(url);
		if (res.ok) {

      deleteInputs();
      visible=true;
			console.log("Ok");
			const json = await res.json();
			televisionStats = json;
			console.log("Received " + televisionStats.length + " groupsTV.");
			if (televisionStats.length > 0){
        color="success"
				alertBox = "Se ha realizado la búsqueda.";
				
			}else{
			  color="danger";
				alertBox = "La búsqueda no ha obtenido resultados.";
        getGroupsTV();
			};
			
		} else {
			console.log("ERROR!");
		};
    setTimeout(offAlert,1750);
	};

  async function loadInitialData() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_API_PATH + "/television-stats/loadInitialData"
    ).then(function (res) {
      visible=true;
      if (res.ok) {
        console.log("OK");
        getGroupsTV();
        color = "success";
        alertBox = "Todos los datos han sido cargados correctamente"

      } else if (res.status == 409) {
        getGroupsTV();
        color = "danger";
        alertBox = "Conflicto al cargar los datos iniciales"
        console.log("Conflict");

      } else {
        getGroupsTV();
        color = "danger";
        alertBox = "Error al cargar los datos iniciales"
        console.log("Error");
      }
    });
    setTimeout(offAlert,1750);
  }


  async function getGroupsTV() {
    console.log("Fetching data...");
    const res = await fetch(BASE_API_PATH + "/television-stats?offset=" + limit * offset + "&limit=" + limit);
    const resNext = await fetch(BASE_API_PATH + "/television-stats?offset=" + limit * (offset+1) + "&limit=" + limit);
    if (res.ok && resNext.ok) {
      console.log("Ok.");
      const json = await res.json();
      const jsonNext = await resNext.json();
      televisionStats = json;
      if (jsonNext.length == 0) {
              moreData = false;
      } else {
              moreData = true;
            }
      console.log(`We have received ${televisionStats.length} groupsTV.`);
    } else {
      console.log("Error!");
    }
  }

  async function deleteData() {
    console.log("Deleting data...");
    const res = await fetch(BASE_API_PATH + "/television-stats", {
      method: "DELETE",
    }).then(function (res) {
      visible=true;
      downOffset();
      if (res.status==200) {
        console.log("Data Base deteled");
        televisionStats = [];
        color = "success";
        alertBox = "Todos los datos han sido borrados correctamente"
       
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
    setTimeout(offAlert,1750);
  }

  async function insertGroupTV(){
		 
     console.log("Inserting new GroupTV...");

     if (newGroupTV.groupTV == "" || newGroupTV.country=="" ||
      newGroupTV.year==""|| newGroupTV.cable_tv_broadcast_avg_audience_year ==""||
      newGroupTV.avg_age ==""||newGroupTV.avg_audience_month== "") {
      visible=true;
      color = "danger";
      alertBox= "Error, existe algun campo vacio, debe rellenar todos los campos";
     }else {
         const res = await fetch(BASE_API_PATH + "/television-stats",{
             method:"POST",
             body:JSON.stringify(newGroupTV),
             headers:{
                 "Content-Type": "application/json"
             }
         }).then(function (res) {
             
             visible=true;
             if (res.status == 201){
                 getGroupsTV();
                 console.log("Data introduced");
                 color = "success";
                 alertBox="El grupoTV ("+ newGroupTV.groupTV +") ha sido introducido correctamente";
                
             }else if(res.status == 400){
                 console.log("ERROR Data was not correctly introduced");
                 color = "danger";
                 alertBox= "Los datos no fueron introducidos correctamente";
                 
             }else if(res.status == 409){
                 console.log("ERROR There is already a data with that GroupTV and year in the database");
                 color = "danger";
                 alertBox= "Ya existe una entrada con el mismo GroupTV y año introducido";
             }
         });
         
         deleteInputs();
     }
     setTimeout(offAlert,3000);	
 }


  async function deleteGroupTV(groupName, year) {
    console.log("Deleting GroupTV with name: " + groupName +"and year: " + year);

    const res = await fetch(BASE_API_PATH + "/television-stats/" + groupName + "/" + year,{
        method: "DELETE",
      }
    ).then(function(res){
      getGroupsTV();
      visible=true;
      if (res.ok) {
        console.log("Data Base deteled");
        color = "success";
        alertBox = "El grupoTV (" +groupName+") ha sido eliminado correctamente"

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
    setTimeout(offAlert,1750);
  }
 
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink
        on:click={getGroupsTV}
        type="button"
        class="btn btn-primary btn-sm"
        style="margin: 1em">Volver</NavLink
      >
    </NavItem>
    <NavItem id="Boton">
     <!-- {#if televisionStats.length === 0}-->
        <NavLink
          href="#"
          on:click={BotonCargar}
          id="Boton"
          type="button"
          class="btn btn-success btn-sm"
          style="margin: 1em"
        >
          Cargar datos iniciales</NavLink
        >
     <!-- {:else}
        <NavLink
          disabled
          href="#"
          on:click={BotonCargar}
          id="Boton"
          type="button"
          class="btn btn-success btn-sm"
          style="margin: 1em"
        >
          Cargar datos iniciales</NavLink
        >
      {/if}-->
    </NavItem>


    <NavItem>
      {#if televisionStats.length === 0}
        <NavLink
          disabled
          href="#"
          on:click={BotonBorrar}
          type="button"
          class="btn btn-danger btn-sm"
          style="margin: 1em"
        >
          Borrar todos los datos</NavLink
        >
      {:else}
        <NavLink
          href="#"
          on:click={BotonBorrar}
          type="button"
          class="btn btn-danger btn-sm"
          style="margin: 1em"
        >
          Borrar todos los datos</NavLink
        >
      {/if}
    </NavItem>
  </Nav>

  <!-- Table -->
  <Alert color={color} isOpen={visible}  toggle={() => (visible = false)}>
    {#if alertBox}
    {alertBox}
    {/if}
  </Alert>

  {#if televisionStats.length === 0}
    <p>Se necesita cargar los datos.</p>
  {:else}
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
          <td><input id="inputGroup" class= new type="text" bind:value={newGroupTV.groupTV} /></td>
          <td><input id="inputCountry" class= new type="text" bind:value={newGroupTV.country} /></td>
          <td><input id="inputYear" class= new type="number" bind:value={newGroupTV.year} /></td>
          <td><input id="inputAudienceYear" class= new type="number" bind:value={newGroupTV.cable_tv_broadcast_avg_audience_year}/></td>
          <td><input id="inputAge" class= new type="number" bind:value={newGroupTV.avg_age} /></td>
          <td><input id="inputAudienceMonth" class= new type="number" bind:value={newGroupTV.avg_audience_month}/></td>

          <td><Button  id="insert" outline color="primary" on:click={insertGroupTV}>Insertar</Button></td>
          <td><Button color="primary" on:click={SearchGroupsTV(offset)}>Buscar</Button></td>
        </tr>


        {#each televisionStats as stat}
          <tr>
            <td>{stat.groupTV}</td>
            <td>{stat.country}</td>
            <td>{stat.year}</td>
            <td>{stat.cable_tv_broadcast_avg_audience_year}</td>
            <td>{stat.avg_age}</td>
            <td>{stat.avg_audience_month}</td>
            <td><Button
                outline
                color="danger"
                on:click={deleteGroupTV(stat.groupTV, stat.year)} >Borrar</Button
              ></td>
            <td><Button
                outline
                color="info"
                href="/#/television-stats/{stat.groupTV}/{stat.year}"
                >Editar</Button
              ></td>
          </tr>
        {/each}
      </tbody>
    </Table>
  {/if}


  <Pagination ariaLabel="Cambiar de página" style="padding-left: 47%;">
      <!-- Previous-->
    <PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
        <PaginationLink previous href="#/television-stats" on:click="{() => upOffset(-1)}" />
    </PaginationItem>
    
    {#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/television-stats" on:click="{() => upOffset(-1)}" >{currentPage - 1}</PaginationLink>
        </PaginationItem>
    {/if}

       <!-- Current-->
    <PaginationItem active>
        <PaginationLink href="#/television-stats" >{currentPage}</PaginationLink>
    </PaginationItem>

    <!-- Next-->
    {#if moreData}
        <PaginationItem >
            <PaginationLink href="#/television-stats" on:click="{() => upOffset(1)}">{currentPage + 1}</PaginationLink>
        </PaginationItem>
    {/if}
    <PaginationItem class="{moreData ? '' : 'disabled'}">
        <PaginationLink next href="#/television-stats" on:click="{() => upOffset(1)}"/>
    </PaginationItem>  
</Pagination>
</main>

<style>
  main {
    text-align: center;
    padding: 3em;
    padding-top: 1em;
    margin: 0 auto;
  }
</style>
