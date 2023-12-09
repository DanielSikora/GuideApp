import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/RegisterScreenStyles';
import Toast from 'react-native-toast-message';

console.warn = () => {};
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        Alert.alert('Błąd', 'Niepoprawny adres email.');
        return;
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordPattern.test(password)) {
        Alert.alert('Błąd', 'Hasło musi mieć co najmniej 6 znaków, zawierać co najmniej jedną dużą literę, jedną cyfrę i jeden znak specjalny');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Błąd', 'Potwierdzenie hasła nie pasuje do wprowadzonego hasła');
        return;
      }

      const response = await fetch('http://192.168.0.104:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Rejestracja zakończona pomyślnie.');
        navigation.navigate('LoginScreen');
      } else {
        const data = await response.json();
        if (response.status === 400 && data.message === 'Użytkownik o podanym adresie email już istnieje') {
          Alert.alert('Błąd', 'Użytkownik o podanym adresie email już istnieje.');
        } else {
          console.error('Błąd rejestracji:', data.message);
        }
      }
    } catch (error) {
      console.error('Błąd rejestracji:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rejestracja</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Potwierdź hasło"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default RegisterScreen;
