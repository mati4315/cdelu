let pagina = 1;
let noticias = "";
let ultimanoticias;

//Obtener palabra que se encuentra despues de la URL quitando la raiz
const url = document.location.search.replace('?', '')


//Este siguiente codigo esta en lugar de SWITCH para que sea mas legible
// y trasforme los link en las categoria correspondiente de la API
const url_transf = {
  'index': "index",
  'Deportes': "deportes",
  'deportes': "deportes",
  'Ciudad': "ciudad",
  'ciudad': "ciudad",
  'Policiales': "policiales",
  'policiales': "policiales",
  "La Pirámide": "lapiramide",
  'lapiramide': "lapiramide",
  'Necrológicas': "funebres",
  'funebres': "funebres",
  'Fúnebres': "funebres",
  "GENESIS24.NET": "genesis24",
  'genesis24': "genesis24",
  "La Prensa Federal": "prensa_federal",
  'prensa_federal': "prensa_federal",
  "radiodigital": "radiodigital",
  'Radio 9 Digital': "radiodigital",
  'Política': "politica",
  'PolÃ­tica': "politica",
  'politica': "politica",
};



const url_default_transf = "index";
const urlFull = url_transf[url] || url_default_transf;


const otraUrl = url.replace(url, urlFull);



const cargarnoticias = async () => {
  // Cracion del observador para que cuando lo detecte automaticamente pase a la siguiente pagina
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
      rootMargin: "0px 0px 1400px 0px", // 1400px es para que se active antes de llegar al observador
      threshold: 0.5,
    }
  );

  const respuesta = fetch(
    `https://cdelu.ar/api/categoria/?${urlFull}=${pagina}`
  ) // Llamar a la API
    .then((response) => response.json()) // obtener respuesta
    .then((data) => mostrarDatos(data)); // imprimir resultado

  const mostrarDatos = (data) => {
    for (var i = 0; i < data.length; i++) {
      // Obtiene todo los Registro de la API total 10
      // Titulo

      noticias += `          
      
            <div id="box-principal${url == data[i]._ID}" class="container">
            <div class="row">
                <div class="col-7" id="columna">
                    <div class"titulo"> ${data[i].titulo}</div>
                </div>
              <div class="col" id="imagen-${null == data[i].portada
        }">                                    
              <img class="img-fluid" loading="lazy" src="${data[
          i
        ].portada.replace(
          "https://noticdelu.tk/wp-content/uploads/2022/11/1668495604_Tematica_Necrologicas2.jpg",
          "qepd.png"
        )}" >
                        <br>   
                    </div> 
                    </div>
                    <div class="row">
                        <div class="col">
                        
<!-- el siguiente codigo, muestra el nombre de la Categoria si concide con la lista cambia a su respectivo (nombre nuevo) de lo contrario devuelve index -->


<button class="nombre_categoria" onclick="window.location.href='${data[
          i
        ].categoria
          .replace(data[i].categoria, "?" + url_transf[data[i].categoria])
          .replace(undefined, "index")}'">
     
<i class='bx bx-grid-alt' >
        <u>${data[i].categoria}</u></a>
      </i>
</button> 
              
<button class="nombre_diario" onclick="window.location.href='${data[
          i
        ].name_diario
          .replace(data[i].name_diario, "?" + url_transf[data[i].name_diario])
          .replace(undefined, "index")}'">


<i class='bx bx-news'>
        <u>${data[i].name_diario}</u></a>
      </i>
</button> 
                 
 
                        </div>
                  

                    </div>
    
                    <div class="row align-items-center">
                    <div id="nota-diario" class="col">
    
                    <p><h6>${data[i].contenido
          .replace(/(<.*?>)/g, " ")
          .substr(0, 470) + "  ...."
        }</h6></p>          
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#id${data[i]._ID
        }">
     > Leer mas...
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="id${data[i]._ID
        }" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cdelu Noticias - Contenido</h5>
            <button type="button"  data-bs-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          ${data[i].contenido}
         </div>

       <div class="modal-body">
       <img loading="lazy" src="${data[i].portada.replace(
          "https://genesis24.net/wp-content/uploads/2017/05/Tematica_Necrologicas2.jpg",
          ""
        )}" class="img">
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
      document.getElementById("contenedor").innerHTML = noticias;

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








const notiID = document.location.search.replace('?', '')

const cargarnotiId = async () => {
  fetch(`https://cdelu.ar/api/?notiid=${notiID}`)     // Llamar a la API
    .then(response => response.json())                // obtener respuesta
    .then(data => mostrarId(data))                 // imprimir resultado
    .catch(error => console.log(error))               // en caso de error  mostrar msj

  const mostrarId = (data) => {
    let id = ""
    for (var i = 0; i < data.length; i++) {     // Obtiene todo los Registro de la API total 10

      id = ` <br><br>        
<div id="box-principalfaceID" class="containerfaceID">
        <div class="row">

              <div class="col-12">
                <a class="link_facebook" target="_blank" href="${data[i].url}"
                  ><h5>
                    <i class="bx">Link Publicación |</i
                    ><i class="bx bx-news"></i></h5
                ></a>
              </div>
            </div>
      
            <div class="titulo-facebook">
              <b>${data[i].titulo}</b>
            </div>
           
            <img loading="lazy" src="${data[i].portada.replace("https://genesis24.net/wp-content/uploads/2017/05/Tematica_Necrologicas2.jpg", "")}" class="img">
          
            <div class="row">
              <div class="faceIDimg">${data[i].contenido}</div>
            </div>
      


            
            <div class="row align-items-center">
              <div id="nota-diario" class="col">

              
                <figcaption class="blockquote-footer text-end">
                  ${data[i].cct_created}
                </figcaption>

                
<button class="nombre_categoria" onclick="window.location.href='${data[
          i
        ].categoria
          .replace(data[i].categoria, '?' + url_transf[data[i].categoria])
          .replace(undefined, "index")}'">

<i class='bx bx-grid-alt' >
  <u>${data[i].categoria}</u></a>
</i>
</button> 

                  
<button class="nombre_diario" onclick="window.location.href='${data[
          i
        ].name_diario
          .replace(data[i].name_diario, '?' + url_transf[data[i].name_diario])
          .replace(undefined, "index")}'">


<i class='bx bx-news'>
  <u>${data[i].name_diario}</u></a>
</i>
</button> 
              </div>

              
        </div>
</div>
          
          
            `;

      document.getElementById("myID").innerHTML = id;

    }
  }; // Fin de la API
}

cargarnotiId();








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
                    <i class="bx">Link Publicación |</i
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

      document.getElementById("myID").innerHTML = id;


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

