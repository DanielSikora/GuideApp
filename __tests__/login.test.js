import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import LoginScreen from '../components/Screens/LoginScreen';
import { AuthContext } from '../components/AuthContext';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

jest.mock('../components/AuthContext', () => ({
  useAuth: jest.fn(() => ({ dispatch: jest.fn() })),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);

describe('<LoginScreen />', () => {
  test('updates email value on change', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Email');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  test('logs in with correct credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Hasło');
    const loginButton = getByText('Zaloguj się');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    // Oczekiwanie na pomyślne zalogowanie (tu możesz oczekiwać na zmianę ekranu, wyświetlenie komunikatu itp.)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    expect(global.fetch).toHaveBeenCalledWith('http://192.168.0.108:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });
    expect(global.fetch.mock.calls[0][0]).toBe('http://192.168.0.108:3000/users/login');

    // Tutaj możesz również dodać asercje dotyczące zachowania po zalogowaniu
    expect(global.fetch.mock.calls[0][0]).toBe('http://192.168.0.108:3000/users/login');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][1].body).toBe(JSON.stringify({ email: 'test@example.com', password: 'password123' }));
  });

  test('navigates to registration screen', () => {
    const { getByText } = render(<LoginScreen />);
    const registerButton = getByText('Zarejestruj się');

    fireEvent.press(registerButton);

    // Tutaj możesz sprawdzić, czy ekran rejestracji jest wyświetlony lub czy nawigacja została wykonana
    // Możesz oczekiwać na odpowiednie zmiany w UI lub przełączenie ekranu
    expect(registerButton).toBeDefined();
  });
});
