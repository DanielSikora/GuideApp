import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DetailScreen from '../components/Screens/DetailScreen';


// Mockujemy moduły, które używamy w komponencie
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));
jest.mock('../components/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isAuthenticated: true, user: {} })),
}));

// Mockujemy fetch, ponieważ nie chcemy rzeczywistych żądań sieciowych podczas testów
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);

describe('<DetailScreen />', () => {
  test('renders correctly', () => {
    const route = { params: { castle: {} } };
    const { getByText, getByPlaceholderText } = render(<DetailScreen route={route} />);
    
    expect(getByText('Komentarze:')).toBeTruthy();
    expect(getByPlaceholderText('Nowy komentarz')).toBeTruthy();
  });

  test('adds a comment when button is pressed', async () => {
    const route = { params: { castle: { _id: '123', castleLocation: 'Castle Location' } } };
    const { getByPlaceholderText, getByText } = render(<DetailScreen route={route} />);
    const input = getByPlaceholderText('Nowy komentarz');
    
    // Simulacja wpisania komentarza i naciśnięcia przycisku
    fireEvent.changeText(input, 'Testowy komentarz');
    fireEvent.press(getByText('Dodaj komentarz'));

    // Oczekiwanie na asynchroniczną operację
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4)); // Sprawdzamy, czy wywołano fetch dwa razy

    
    
  });
  test('displays castle location', () => {
    const route = {
      params: {
        castle: {
          castleLocation: 'Castle Location Test', // Dodaj przykładową lokalizację
        },
      },
    };
    const { getByText } = render(<DetailScreen route={route} />);
    
    // Sprawdź, czy lokalizacja zamku jest wyświetlana
    const locationText = getByText('Lokalizacja: Castle Location Test');
  
    expect(locationText).toBeTruthy();
  });
  test('opens castle location in Google Maps', () => {
    const route = {
      params: {
        castle: {
          castleLocation: 'Castle Location', // Przykładowa lokalizacja zamku
        },
      },
    };
    const { getByText } = render(<DetailScreen route={route} />);
    
    // Symulacja naciśnięcia przycisku "Otwórz w Mapach Google"
    fireEvent.press(getByText('Otwórz w Mapach Google'));
  
    // Tutaj możesz oczekiwać na otwarcie linku lub uruchomienie akcji otwierającej Mapy Google
    // Niektóre funkcje związane z nawigacją mogą być trudne do przetestowania w izolacji
  });
  
  

  // Dodaj więcej testów w zależności od potrzeb i przypadków użycia
});
