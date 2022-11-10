let pagina = 1;
let noticias = "";
let ultimanoticias;

//Obtener palabra que se encuentra despues de la URL quitando la raiz
const url = document.location.pathname.replace('.html', '').replace('/', '')
console.log(url);

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
  'PolÃ­tica' : "politica",
  'politica': "politica",
};



const url_default_transf = "index";
const urlFull = url_transf[url] || url_default_transf;

console.log("esta es la url " + url);

console.log(urlFull);

const otraUrl = url.replace(url, urlFull);

console.log("otra URL " + otraUrl);

console.log("url_transf[url] muestra... " + url_transf["Destacadas"]);

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
      
            <div id="box-principal" class="container">
            <div class="row">
                <div class="col-7" id="columna">
                    <div class"titulo"> ${data[i].titulo}</div>
                </div>
              <div class="col" id="imagen-${null == data[i].portada_local}">                                    
              <img class="img-fluid" loading="lazy" src="${data[
                i
              ].portada_local}" >
                        <br>   
                    </div> 
                    </div>
                    <div class="row">
                        <div class="col">
                        
<!-- el siguiente codigo, muestra el nombre de la Categoria si concide con la lista cambia a su respectivo (nombre nuevo) de lo contrario devuelve index -->     
<button class="nombre_categoria" onclick="window.location.href='${data[
        i
      ].categoria
        .replace(data[i].categoria, url_transf[data[i].categoria])
        .replace(undefined, "index")}.html'">
     
<i class='bx bx-grid-alt' >
        <u>${data[i].categoria}</u></a>
      </i>
</button> 

                        
<button class="nombre_diario" onclick="window.location.href='${data[
        i
      ].name_diario
        .replace(data[i].name_diario, url_transf[data[i].name_diario])
        .replace(undefined, "index")}.html'">


<i class='bx bx-news'>
        <u>${data[i].name_diario}</u></a>
      </i>
</button> 
                 
 
                        </div>
                  

                    </div>
    
                    <div class="row align-items-center">
                    <div id="nota-diario" class="col">
    
                    <p><h6>${
                      data[i].contenido
                        .replace(/(<.*?>)/g, " ")
                        .substr(0, 470) + "  ...."
                    }</h6></p>          
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#id${
      data[i]._ID
    }">
     > Leer mas...
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="id${
      data[i]._ID
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
       <img loading="lazy" src="${data[i].portada}" class="img">
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

