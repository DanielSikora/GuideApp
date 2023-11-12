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
      default:
        return state;
    }
  };

  const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);


    const login = useCallback(() => {
      dispatch({ type: 'LOGIN' });
    }, []); // Removed dispatch from the dependency array

    const logout = useCallback(() => {
      dispatch({ type: 'LOGOUT' });
    }, []); // Removed dispatch from the dependency array

    const contextValue = {
      state,
      dispatch,
      login,
      logout,
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
