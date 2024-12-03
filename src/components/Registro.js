import React, { useState } from 'react';
import '../assets/styles/Registro.css';
import registroimg from '../assets/images/Registro.jpg';

function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number_contact: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Registro exitoso!');
        setError('');
        console.log('Registro exitoso:', data);
      } else {
        const errorText = await response.text();
        setError('Error al registrar usuario: ' + errorText);
        setSuccess('');
        console.error('Error al registrar usuario:', errorText);
      }
    } catch (err) {
      setError('Error al registrar usuario');
      setSuccess('');
      console.error('Error al registrar usuario:', err);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-image">
        <img src={registroimg} alt="Registro" />
      </div>
      <div className="registro-form-container">
        <h1>Bienvenido, por favor regístrese</h1>
        <form className="registro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="number_contact">Teléfono</label>
            <input type="tel" id="number_contact" name="number_contact" value={formData.number_contact} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-submit">Registrarse</button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default Registro;
