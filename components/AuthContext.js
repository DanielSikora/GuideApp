import React, { createContext, useReducer, useCallback } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        userEmail: null,
      };
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(() => {
    dispatch({ type: 'LOGIN' });
  }, [dispatch]); // Include dispatch in the dependency array

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]); // Include dispatch in the dependency array

  const contextValue = {
    state,
    dispatch,
    login,
    logout,
    isAuthenticated: state.isAuthenticated,
    setIsAuthenticated: (value) => dispatch({ type: 'SET_AUTH', payload: value }),
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
