let pagina = 1;
let noticias = "";
let ultimanoticias;


const cargarnoticias = async () => {
  // Creamos el observador
  let observador = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          pagina++;
          cargarnoticias();
        }
      });
    },
    {
      rootMargin: "0px 0px 1900px 0px",
      threshold: 0.5,
    }
  );

  const respuesta = fetch(`https://cdelu.ar/api/?facebook=${pagina}`) // Llamar a la API
    .then((response) => response.json()) // obtener respuesta
    .then((data) => mostrarDatos(data)); // imprimir resultado

  const mostrarDatos = (data) => {
    for (var i = 0; i < data.length; i++) {
      // Obtiene todo los Registro de la API total 10
      // Titulo
      noticias += `          
<div id="box-principal${urlID == data[i]._ID}" class="container">



  <div class="row">
    <div class="col-6" >
        <a class="link_face" Target="_blank" href="https://fb.com/${data[i].face_user_id}"><h5>
          <i class='bx bxl-facebook-square'>  ${data[i].face_user_name.replace(true, 'Link del usuario')}</i>
          </h5></a>   

    </div>    
                                  
        <div class="col-6" >
        <a class="link_facebook" Target="_blank" href="${data[i].url}"><h5>
            <i class='bx'>Link Publicacion  |</i><i class='bx bxl-facebook'></i>
        </h5></a>   
    </div>
        
  </div>




        <div class="col"> 

        </div>
      
        <div class="titulo-facebook">
        <b>${data[i].titulo}</b></div>  

            <div class="row">

               
              <div class="col" id="imagen-${null == data[i].portada_local}">                                    
              <img class="img-fluid" loading="lazy" src="${
                data[i].portada_local
              }" >
                        <br>   
                </div> 

                  
                <div class="col-12">
                <p><h6>${
                  data[i].contenido.replace(/(<.*?>)/g, " ").substr(0, 470)}</h6></p>     
            

            </div>
                  
              </div>
                    <div class="row">
                        <div class="col">

                 
 
                        </div>
                  

                    </div>
    
                    <div class="row align-items-center">
                    <div id="nota-diario" class="col">
    
                 
  <div id="centenido-${null == data[i].portada_local}-${470 >= data[i].contenido.replace(/(<.*?>)/g, " ").length}">                     
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#id${
      data[i]._ID
    }">
     > Leer mas...
    </button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="id${
      data[i]._ID
    }" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Facebook - Basta de inseguridad</h5>
            <button type="button"  data-bs-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          ${data[i].contenido}
         </div>


          <div class="modal-footerDos">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

          </div>
        </div>
      </div>
    </div>
                            <figcaption class="blockquote-footer text-end">
                            ${data[i].cct_created}
                            </figcaption>
                            
                    </div>
                </div> </div>
            
            `;

      document.getElementById("myID").innerHTML = noticias;

      // x = 100 colocar numero maximo de Paginacion
      if (pagina < 100) {
        if (ultimanoticias) {
          observador.unobserve(ultimanoticias);
        }

        const noticiasEnPantalla = document.querySelectorAll(
          ".contenedor #nota-diario"
        );
        ultimanoticias = noticiasEnPantalla[noticiasEnPantalla.length - 1];
        observador.observe(ultimanoticias);
      }
    }
  }; // Fin de la API
};
cargarnoticias();
















const urlID = document.location.search.replace('?', '')

const cargarId = async () => {
  fetch(`https://cdelu.ar/api/?id=${urlID}`)     // Llamar a la API
    .then(response => response.json())                // obtener respuesta
    .then(data => mostrarId(data))                 // imprimir resultado
    .catch(error => console.log(error))               // en caso de error  mostrar msj

  const mostrarId = (data) => {
    let id = ""
    for (var i = 0; i < data.length; i++) {     // Obtiene todo los Registro de la API total 10

      id = ` <br><br>        
<div id="box-principalfaceID" class="containerfaceID">
        <div class="row">
              <div class="col-6">
                <a
                  class="link_face"
                  target="_blank"
                  href="https://fb.com/${data[i].face_user_id}"
                  ><h5>
                    <i class="bx bxl-facebook-square"> ${data[i].face_user_name}</i>
                  </h5></a
                >
              </div>
      
              <div class="col-6">
                <a class="link_facebook" target="_blank" href="${data[i].url}"
                  ><h5>
                    <i class="bx">Link Publicacion |</i
                    ><i class="bx bxl-facebook"></i></h5
                ></a>
              </div>
            </div>
      
            <div class="titulo-facebook">
              <b>${data[i].titulo}</b>
            </div>
      
            <div class="row">
              <div class="faceIDimg">${data[i].contenido}</div>
            </div>
      
            <div class="row align-items-center">
              <div id="nota-diario" class="col">
                <figcaption class="blockquote-footer text-end">
                  ${data[i].cct_created}
                </figcaption>
              </div>
        </div>
</div>
          
          
            `;

      document.getElementById("myID2").innerHTML = id;


    }
  }; // Fin de la API
}

cargarId();














let navegador = navigator.userAgent;
if (window.innerWidth <= 768) {
  navegador = "open";
} else {
  navegador = "close";
}

//codigo para el Menu Mostrar Ocultar
let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector("#btn");
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle(navegador);
});
// Finaliza

//fechas
// ${new Date(data[i].cct_created).getTime() - new Date()} ---- ${data[i].cct_created}
