import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { View, Text, TextInput, Alert,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import styles from './Styles/LoginScreenStyles';
 
console.warn = () => {};
const LoginScreen = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();



  const handleLogin = async () => {
    try {
      console.log('Wprowadzony Email:', email);

      const response = await fetch('http://192.168.0.112:3000/users/login', {
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

        dispatch({ type: 'LOGIN', payload: { userId, userEmail } });

        console.log('Zalogowano pomyślnie. Identyfikator użytkownika:', userEmail);
        navigation.navigate('HomeScreen', { userEmail });

        
      } else {
        const errorData = await response.json();
        Alert.alert('Błąd', 'Nieprawidłowy email lub hasło.');
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      Alert.alert('Błąd', 'Nieprawidłowy email lub hasło.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container} testID="loginScreen">
    <Text style={styles.heading}>Logowanie</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      testID="emailInput"
    />
    <TextInput
      style={styles.input}
      placeholder="Hasło"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      testID="passwordInput"
    />
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogin}
      testID="loginButton"
    >
      <Text style={styles.buttonText}>Zaloguj się</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={handleRegister}
      testID="registerButton"
    >
      <Text style={styles.buttonText}>Zarejestruj się</Text>
    </TouchableOpacity>
  </View>
  );
};

export default LoginScreen;