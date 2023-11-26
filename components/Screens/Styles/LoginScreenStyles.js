import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
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
  buttonContainer: {
    flexDirection: 'row', // Układ w linii (domyślnie są w kolumnie)
    justifyContent: 'space-between', // Równomiernie rozmieszcza przyciski
    width: '80%',
    marginTop: 20, // Dodatkowy margines na górze przycisków
  },
  button: {
    backgroundColor: 'darkgray', // Zmiana koloru tła przycisków na ciemnoszary
    width: '45%', // Szerokość przycisków
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black', // Zmiana koloru tekstu na biały dla lepszej czytelności
    fontSize: 16,
  },
});

export default styles;
