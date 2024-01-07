import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../components/Screens/RegisterScreen';
import { AuthContext, AuthProvider } from '../components/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

describe('Testy ekranu rejestracji.', () => {
  it('Renderuje pole wpisywania email.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const emailInput = getByTestId('emailInput');

    expect(emailInput).toBeTruthy();
  });

  it('Renderuje pole wpisywania hasła.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const passwordInput = getByTestId('passwordInput1'); // passwordInput1 jako testID

    expect(passwordInput).toBeTruthy();
  });

  it('Renderuje pole potwierdzenia hasła.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const confirmPasswordInput = getByTestId('passwordInput2'); // passwordInput2 jako testID

    expect(confirmPasswordInput).toBeTruthy();
  });

  it('Renderuje przycisk rejestracji.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const registerButton = getByTestId('registerButton');

    expect(registerButton).toBeTruthy();
  });

  it('Renderuje przycisk przenoszenia do logowania.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const loginButton = getByTestId('loginButton');

    expect(loginButton).toBeTruthy();
  });

  it('Aktualizuje wartość w polu email.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );
    const emailInput = getByTestId('emailInput');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('Aktualizuje wartość w polu hasła.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const passwordInput = getByTestId('passwordInput1');

    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  it('Aktualizuje wartość w polu potwierdzenia hasła.', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      </AuthProvider>
    );

    const confirmPasswordInput = getByTestId('passwordInput2');

    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(confirmPasswordInput.props.value).toBe('password123');
  });
});
