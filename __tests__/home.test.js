import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import HomeScreen from '../components/Screens/HomeScreen';

// Mock data for testing
const mockCastles = [
  {
    _id: '1',
    castleName: 'Castle A',
    castleDescription: 'Description for Castle A',
    castleImages: ['https://example.com/castleA.jpg'],
  },
  {
    _id: '2',
    castleName: 'Castle B',
    castleDescription: 'Description for Castle B',
    castleImages: ['https://example.com/castleB.jpg'],
  },
];



global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCastles),
  })
);

describe('Testy ekranu głównego', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renderuje pole wyszukiwania prawidłowo.', async () => {
    
    const { getByTestId, queryByTestId, findByText } = render(<HomeScreen />);
    await act(async () => {
    act(() => {
    expect(getByTestId('searchInput')).toBeTruthy();

});
    
  });
});
it('Renderuje przycisk losowania zamku prawidłowo.', async () => {
    
    const { getByTestId, queryByTestId, findByText } = render(<HomeScreen />);
    await act(async () => {
    act(() => {
    
    expect(getByTestId('randomCastleButton')).toBeTruthy();
});
  });
});
it('Renderuje pole wyszukiwania prawidłowo.', async () => {
    
    const { getByTestId, queryByTestId, findByText } = render(<HomeScreen />);
    await act(async () => {
    act(() => {
    expect(getByTestId('searchInput')).toBeTruthy();
    expect(getByTestId('randomCastleButton')).toBeTruthy();
});
    await findByText('Castle A');
    expect(getByTestId('castleList')).toBeTruthy();
    expect(getByTestId('castleItem-0')).toBeTruthy();
    expect(queryByTestId('castleItem-2')).toBeNull(); 
  });
});
it('Renderuje listę zamków.', async () => {
    
    const { getByTestId, queryByTestId, findByText } = render(<HomeScreen />);
    await act(async () => {
    await findByText('Castle A');
    expect(getByTestId('castleList')).toBeTruthy(); 
  });
});
it('Renderuje kafelek zamku.', async () => {
    
    const { getByTestId, queryByTestId, findByText } = render(<HomeScreen />);
    await act(async () => {
    await findByText('Castle A');
    expect(getByTestId('castleItem-0')).toBeTruthy();
  });
});
  it('Filtruje zamki po nazwie.', async () => {
    const { getByTestId, queryByTestId, findByText } = render(<HomeScreen />);
    await act(async () => {
    const searchInput = getByTestId('searchInput');
  
    act(() => {
        fireEvent.changeText(searchInput, 'Castle A');
    });
    await findByText('Castle A');
    expect(getByTestId('castleList')).toBeTruthy();
    expect(getByTestId('castleItem-0')).toBeTruthy();
    expect(queryByTestId('castleItem-1')).toBeNull(); // Expecting only one castle to be rendered after filtering
  });});
  it('Wyświetla zamki po filtrowaniu.', async () => {
    const { getByTestId, findByText } = render(<HomeScreen />);
    await act(async () => {
    const searchInput = getByTestId('searchInput');
    act(() => {
    fireEvent.changeText(searchInput, 'Castle A');
    });
    await findByText('Castle A');
    expect(getByTestId('castleList')).toBeTruthy();
    expect(getByTestId('castleItem-0')).toBeTruthy();
    
  });});
  it('Wyświetla wszystkie zamki gdy pole wyszukiwania jest puste.', async () => {
    const { getByTestId, findAllByTestId } = render(<HomeScreen />);
    await act(async () => {
    const searchInput = getByTestId('searchInput');
    act(() => {
    fireEvent.changeText(searchInput, '');
    });
    const castleItems = await findAllByTestId(/^castleItem-/);
    expect(castleItems.length).toBe(mockCastles.length);
  });});
  it('Nic nie jest wyświetlane gdy w polu jest nieznana nazwa.', async () => {
    const { getByTestId, queryByTestId } = render(<HomeScreen />);
    await act(async () => {
    const searchInput = getByTestId('searchInput');
    act(() => {
    fireEvent.changeText(searchInput, 'Non-existent Castle');
});
    const castleItem = queryByTestId('castleItem-0');
    expect(castleItem).toBeNull();
  });});
  it('Lista zamków jest pusta przed pobraniem.', async () => {
    const { getByTestId } = render(<HomeScreen />);
    await act(async () => {
    const castleList = getByTestId('castleList');
  
    expect(castleList.props.data.length).toBe(0);
  });});
  
 
});
