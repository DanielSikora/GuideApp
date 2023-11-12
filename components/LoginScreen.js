import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

const LoginScreen = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Pobierz e-mail z pola tekstowego
      console.log('Wprowadzony Email:', email);

      const response = await fetch('http://192.168.0.110:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Odpowiedź od serwera:', data);

        const userId = data.userId;
        const userEmail = email;

        console.log('UserId:', userId);
        console.log('UserEmail:', userEmail);

        // Zapisz identyfikator użytkownika, adres e-mail i zaloguj
        dispatch({ type: 'LOGIN', payload: { userId, userEmail } });
      
        console.log('Zalogowano pomyślnie. Identyfikator użytkownika:', userEmail);
        navigation.navigate('HomeScreen', { userEmail });
      } else {
        console.log('Błąd logowania');
      }
      
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  const handleRegister = () => {
    // Przekieruj użytkownika do ekranu rejestracji
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Logowanie</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Zaloguj się" onPress={handleLogin} />
      <Button title="Zarejestruj się" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;