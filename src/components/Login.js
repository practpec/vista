import React, { useState } from 'react';
import '../assets/styles/Login.css';
import logo from '../assets/images/login.jpg';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('id_user', data.id) 
        console.log('Login exitoso:', data);
        console.log(data);
        navigate('/analisis');
      } else {
        const errorText = await response.text();
        setError('Email o contraseña incorrectos');
        console.error('Error al iniciar sesión:', errorText);
      }
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="login-content">
          <h1 className="title">TERRATEST</h1>
          <h2>BIENVENIDO</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Iniciar Sesión</button>
          </form>
          <div className="register-link">
            <Link to="/registro">¿No tienes una cuenta? <a href="#register">Regístrate</a></Link>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
