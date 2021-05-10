<script>
    import {
        onMount
    } from "svelte";
    import { is_empty } from "svelte/internal";

    import {
      Nav,
      NavItem,
      NavLink,
      Table,
      Button,
      Alert,
      Pagination,
      PaginationLink,
      PaginationItem
    } from "sveltestrap";

    let newStream = {
      platform: "",
      country: "",
      year:"",
      hour_viewed:"",
      avg_age:"",
      avg_audience:""
    }

    //VARIABLES ALERTAS
    let visible= false;
    let color="";
    let alertBox="";

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

    //PAGINACION
    let limit = 10;
    let offset = 0;
    let page = 1;
    let otherPage = true;

    //API
    let streamingStats = [];
    
    //FUNCTIONS
    function deleteInputs() {
        let reset= {
        online_media: "",
        country: "",
        year: "",
        account_price_per_month: "",
        mark: "",
        audience: "",
      };
      newOnlineMedia=reset;
    }

    async function next(numPag){
      offset+=numPag;
      page+=numPag;
      getStreams()
    }

    async function prev(){
      offset=0;
      page=1;
      getStreams()
    }

    //BUSQUEDA
    async function searchStreams(){
      let url = "/api/v1/streaming-stats?"
      console.log("Searching...");

      let search = {
        platform: newStream.platform,
			  country: newStream.country,
			  year: parseInt(newStream.year),
			  hour_viewed: parseInt(newStream.hour_viewed),
			  avg_age: parseInt(newStream.avg_age),
			  avg_audience: parseInt(newStream.avg_audience),
      }

      Object.entries(search).forEach(([x,y]) => {
        if(isNaN(y) && !is_empty(y)){
				  url = url + "&" + x + "=" + y;
        };
        if(!isNaN(y) && (y)!=""){
          url = url + "&" + x + "=" + y;
        }
      });

      url = url + "&limit=" +limit+"&offset="+(offset*limit);

      console.log(url);
      const res = await fetch(url);
      if(res.ok){
        visible=true;
        const json = await res.json();
        streamingStats = json;
        console.log("Received "+streamingStats.length+" streams");
        if (televisionStats.length > 0){
          color="success"
				  alertBox = "Búsqueda realizada de " + (
                newStream.platform ||
                newStream.country||
                newStream.year ||
                newStream.hour_viewed ||
                newStream.avg_age ||
                newStream.avg_audience );
			  }else{
          getStreams();
			    color="danger";
				  alertBox = "La búsqueda no ha obtenido resultados.";
			  };
      } else {
        console.log("ERROR!")
      }
      setTimeout(offAlert,1750);
    };

    //CARGA INICIAL DE DATOS
    async function loadInitialData() {
        console.log("Loading data...");
        const res = await fetch("api/v1/streaming-stats/loadInitialData").then(
        function (res) {
          visible=true;
            if (res.ok) {
                console.log("OK");
                getStreams();
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
        }
        );
        setTimeout(offAlert,1750);
    }

    //CARGA DE DATOS
    async function getStreams() {
        console.log("Fetching data...");
        const res = await fetch("/api/v1/streaming-stats?limit="+limit+"&offset="+limit*offset);
        const sigres = await fetch("/api/v1/streaming-stats?limit="+limit+"&offset="+(1+offset)*limit);
        if (res.ok && sigres.ok) {
            console.log("Ok.");
            const json = await res.json();
            const nextjson = await sigres.json();
            streamingStats = json;
            if(nextjson==0? otherPage=false : otherPage=true);
            console.log(`We have received ${streamingStats.length} streaming platforms.`);
        } else {
            console.log("Error!");
        }
    }
    onMount(getStreams);

    //INSERTAR
    async function insertStream(){
        console.log("Inserting stream "+ JSON.stringify(newStream));
        if (newStream.platform == "" || newStream.country=="" ||
          newStream.year==""|| newStream.hour_viewed ==""||
          newStream.avg_age ==""||newStream.avg_audience== "") {
            visible=true;
            color = "danger";
            alertBox= "Error, existe algun campo vacio, debe rellenar todos los campos";
     } else {
        const res = await fetch("/api/v1/streaming-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newStream),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                             visible = true;
                             if (res.status== 201){
                              getStreams();
                              console.log("Data introduced");
                              color = "success";
                              alertBox="La plataforma ("+ newStream.platform +") ha sido introducido correctamente";
                             } else if(res.status == 400){
                                console.log("ERROR Data was not correctly introduced");
                                color = "danger";
                                alertBox= "Los datos no fueron introducidos correctamente";
                             } else if (res.status== 409){
                                console.log("ERROR There is already a data with that GroupTV and year in the database");
                                color = "danger";
                                alertBox= "Ya existe una entrada con la plataforma "+newStream.platform +" y año " + newStream.year;
                             }
                          });
        }
        setTimeout(offAlert,3000);
    }

    //BORRAR DATO
    async function deleteStream(streamPlatform,streamYear){
        console.log("Deleting stream with platform "+ streamPlatform+" with year "+streamYear);

        const res = await fetch("/api/v1/streaming-stats/"+streamPlatform+"/"+streamYear,
                            {
                                method: "DELETE"
                            }
                           ).then( (res) => {
                               getStreams();
                               visible = true;
                               if(res.ok){
                                console.log("Data deteled");
                                color = "success";
                                alertBox = "El stream (" +streamPlatform+") ha sido eliminado correctamente"
                               } else if ((res.status = 404)) {
                                  console.log("ERROR Data not found in database");
                                  color = "danger";
                                  alertBox = "No existen datos para borrar"
                                } else {
                                  console.log("ERROR");
                                  color = "danger";
                                  alertBox = "No se ha podido borrar los datos de "+ newStream.platform;
                                }
                           })
                           setTimeout(offAlert,1750);
    }
    onMount(getStreams);

    //BORRAR DATOS
    async function deleteData() {
      console.log("Deleting data...");
      const res = await fetch("api/v1/streaming-stats/", {
        method: "DELETE",
      }).then(function (res) {
        prev();
        if (res.ok) {
            console.log("OK");
            streamingStats = [];
            color = "success";
            alertBox = "Todos los datos han sido borrados correctamente"
        } else if (res.status = 404) {
            color = "danger";
            alertBox = "No existen datos para borrar"
            console.log("ERROR Data not found in database");
        } else {
            color = "danger";
            alertBox = "No se ha podido borrar los datos"
            console.log("ERROR");
        }
      });
    }
    getStreams();
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
          <NavLink href="#" on:click={BotonBorrar}  type="button" class="btn btn-danger btn-sm" style= "margin: 1em">
              Borrar todos los datos</NavLink>
        </NavItem>
    </Nav>

    <Alert color={color} isOpen={visible}  toggle={() => (visible = false)}>
      {#if alertBox}
      {alertBox}
      {/if}
    </Alert>


    {#if streamingStats.length === 0}
        <p>Se necesita  cargar los datos.</p>
    {:else}
    <Table borderer>
        <thead>
          <tr>
            <th>Plataforma</th>
            <th>Pais</th>
            <th>Año</th>
            <th>Horas vistas</th>
            <th>Edad media</th>
            <th>Audiencia media</th>
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
              <td><Button on:click={searchStreams}>Buscar</Button></td>
            </tr>
            {#each streamingStats as stat}
            <tr>
                <td><a href="/#/streaming-stats/{stat.platform}/{stat.year}">{stat.platform}</a></td>
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
    {/if}
    <!--Previous!-->
    <Pagination>
      <PaginationItem class="{page === 1 ? 'disabled' : ''}">
        <PaginationLink previous href="/#/streaming-stats" on:click="{()=>next(-1)}"></PaginationLink>
      </PaginationItem>
      {#if page!=1}
      <PaginationItem>
        <PaginationLink href="/#/streaming-stats" on:click="{()=>next(-1)}">{page-1}</PaginationLink>
      </PaginationItem>
      {/if}
      <!--Current!-->
      <PaginationItem>
        <PaginationLink href="/#/streaming-stats" >{page}</PaginationLink>
      </PaginationItem>

      <!--Next Page-->     
      {#if otherPage}     
      <PaginationItem >       
        <PaginationLink href="#/streaming-stats" on:click="{() => next(1)}">{page + 1}</PaginationLink>     
      </PaginationItem>     
      {/if}     
      <PaginationItem class="{otherPage ? '' : 'disabled'}">       
        <PaginationLink next href="#/streaming-stats" on:click="{() => next(1)}"/>   
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