import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../components/Screens/LoginScreen';
import { AuthContext, AuthProvider } from '../components/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

describe('Testy ekranu logowania.', () => {
  it('Renderuje pole wpisywania email.', () => {
    const { getByTestId } = render(<AuthProvider><NavigationContainer><LoginScreen /></NavigationContainer></AuthProvider>);

    const emailInput = getByTestId('emailInput');

    expect(emailInput).toBeTruthy();
  });
  it('Renderuje pole wpisywania hasła.', () => {
    const { getByTestId } = render(<AuthProvider><NavigationContainer><LoginScreen /></NavigationContainer></AuthProvider>);
    
    const passwordInput = getByTestId('passwordInput');
    
    expect(passwordInput).toBeTruthy();
    
  });
  it('Renderuje przycisk logowania.', () => {
    const { getByTestId } = render(<AuthProvider><NavigationContainer><LoginScreen /></NavigationContainer></AuthProvider>);
    
    const loginButton = getByTestId('loginButton');
    
    expect(loginButton).toBeTruthy();
    
  });
  it('Renderuje przycisk przenoszenia do rejestracji.', () => {
    const { getByTestId } = render(<AuthProvider><NavigationContainer><LoginScreen /></NavigationContainer></AuthProvider>);

    const registerButton = getByTestId('registerButton');

    expect(registerButton).toBeTruthy();
  });
  it('Aktualizuje wartość w polu loginu prawidłowo.', () => {
    const { getByTestId } = render(<AuthProvider><NavigationContainer><LoginScreen /></NavigationContainer></AuthProvider>);
    const emailInput = getByTestId('emailInput');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    
    expect(emailInput.props.value).toBe('test@example.com');
    
  });
  it('Aktualizuje wartość w polu hasła prawidłowo.', () => {
    const { getByTestId } = render(<AuthProvider><NavigationContainer><LoginScreen /></NavigationContainer></AuthProvider>);
    
    const passwordInput = getByTestId('passwordInput');

    fireEvent.changeText(passwordInput, 'password123');
    
    expect(passwordInput.props.value).toBe('password123');
  });
  it('Aktualizuje wartość w polu loginu prawidłowo.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </AuthProvider>
    );
    const emailInput = getByTestId('emailInput');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });
  it('Aktualizuje wartość w polu hasła prawidłowo.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const passwordInput = getByTestId('passwordInput');

    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  
 
});
