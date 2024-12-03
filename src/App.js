import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './components/Principal';
import Login from './components/Login';
import Analisis from './components/Analisis';
import Registro from './components/Registro';
import Resultados from './components/Resultados';
import Clientes from './components/Clientes';
import Ganilli from './components/Ganilli';
import Detalles from './components/Detalles';
import GeneratePdf from './components/GeneratoPdf';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/resultados/:id" element={<Resultados />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/ganilli" element={<Ganilli />} />
        <Route path="/detalle/:id" element={<Detalles />} />
        <Route path="/GeneratePdf" element={<GeneratePdf />} />
      </Routes>
    </BrowserRouter>
  );
}
