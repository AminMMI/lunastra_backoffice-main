import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/AuthContext.jsx'; // Importer AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Si tu veux commencer à mesurer la performance de ton app, passe une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoie-les vers un point d'analyse. En savoir plus : https://bit.ly/CRA-vitals
reportWebVitals();
