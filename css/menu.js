function menus(){
    noticias =`  



    <div class="sidebar open">
    <div class="logo-details">
           <i class='bx bx-menu' id='btn' >  </i>
           <div class="logo_name">Cdelu.ar</div>
          <img class="logo-movil" src="logo.png" alt="profileImg">
        

     
    </div>
    <ul class="nav-links">
      <li>
        <a href="index.html">
          <i class='bx bxs-home'></i>
          <span class="link_name">Inicio</span>
        </a>
        <ul class="sub-menu blank">
<li><a class="link_name" href="#">Inicio</a></li>
        </ul>

      </li>



      <li>
      <div class="iocn-link">
        <a><i class='bx bx-news'></i>
          <span class="link_name">Diarios</span>
        </a>
        <i class='bx bxs-chevron-down arrow' ></i>
      </div>
      <ul class="sub-menu">
        <li><a class="link_name" value="open" href="#">Diarios</a></li>
        <li><a href="genesis24.html">Genesis24</a></li>
        <li><a href="prensa_federal.html">La Prensa Federal</a></li>
        <li><a href="lapiramide.html">La Pirámide</a></li>
        <li><a href="radiodigital.html">Radio 9 Digital</a></li>
      </ul>
    </li>
    


      <li>
        <div class="iocn-link">
          <a><i class='bx bx-grid-alt' ></i>
            <span class="link_name">Categorias</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Categorias</a></li>
          <li><a href="funebres.html">Fúnebres</a></li>
          <li><a href="policiales.html">Policiales</a></li>
          <li><a href="ciudad.html">Ciudad</a></li>
          <li><a href="deportes.html">Deportes</a></li>
          <li><a href="politica.html">Politica</a></li>
          
          
        </ul>
      </li>
                
        

      <li>
        <a href="facebook.html">
          <i class='bx bxl-facebook-square'></i>
          <span class="link_name">Facebook</span>
        </a>
        </li>
        


  <li>
    <div class="profile-details">
      <div class="profile-content">
        <img src="logo.png" alt="profileImg">
      </div>

      <div class="name-job">
        <div class="profile_name">Noticias de</div>
        <div class="job">Concepcion del Uruguay</div>
      </div>
      <i class='' ></i>
    </div>
  </li>
</ul>
</div>



<section class="home-section">

<div class="espaciado-${window.innerWidth <= 768}">
<br><br></div>
<div class="barra"> < Ultimas noticias > </div>
<br>

<div class="contenedor" id="contenedor">

      <center>Cargando...
   <progress id="carga" max="100" ></progress>
      </center>
</div>

</section>



`  
}

menus();

document.getElementById('menu').innerHTML = noticias