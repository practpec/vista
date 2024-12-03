import React, { useEffect } from 'react';
import '../assets/styles/Principal.scss';
import fondoImagen from '../assets/images/fondo.jpg';
import fondoImagen2 from '../assets/images/fondo2.png';
import fondoImagen3 from '../assets/images/fondo3.png';
import vid from '../assets/images/vid.jpg';
import Swiper from 'swiper';
import geotecnico from '../assets/images/geotecnico.jpg';
import infraestrcutura from '../assets/images/infraestructura.jpg';
import agricultura from '../assets/images/agricultura.jpg';
import contaminacion from '../assets/images/contaminacion.jpg';
import parque from '../assets/images/parque.jpg';
import subterranea from '../assets/images/subterranea.jpg';
import persona1 from '../assets/images/persona1.jpg';
import persona2 from '../assets/images/persona2.png';
import persona3 from '../assets/images/persona3.jpg';
import { Link } from 'react-router-dom';


export default function Principal(){
  useEffect(() => {
    const menuBtn = document.querySelector('#menu-btn');
    const searchBtn = document.querySelector('#search-btn');
    const infoBtn = document.querySelector('#info-btn');
    const closeContactInfoBtn = document.querySelector('#close-contact-info');
    const navbar = document.querySelector('.header .navbar');
    const searchForm = document.querySelector('.header .search-form');
    const contactInfo = document.querySelector('.contact-info');

    if (menuBtn) {
      menuBtn.onclick = () => {
        if (navbar) {
          navbar.classList.toggle('active');
        }
      };
    }

    if (searchBtn) {
      searchBtn.onclick = () => {
        if (searchForm) {
          searchForm.classList.toggle('active');
        }
      };
    }

    if (infoBtn) {
      infoBtn.onclick = () => {
        if (contactInfo) {
          contactInfo.classList.add('active');
        }
      };
    }

    if (closeContactInfoBtn) {
      closeContactInfoBtn.onclick = () => {
        if (contactInfo) {
          contactInfo.classList.remove('active');
        }
      };
    }

    const handleScroll = () => {
      if (navbar) {
        navbar.classList.remove('active');
      }
      if (searchForm) {
        searchForm.classList.remove('active');
      }
      if (contactInfo) {
        contactInfo.classList.remove('active');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    new Swiper('.home-slider', {
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

  return (
    <div>
      <div className='header'>
        <a href='#' className='logo'>Terra<span>Test</span></a>

        <div className='navbar'>
          <a href='#home'>home</a>
          <a href='#about'>about</a>
          <a href='#services'>services</a>
          <a href='#projects'>Projects</a>
          <a href='#pricings'>Pricings</a>
          <a href='#blog'>Blog</a>
          <a href='#contact'>Contact</a>
        </div>

        <div className='icons'>
          <div id='menu-btn' className='fas fa-bars'></div>
          <div id='info-btn' className='fas fa-info-circle'></div>
          <div id='search-btn' className='fas fa-search'></div>
          <Link to="/login">
      <div id="login-btn" className="fas fa-user"></div>
    </Link>
        </div>

        <form action='' className='search-form'>
          <input type='search' name='' placeholder='Search here' id='search-box' />
          <label htmlFor='search-box' className='fas fa-search'></label>
        </form>
      </div>

      <div className='contact-info'>
        <div id='close-contact-info' className='fas fa-times'></div>

        <div className='info'>
          <i className='fas fa-phone'></i>
          <h3>Phone Number</h3>
          <p>961-294-356-3249</p>
          <p>961-334-642-1536</p>
        </div>

        <div className='info'>
          <i className='fas fa-envelope'></i>
          <h3>Email Address</h3>
          <p>terratest@gmail.com</p>
          <p>tecnobrain@gmail.com</p>
        </div>

        <div className='info'>
          <i className='fas fa-map-marker-alt'></i>
          <h3>Office Address</h3>
          <p>Suchiapa, Chiapas - 29000</p>
        </div>

        <div className='share'>
          <a href='#' className='fab fa-facebook-f'></a>
          <a href='#' className='fab fa-twitter'></a>
          <a href='#' className='fab fa-instagram'></a>
          <a href='#' className='fab fa-linkedin'></a>
        </div>
      </div>

      <section className='home' id='home'>
        <div className='swiper home-slider'>
          <div className='swiper-wrapper'>
            <section className='swiper-slide slide' style={{ 
              backgroundImage: `url(${fondoImagen})`,
             
              backgroundRepeat: "no-repeat"
            }}>
              <div className='content'>
                <h3>Proveemos el mejor servicio</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href='#about' className='btn'>get started</a>
              </div>
            </section>

            <section className='swiper-slide slide' style={{ 
              backgroundImage: `url(${fondoImagen2})`,
              backgroundRepeat: "no-repeat"
            }}>
              <div className='content'>
                <h3>Proveemos el mejor servicio</h3>
                <p>efwffkkkkkoeffkowfkwdk  fef er g tge fe fe geg r fefeffew</p>
                <a href='#about' className='btn'>get started</a>
              </div>
            </section>

            <section className='swiper-slide slide' style={{ 
              backgroundImage: `url(${fondoImagen3})`,
              backgroundRepeat: "no-repeat"
            }}>
              <div className='content'>
                <h3>Proveemos el mejor servicio</h3>
                <p>efwffkkkkkoeffkowfkwdk  fef er g tge fe fe geg r fefeffew</p>
                <a href='#about' className='btn'>get started</a>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className='about' id='about'>
        <h1 className='heading'>Acerca de nosotros</h1>
        <div className='row'>
          <div className='video'>
          <img src={vid} alt="About us video" className="about-video-img" />
          </div>

          <div className='content'>
            <h3>¡Hacemos el mejor trabajo para tí!</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit vulputate viverra, purus ante sem. Gravida massa vulputate purus non cubilia augue eleifend diam, nisi etiam ad fusce turpis 
             velit iaculis parturient, porta in sociis aliquam donec penatibus lacinia.</p >
            <a href='#services' className='btn'>leer más</a>
          </div>
          
        </div>

        <div className='box-container'>

          <div className='box'>
          <h3>10+</h3>
          <p>años de experiencia</p>
          </div>

         <div className='box'>
          <h3>20+</h3>
          <p>proyectos completados</p>
          </div>

          <div className='box'>
          <h3>790+</h3>
          <p>clientes satisfechos</p>
          </div>

          <div className='box'>
          <h3>450+</h3>
          <p>trabajadores activos</p>
          </div>

        </div>

      </section>

      <section className='projects' id='projects'>

        <h1 className='heading'>nuestros proyectos</h1>
        
        <div className='box-container'>
          <a href='assets\images\geotecnico.jpg' className='box'>
            <div className='image'>
            <img src={geotecnico}></img>
            </div>
          
          <div className='content'>
              <div className='info'>
                <h3>Estudios Geotécnicos para Construcción de Edificios:</h3>
                <p>Proveer recomendaciones de cimentación para edificios residenciales, comerciales e industriales.</p>
              </div>  
            </div>  
            </a>
            <a href='assets\images\infraestructura.jpg' className='box'>
           <div className='image'>
            <img src={infraestrcutura}></img>
            </div>
          
          <div className='content'>
              <div className='info'>
                <h3>Estudios de Suelo para Proyectos de Infraestructura:</h3>
                <p>Evaluar la estabilidad del suelo para la construcción de carreteras, puentes y túneles.</p>
              </div>
              
            </div>  
             </a>

             <a href='assets\images\agricultura.jpg' className='box'>
           <div className='image'>
            <img src={agricultura}></img>
            </div>
          <div className='content'>
              <div className='info'>
                <h3>Análisis de Suelo para Agricultura:</h3>
                <p>Proveer recomendaciones para mejorar la calidad del suelo y aumentar la productividad agrícola.</p>
              </div>
    
            </div>  
             </a>
             <a href='assets\images\contaminacion.jpg' className='box'>
           <div className='image'>
            <img src={contaminacion}></img>
            </div>
          <div className='content'>
              <div className='info'>
                <h3>Investigaciones Ambientales y de Contaminación del Suelo:</h3>
                <p>Proveer planes de remediación y limpieza de suelos contaminados.</p>
              </div>
              
            </div>  
             </a>
             <a href='assets\images\parque.jpg' className='box'>
           <div className='image'>
            <img src={parque}></img>
            </div>
          <div className='content'>
              <div className='info'>
                <h3>Estudios de Suelo para Energía Renovable:</h3>
                <p>Evaluar suelos para la instalación de parques eólicos y solares.</p>
              </div>
            </div>  
             </a>

             <a href='assets\images\subterranea.jpg' className='box'>
           <div className='image'>
            <img src={subterranea}></img>
            </div>
          <div className='content'>
              <div className='info'>
                <h3>Estudios Hidrogeológicos:</h3>
                <p>Evaluar la viabilidad de pozos de agua y sistemas de extracción de agua subterránea.</p>
              </div>
            </div>  
             </a>

        </div> 

      </section>
      <section className='reviews'>
    <h1 className='heading'>Reseñas de clientes</h1>
    <div className='reviews-container'>
        <div className='slide'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className='user'>
                <img src={persona1} alt='Karen'/>
                <div className='info'>
                    <h3>Karen</h3>
                    <div className='stars'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                </div>
            </div>
        </div>

        <div className='slide'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className='user'>
                <img src={persona2} alt='Maria'/>
                <div className='info'>
                    <h3>Maria</h3>
                    <div className='stars'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                </div>
            </div>
        </div>

        <div className='slide'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className='user'>
                <img src={persona3} alt='Paola'/>
                <div className='info'>
                    <h3>Paola</h3>
                    <div className='stars'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section className='pricing' id='pricing'>
      <h1 className='heading'>Nuestros Planes</h1>

      <div className='box-container'>

        <div className='box'>
          <i className='fas fa-home'></i>
          <h3>basic plan</h3>
          <div className='price'><span></span><span></span>$250/m</div>
          <div className='list'>
            <p>Analisis de datos</p>
            <p>Gráficas</p>
            <p>Gráficas</p>
            <p>Seguro contra daños</p>
          </div>
          <a href='#' className='btn'>Elige un plan</a>
        </div>

            
        <div className='box'>
          <i className='fas fa-building'></i>
          <h3>premium plan</h3>
          <div className='price'><span></span><span></span>$650/m</div>
          <div className='list'>
            <p>Soporte 24/7</p>
            <p>Analisis de datos avanzado</p>
            <p>Gráficas</p>
            <p>Seguro contra daños</p>
          </div>
          <a href='#' className='btn'>Elige un plan</a>
        </div>

        <div className='box'>
          <i className='fas fa-city'></i>
          <h3>ultimate plan</h3>
          <div className='price'><span></span><span></span>$1250/m</div>
          <div className='list'>
            <p>Soporte 24/7</p>
            <p>Analisis de datos avanzado</p>
            <p>Gráficas</p>
            <p>Seguro contra daños</p>
          </div>
          <a href='#' className='btn'>Elige un plan</a>
        </div>

      </div>

</section>

<section className='contact' id='contact'>
  <h1 className='heading'>Contactanos</h1>

  <div className='row'>
  <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.234894634944!2d-93.0907752!3d16.6149763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ed29faf70c283b%3A0xff57a2e3d9c9bd10!2sUniversidad%20Polit%C3%A9cnica%20de%20Chiapas!5e0!3m2!1ses-419!2smx!4v1720415691674!5m2!1ses-419!2smx" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  
  <form action=''>
    <h3>Contactese con nosotros</h3>
    <input type='text' placeholder='nombre' className='box'></input>
    <input type='email' placeholder='correo' className='box'></input>
    <input type='number' placeholder='telefono' className='box'></input>
    <textarea name='' placeholder='mensaje' id='' cols="30" rows="10"></textarea>
    <input type='submit' value="send message" className='btn'></input>
  </form>

  </div>

</section>

<footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">Terra<span>Test</span></h1>
          <p>
            TerraTest es una empresa dedicada a la investigación y análisis de suelos. 
            Nuestro objetivo es proporcionar información precisa y fiable para proyectos 
            de infraestructura, agricultura y gestión ambiental.
          </p>
        </div>

        <div className="footer-section links">
          <h2>Enlaces Rápidos</h2>
          <br />
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/services">Servicios</Link></li>
            <li><Link to="/about">Nosotros</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2>Contacto</h2>
          <br />
          <div className="contact-info">
            <span><i className="fas fa-phone"></i> &nbsp; +123 456 789</span>
            <span><i className="fas fa-envelope"></i> &nbsp; info@terratest.com</span>
            <span><i className="fas fa-map-marker-alt"></i> &nbsp; Calle Falsa 123, Ciudad, País</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2024 TerraTest | Todos los derechos reservados
      </div>
    </footer>


 </div>
  );
}