import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAuth } from './AuthContext'; // Zaimportuj kontekst autoryzacji

function AuthScreen({ navigation }) {
  const { state, dispatch } = useAuth();

  const handleLogin = () => {
    // Tu możesz dodać logikę logowania
    dispatch({ type: 'LOGIN' });
  };

  const handleLogout = () => {
    // Tu możesz dodać logikę wylogowywania
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <View>
      {state.isLoggedIn ? (
        <Button title="Wyloguj" onPress={handleLogout} />
      ) : (
        <>
          <Button title="Zaloguj" onPress={handleLogin} />
          <Button title="Zarejestruj" onPress={() => navigation.navigate('Register')} />
        </>
      )}
    </View>
  );
}

export default AuthScreen;