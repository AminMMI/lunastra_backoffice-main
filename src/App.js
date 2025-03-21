import React, { useState, useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import Tableau from './components/TableauExpo.jsx'; 
import StatsResa from './components/StatsResa.jsx';
import Graph from './components/Graph.jsx';
import './App.css';

function App() {
  const { user, login, logout } = useContext(AuthContext);  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div>
      <title>Backoffice - Lunastra</title>
      {!user ? (
        <div class="formulaire">
          <img src="/logo.svg" alt="Logo Lunastra" height={100} width={100} />
          <form onSubmit={handleLogin}>
            <div>
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Se connecter</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Bienvenue, {user.username} !</h2>
          <StatsResa/>
      <Tableau />
      <Graph/>
          <button class="button_logout" onClick={logout}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}

export default App;
