import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app/page' // Importando o componente principal
import './index.css'; // Se você tiver estilos globais

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
