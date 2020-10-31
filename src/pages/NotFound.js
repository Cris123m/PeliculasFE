import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <p>Oops esta página no existe:</p>
      <Link to="/">Ir a Inicio</Link>
    </div>
  );
}
