import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../assets/styles/Analisis.css';
import dash from '../assets/images/dash.jpg';

export default function Analisis() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnalysis, setNewAnalysis] = useState({
    client: {
      name: '',
      number_contact: '',
      locate: ''
    },
    name: '',
    content: '',
    locate: '',
    zones: []
  });
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const id_user = localStorage.getItem('id_user')

  const handleToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`http://localhost:3000/analysis/${id_user}`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAnalysis();
  }, [token]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('client.')) {
      const clientField = name.split('.')[1];
      setNewAnalysis(prevState => ({
        ...prevState,
        client: {
          ...prevState.client,
          [clientField]: value
        }
      }));
    } else {
      setNewAnalysis(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleZoneChange = (index, e) => {
    const { name, value } = e.target;
    setNewAnalysis(prevState => {
      const newZones = [...prevState.zones];
      newZones[index] = {
        ...newZones[index],
        [name]: name === 'depth' ? parseFloat(value) : value
      };
      return { ...prevState, zones: newZones };
    });
  };

  const addZone = () => {
    setNewAnalysis(prevState => ({
      ...prevState,
      zones: [...prevState.zones, { indications: '', depth: 0 }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAnalysisWithUser = {
        ...newAnalysis,
        id_user: id_user 
      };
      const response = await fetch('http://localhost:3000/analysis', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnalysisWithUser)
      });

      if (response.ok) {
        const createdAnalysis = await response.json();
        setCards(prevCards => [...prevCards, createdAnalysis.analysis]);
        setNewAnalysis({
          client: {
            name: '',
            number_contact: '',
            locate: ''
          },
          name: '',
          content: '',
          locate: '',
          zones: []
        });
        handleCloseModal();
      } else {
        const errorText = await response.text();
        console.error('Error creating analysis:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error creating analysis:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/analysis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`
        }
      });

      if (response.ok) {
        setCards(prevCards => prevCards.filter(card => card.id !== id));
        console.log('Análisis eliminado correctamente');
      } else {
        const errorText = await response.text();
        console.error('Error eliminando análisis:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error eliminando análisis:', error);
    }
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

  useEffect(() => {
    const modeToggle = document.querySelector(".mode");
    if (modeToggle) {
      modeToggle.addEventListener("click", handleToggle);
    }

    return () => {
      if (modeToggle) {
        modeToggle.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  return (
    <div className={`analisis-container ${isDarkMode ? 'dark' : ''}`}>
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
                <span className='link-name'>Landing</span>
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
      <div className='main-content'>
        <div className='welcome-title'>
          <h2>Bienvenido a TerraTest</h2>
          <p>Explora tus análisis y datos de manera intuitiva.</p>
          <button className='add-card-button' onClick={handleOpenModal}>Agregar nuevo análisis</button>
          <div className='cards-container'>
            {cards.map((card, index) => (
              <div className='card' key={index}>
                <h3>{card.name}</h3>
                <p>{card.content}</p>
                <p><strong>Ubicación del Análisis:</strong> {card.locate}</p>
                {card.zones && card.zones.length > 0 && (
                  <div className='zones'>
                    <h4>Zonas:</h4>
                    {card.zones.map((zone, zIndex) => (
                      <div key={zIndex} className='zone'>
                        <p><strong>Indicaciones:</strong> {zone.indications}</p>
                        <p><strong>Profundidad:</strong> {zone.depth}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className='card-buttons'>
                  <button className='remove-card-button' onClick={() => handleDelete(card.id)}>Eliminar</button>
                  <Link to={`/resultados/${card.id}`} className='result-analysis-button'>Resultado de Análisis</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close-button' onClick={handleCloseModal}>&times;</span>
            <h2>Añadir Análisis</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nombre del Cliente:
                <input
                  type='text'
                  name='client.name'
                  value={newAnalysis.client.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Número de Teléfono del Cliente:
                <input
                  type='tel'
                  name='client.number_contact'
                  value={newAnalysis.client.number_contact}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Ubicación del Cliente:
                <input
                  type='text'
                  name='client.locate'
                  value={newAnalysis.client.locate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Nombre del Análisis:
                <input
                  type='text'
                  name='name'
                  value={newAnalysis.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Contenido del Análisis:
                <textarea
                  name='content'
                  value={newAnalysis.content}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
              <label>
                Ubicación del Análisis:
                <input
                  type='text'
                  name='locate'
                  value={newAnalysis.locate}
                  onChange={handleChange}
                  required
                />
              </label>
              {newAnalysis.zones.map((zone, index) => (
                <div key={index} className='zone-section'>
                  <h4>Zona {index + 1}</h4>
                  <label>
                    Indicaciones:
                    <input
                      type='text'
                      name='indications'
                      value={zone.indications}
                      onChange={(e) => handleZoneChange(index, e)}
                      required
                    />
                  </label>
                  <label>
                    Profundidad:
                    <input
                      type='text'
                      name='depth'
                      value={zone.depth}
                      onChange={(e) => handleZoneChange(index, e)}
                      required
                    />
                  </label>
                </div>
              ))}
              <button type='button' onClick={addZone}>Añadir Zona</button>
              <button type='submit'>Añadir</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
