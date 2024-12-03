import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import dash from '../assets/images/dash.jpg';
import '../assets/styles/Clientes.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      const id_user = localStorage.getItem('id_user')
      try {
        const response = await fetch(`http://localhost:3000/clients/${id_user}`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setClientes(data);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Error fetching clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/detalle/${id}`);
  };

  const handleAccountClick = () => {
    Swal.fire({
      title: '¿DESEAS CERRAR SESIÓN?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        Swal.fire('Sesión cerrada', '', 'success').then(() => {
          navigate('/login'); // Navegar a la página de inicio de sesión
        });
      }
    });
  };

  if (loading) {
    return <p>Cargando clientes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='clientes-container'>
      <nav>
        <div className='logo-name'>
          <div className='logo-image'>
            <img src={dash} alt="logo" />
          </div>
          <span className='logo_name'>TerraTest</span>
        </div>
        <div className='menu-items'>
          <ul className='nav-links'>
            <li>
              <Link to="/">
                <i className="fa-solid fa-house"></i>
                <span className='link-name'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/clientes">
                <i className="fa-solid fa-users"></i>
                <span className='link-name'>Clientes</span>
              </Link>
            </li>
            <li>
              <Link to="/analisis">
                <i className="fa-solid fa-chart-bar"></i>
                <span className='link-name'>Análisis</span>
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handleAccountClick}>
                <i className="fa-regular fa-user"></i>
                <span className='link-name'>Cuenta</span>
              </Link>
            </li>
          </ul>
          <ul className='logout-mode'>
            <li className='mode'>
              <Link to="#">
                <i className="fa-regular fa-moon"></i>
                <span className='link-name'>Modo Oscuro</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className='main-contentdos'>
        <h1 className='title'>Clientes</h1>
        <div className='cards-containerdos'>
          {clientes.length === 0 ? (
            <p>No hay clientes disponibles</p>
          ) : (
            clientes.map((cliente, index) => (
              <div key={index} className='cardos' onClick={() => handleCardClick(cliente.id)}>
                <h2>{cliente.name}</h2>
                <p>Contacto: {cliente.number_contact}</p>
                <p>Ubicación: {cliente.locate}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
