<script>
  import { onMount } from "svelte";

  import { is_empty } from "svelte/internal";

  // import Table from "sveltestrap/src/Table.svelte";

  import { Nav, NavItem, NavLink, Table, Button, Alert,  Pagination, PaginationItem,
    PaginationLink } from "sveltestrap";

  //Alert Vars
  let visible = true;
  let color = "";
  let alertBox = "";

  function flushAlert() {
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
  //Pagination Var
  let offset = 0;
  let limit = 10;
  let object = 1;
  let otherPage = true;

  function offsetUp (numPag){
    offset += numPag;
    object += numPag;
    getOnlineMedia() 
  }

  function offsetDown (){
    offset = 0;
    object = 1;
    getOnlineMedia() 
  }

  function chargeInputs(InputOM,InputCountry,InputYear,InputAPPM,InputMark,InputAudience) {
    let charge= {
    online_media: InputOM,
    country: InputCountry,
    year: InputYear,
    account_price_per_month: InputAPPM,
    mark: InputMark,
    audience: InputAudience,
  };
  newOnlineMedia=charge;
  }

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

  //API
  let onlinemediaStats = [];
  let newOnlineMedia = {
    online_media: "",
    country: "",
    year: "",
    account_price_per_month: "",
    mark: "",
    audience: "",
  };

  onMount(getOnlineMedia);

  const BASE_CONTACT_API_PATH = "/api/v1";

  //Funciones
  async function loadInitialData() {
    console.log("Loading data...");

    const res = await fetch(
      BASE_CONTACT_API_PATH + "/onlinemedia-stats/loadInitialData"
    ).then(function (res) {
      visible = true;
      if (res.ok) {
        console.log("OK");
        getOnlineMedia();
        color = "success";
        alertBox = "Datos cargados correctamente";
      } else if (res.status == 409) {
        getOnlineMedia();
        color = "danger";
        alertBox = "Conflicto al cargar";
        console.log("Conflict");
      } else {
        getOnlineMedia();
        color = "danger";
        alertBox = "Error al cargar";
        console.log("Error");
      }
    });
    setTimeout(flushAlert, 1500);
  }
  async function getOnlineMedia() {
    console.log("Fetching contacts...");
    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/onlinemedia-stats?limit=" +
        limit +
        "&offset=" +
        limit * offset
    );
    const nextRes = await fetch(
      BASE_CONTACT_API_PATH +
        "/onlinemedia-stats?limit=" +
        limit +
        "&offset=" +
        limit * (offset + 1)
    );
    if (res.ok && nextRes.ok) {
      console.log("Ok.");
      const json = await res.json();
      const nextJson = await nextRes.json();
      onlinemediaStats = json;
      if (nextJson == 0) {
        otherPage = false;
      } else {
        otherPage = true;
      }
      console.log(`We have received ${onlinemediaStats.length} OnlineMedia.`);
    } else {
      console.log("Error!");
    }
  }

  async function deleteData() {
    console.log("Deleting data...");

    const res = await fetch(BASE_CONTACT_API_PATH + "/onlinemedia-stats", {
      method: "DELETE",
    }).then(function (res) {
      visible = true;
      offsetDown();
      if (res.ok) {
        console.log("OK");
        onlinemediaStats = [];
        color = "success";
        alertBox = "Datos borrados.";
      } else if ((res.status = 404)) {
        color = "danger";
        alertBox = "Datos no encontrados";
        console.log("ERROR Data not found in database");
      } else {
        color = "danger";
        alertBox = "Datos no borrados";
        console.log("ERROR");
      }
    });
    setTimeout(flushAlert, 1500);
  }

  async function insertOnlineMedia() {
    console.log("Inserting OnlineMedia " + JSON.stringify(newOnlineMedia));

    if (
      newOnlineMedia.online_media == "" ||
      newOnlineMedia.country == "" ||
      newOnlineMedia.year == "" ||
      newOnlineMedia.account_price_per_month == "" ||
      newOnlineMedia.mark == "" ||
      newOnlineMedia.audience == "") {
      visible = true;
      color = "danger";
      alertBox = "Campos incompletos";
    } else {
      const res = await fetch(BASE_CONTACT_API_PATH + "/onlinemedia-stats", {
        method: "POST",
        body: JSON.stringify(newOnlineMedia),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        visible = true;
        if (res.status == 201) {
          console.log("OK")
          getOnlineMedia();
          color = "success";
          alertBox = "Dato"+ newOnlineMedia.online_media +" insertado correctamente";
        } else if (res.status == 400) {
          console.log("Datos no introducidos correctamente")
          color = "danger";
          alertBox = "Datos no introducidos correctamente";
        } else if (res.status == 409) {
          console.log("Ya existe")
          color = "danger";
          alertBox = "Ya existe un elemento con " + newOnlineMedia.online_media + " y " + newOnlineMedia.year;
        }
      });

      deleteInputs();
    }

    setTimeout(flushAlert, 2500);
  }

  async function deleteOnlineMedia(groupName, year) {
    console.log(
      "Deleting OnlineMedia with name " + groupName + "and year" + year
    );

    const res = await fetch(
      BASE_CONTACT_API_PATH + "/onlinemedia-stats/" + groupName + "/" + year,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      visible = true;
      if (res.status == 200) {
        console.log("Data Base deteled");
        color = "success";
        alertBox = "La OnlineMedia (" +groupName+") ha sido eliminado correctamente"
        getOnlineMedia();
      } else if ((res.status = 404)) {
        console.log("ERROR Data not found in database");
        color = "danger";
        alertBox = "No existen datos para borrar"
      } else {
        console.log("ERROR");
        color = "danger";
        alertBox = "No se ha podido borrar los datos de " + groupName
      }
    });
    setTimeout(flushAlert, 1500);
  }
  onMount(getOnlineMedia);

  async function updateOnlineMedia(groupName, year) {
    console.log("Editing OnlineMedia with name " + groupName);
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/onlinemedia-stats/" + groupName + "/" + year,
      {
        method: "PUT",
        body: JSON.stringify(newOnlineMedia),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(function (res) {
      visible = true
      if (res.status == 200) {
        console.log("Data updated");
        getOnlineMedia();
        color = "success";
        alertBox = "Datos actualizados de" + groupName
        
      } else if (res.status == 400) {
        console.log("ERROR Data was not correctly introduced");
        color = "danger";
        alertBox = "No se ha podido actualizar los datos de" + groupName
      } else if (res.status == 409) {
        console.log("ERROR There is already a data with that province and year in the da tabase");
        color = "danger";
        alertBox = "Conflicto al actualizar " + groupName
      }
    });
    deleteInputs()
    setTimeout(flushAlert, 1500);

  }

  onMount(getOnlineMedia);

  //Paginacion

  /*async function getNext() {
    if (object > onlinemediaStats.length) {
      object = 1;
    } else {
      object += 3;
    }

    //visible = true;
    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/onlinemedia-stats?limit=3&offset=" +
        (object - 1) * offset
    );
    //checkMSG= (object+3 > onlinemediaStats.length) ? "Mostrando elementos "+(object)+"-"+onlinemediaStats.length : "Mostrando elementos "+(object)+"-"+(object+2);
    if (onlinemediaStats.length == 0) {
      console.log("ERROR Data is empty");
    } else if (res.ok) {
      const json = await res.json();
      onlinemediaStats = json;
    } else {
    }
  }

  async function getPrevious() {
    if (object - 3 > 1) {
      object -= 3;
    } else {
      object = 1;
    }

    //visible = true;
    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/onlinemedia-stats?limit=3&offset=" +
        (object - 1) * offset
    );
    //checkMSG= (object+3 > onlinemediaStats.length) ? "Mostrando elementos "+(object)+"-"+onlinemediaStats.length : "Mostrando elementos "+(object)+"-"+(object+2);
    if (onlinemediaStats.length == 0) {
      console.log("ERROR Data is empty");
    } else if (res.ok) {
      const json = await res.json();
      onlinemediaStats = json;
    } else {
    }
  }*/

  //Busqueda

  async function getSearch() {
    console.log("Searching stats...");
    let url = BASE_CONTACT_API_PATH + "/onlinemedia-stats?"

    let searchOM = {
      online_media: newOnlineMedia.online_media,
      country: newOnlineMedia.country,
      year: parseInt(newOnlineMedia.year),
      account_price_per_month: parseFloat(newOnlineMedia.account_price_per_month),
      mark: parseFloat(newOnlineMedia.mark),
      audience: parseInt(newOnlineMedia.audience),
    };

    Object.entries(searchOM).forEach(([x, y]) => {
      if (isNaN(y) && !is_empty(y)) {
        url = url + "&" + x + "=" + y;
      }
      if (!isNaN(y) && y != "") {
        url = url + "&" + x + "=" + y;
      }
    });

    const res = await fetch(url);
    if (res.ok) {
      visible = true;
      console.log("Ok");
      const json = await res.json();
      onlinemediaStats = json;
      console.log("Received " + onlinemediaStats.length + " onlineMedia.");

      if (onlinemediaStats.length > 0) {
        color = "success";
        alertBox = "Búsqueda realizada de " + (
      newOnlineMedia.online_media ||
      newOnlineMedia.country||
      newOnlineMedia.year ||
      newOnlineMedia.account_price_per_month ||
      newOnlineMedia.mark ||
      newOnlineMedia.audience );
      } else {
        getOnlineMedia();
        color = "danger";
        alertBox = "Búsqueda no realizada.";
      };
    } else {
      
      console.log("ERROR!");
    }
    deleteInputs()
    setTimeout(flushAlert, 1500);
  }
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink
        href="/"
        type="button"
        class="btn btn-primary btn-sm"
        style="margin: 1em">Volver</NavLink
      >
    </NavItem>
    <NavItem id="Boton">
      
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
     
    </NavItem>
    <NavItem>
      {#if onlinemediaStats.length === 0}
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

  <Alert color={color} isOpen={visible}  toggle={() => (visible = false)}>
    {#if alertBox}
    {alertBox}
    {/if}
  </Alert>

  {#if onlinemediaStats.length === 0}
    <p>Se necesita cargar los datos.</p>
  {:else}
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
        <td><input type="text" bind:value={newOnlineMedia.online_media} /></td>
        <td><input type="text" bind:value={newOnlineMedia.country} /></td>
        <td><input type="number" bind:value={newOnlineMedia.year} /></td>
        <td><input type="number" bind:value={newOnlineMedia.account_price_per_month}/></td>
        <td><input type="number" bind:value={newOnlineMedia.mark} /></td>
        <td><input type="number" bind:value={newOnlineMedia.audience} /></td>
        <td><Button on:click={insertOnlineMedia}>Insertar</Button></td>
        <td><Button color="secondary" on:click={getSearch(offset)}>Buscar</Button></td>
      </tr>

      {#each onlinemediaStats as stat}
        <tr>
          <td><a href="#/onlinemedia-stats/{stat.online_media}">{stat.online_media}</a></td>
          <td>{stat.country}</td>
          <td>{stat.year}</td>
          <td>{stat.account_price_per_month}</td>
          <td>{stat.mark}</td>
          <td>{stat.audience}</td>
          <td
            ><Button on:click={deleteOnlineMedia(stat.online_media, stat.year)}
              >Borrar</Button
            ></td
          >
          <td
            ><Button on:click={updateOnlineMedia(stat.online_media, stat.year)}
              >Actualizar</Button
            ></td
          >
          <td
            ><Button on:click={chargeInputs(stat.online_media,stat.country, stat.year, stat.account_price_per_month, stat.mark, stat.audience)}
              >↑</Button
            ></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
  <!--<Button outline color="primary" on:click={getPrevious}>Atrás</Button>
  <Button outline color="primary" on:click={getNext}>Siguiente</Button>-->
  {/if}

  <Pagination ariaLabel = "Cambio de Página" style = "padding-left: 47%;">
    
    <!--Previous Page-->
    <PaginationItem class="{object === 1 ? 'disabled' : ''}">
      <PaginationLink previous href="#/onlinemedia-stats" on:click="{() => offsetUp(-1)}" >Anterior</PaginationLink>
    </PaginationItem>

    {#if object != 1}
      <PaginationItem>
        <PaginationLink href="#/onlinemedia-stats" on:click="{() => offsetUp(-1)}" >{object - 1}</PaginationLink>
      </PaginationItem>
    {/if}

    <!--Current Page-->
    <PaginationItem active>
      <PaginationLink href="#/onlinemedia-stats" >{object}</PaginationLink>
    </PaginationItem>

    <!--Next Page-->
    {#if otherPage}
    <PaginationItem >
      <PaginationLink href="#/onlinemedia-stats" on:click="{() => offsetUp(1)}">{object + 1}</PaginationLink>
    </PaginationItem>
    {/if}
    <PaginationItem class="{otherPage ? '' : 'disabled'}">
      <PaginationLink next href="#/onlinemedia-stats" on:click="{() => offsetUp(1)}">Siguiente</PaginationLink>
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
