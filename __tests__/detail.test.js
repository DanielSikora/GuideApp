import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import DetailScreen from '../components/Screens/DetailScreen';
import { AuthContext, AuthProvider } from '../components/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

describe('Testy ekranu szczegółów.', () => {
  const mockRouteParams = {
    params: {
      castle: {
        _id: '1',
        castleName: 'Castle A',
        castleDescription: 'Description for Castle A',
        castleImages: ['https://example.com/castleA.jpg'],
        castleLocation: 'Castle Location',
        imageAuthor: 'Author Name',
      },
      userEmail: 'test@example.com',
    },
  };

  it('Renderuje nazwę zamku.', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <DetailScreen route={mockRouteParams} />
        </NavigationContainer>
      </AuthProvider>
    );
    await act(async () => {
    const castleName = getByTestId('castleName');

    expect(castleName).toBeTruthy();
    expect(castleName.props.children).toBe('Castle A');
  });
});
  it('Renderuje opis zamku.', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <DetailScreen route={mockRouteParams} />
        </NavigationContainer>
      </AuthProvider>
    );
await act(async () => {
    const castleDescription = getByTestId('castleDescription');

    expect(castleDescription).toBeTruthy();
    expect(castleDescription.props.children).toBe('Description for Castle A');
  });
});
  



  it('Renderuje sekcję komentarzy.', async () => {
    
    const { getByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <DetailScreen route={mockRouteParams} />
        </NavigationContainer>
      </AuthProvider>
    );
    await act(async () => {
    const commentsSection = getByTestId('comments');

    expect(commentsSection).toBeTruthy();
  });
});
 
});
