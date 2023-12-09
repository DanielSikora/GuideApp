import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    padding: 16,
  },
  castleName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  screenBackground: {
    backgroundColor: 'lightgray',
  },
  castleDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    marginBottom: 16,
  },
  openMapsLink: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  heading: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: 360,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentAuthor: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  
  commentsContainer: {
    marginTop: 20,
  },
  commentContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  newCommentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'lightgray', // Zmiana koloru tła
    marginBottom: 16, // Dodatkowy margines na dole
  },
  button: {
    backgroundColor: 'darkgray', // Zmiana koloru tła przycisków na ciemnoszary
    color: 'darkgray',
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
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'black', // Zmiana koloru tekstu na biały dla lepszej czytelności
    fontSize: 16,
  },
});

export default styles;