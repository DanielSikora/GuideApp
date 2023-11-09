// AuthContext.js
import React, { createContext, useContext, useReducer, useState } from 'react';

// Kontekst oparty na useState
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Reducer do zarządzania stanem autentykacji
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return { ...prevState, isLoggedIn: action.payload.isLoggedIn, userId: action.payload.userId };
      case 'LOGOUT':
        return { ...prevState, isLoggedIn: false, userId: null };
      default:
        return prevState;
    }
  }, {
    isLoggedIn: false,
    userId: null,
  });

  // Funkcja do ustawiania autentykacji, łącząca obie metody
  const setCombinedIsAuthenticated = (isLoggedIn, userId) => {
    setIsAuthenticated(isLoggedIn);
    dispatch({
      type: 'SET_AUTH',
      payload: { isLoggedIn, userId },
    });
  };

  return (
    <AuthContext.Provider value={{ state, setCombinedIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
