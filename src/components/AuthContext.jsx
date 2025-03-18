import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        
        if (decoded.exp * 1000 < Date.now()) {
          setToken('');
          localStorage.removeItem('token');
        } else {
          setUser(decoded); 
        }
      } catch (error) {
        console.error('Erreur de décodage du token JWT:', error);
        setToken('');
        localStorage.removeItem('token');
      }
    }
  }, [token]);
  

  const login = async (username, password) => {
    const response = await fetch('http://api.lunastra.ghmir.butmmi.o2switch.site/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.status === 'success') {
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } else {
      alert('Identifiants incorrects');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export const useAuth = () => React.useContext(AuthContext);
