import React, { createContext, useContext, useReducer } from 'react';

// Inicjalny stan kontekstu
const initialState = {
  isLoggedIn: false,
};

// Akcje
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true };
    case 'LOGOUT':
      return { isLoggedIn: false };
    default:
      return state;
  }
};

// Kontekst autoryzacji
const AuthContext = createContext();

// Provider autoryzacji
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook do uzyskiwania dostępu do kontekstu autoryzacji
export function useAuth() {
  return useContext(AuthContext);
}
