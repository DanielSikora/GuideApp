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
    width: 300,
    height: 200,
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
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
});

export default styles;