import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Opcional: Para resetar o CSS padrão do navegador
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);