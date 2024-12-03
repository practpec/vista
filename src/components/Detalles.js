import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/styles/Analisis.css';
import '../assets/styles/Detalle.css';

export default function Detalles() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [analisis, setAnalisis] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:3000/clients/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setCliente(data))
      .catch(error => console.error('Error fetching client details:', error));
  }, [id, token]);

  useEffect(() => {
    fetch(`http://localhost:3000/clients/analysis/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setAnalisis(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching client analysis:', error));
  }, [id, token]);

  const handleDelete = async (analisisId) => {
    try {
      const response = await fetch(`http://localhost:3000/analysis/${analisisId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`
        }
      });

      if (response.ok) {
        setAnalisis(prevAnalisis => prevAnalisis.filter(analisis => analisis.id !== analisisId));
        console.log('Análisis eliminado correctamente');
      } else {
        const errorText = await response.text();
        console.error('Error eliminando análisis:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error eliminando análisis:', error);
    }
  };

  if (!cliente) {
    return <p>Cargando detalles del cliente...</p>;
  }

  return (
    <div className="detalle-container">
      <h1>Detalle del Cliente</h1>
      <h2>{cliente.name}</h2>
      <p><span>Contacto:</span> {cliente.number_contact}</p>
      <p><span>Ubicación:</span> {cliente.locate}</p>

      <h2>Análisis del Cliente</h2>
      <div className="cards-container">
        {analisis.length === 0 ? (
          <p>No hay análisis disponibles para este cliente.</p>
        ) : (
          analisis.map((analisisItem, index) => (
            <div key={index} className="card">
              <h3>{analisisItem.name}</h3>
              <p><span>Contenido:</span> {analisisItem.content}</p>
              <p><span>Ubicación:</span> {analisisItem.locate}</p>
              {analisisItem.zones && analisisItem.zones.length > 0 && (
                <div className="zones">
                  <h4>Zonas:</h4>
                  {analisisItem.zones.map((zone, zIndex) => (
                    <div key={zIndex} className="zone">
                      <p><strong>Indicaciones:</strong> {zone.indications}</p>
                      <p><strong>Profundidad:</strong> {zone.depth}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="card-buttons">
                <button className="remove-card-button" onClick={() => handleDelete(analisisItem.id)}>Eliminar</button>
                <Link to={`/resultados/${analisisItem.id}`} className="result-analysis-button">Resultado de Análisis</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
