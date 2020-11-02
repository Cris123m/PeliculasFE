import React from 'react';
import { Link } from 'react-router-dom';

//Página en el caso de entrar a una ruta no encontrada
export default function NotFound() {
  return (
    <div>
      <p>Oops esta página no existe:</p>
      <Link to="/">Ir a Inicio</Link>
    </div>
  );
}
