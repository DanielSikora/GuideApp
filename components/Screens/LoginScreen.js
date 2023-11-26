import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import styles from './Styles/LoginScreenStyles';

const LoginScreen = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
};


export default LoginScreen;