import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { castle } = route.params;
  const [comments, setComments] = useState([]);
  const [userEmails, setUserEmails] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://192.168.0.103:3000/comments/getByCastle/${castle._id}`);
        const data = await response.json();
        setComments(data);

        const userIds = data.map((comment) => comment.user._id);
        const usersResponse = await Promise.all(userIds.map((userId) => fetchUser(userId)));
        setUserEmails(usersResponse);
      } catch (error) {
        console.error('Błąd pobierania komentarzy:', error);
      }
    };

    fetchComments();
  }, [castle._id]);

  const openGoogleMaps = () => {
    const { castleLocation } = castle;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${castleLocation}`;
    Linking.openURL(googleMapsUrl);
  };

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`http://192.168.0.103:3000/users/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const userData = await response.json();
      return userData.email || 'Nieznany autor';
    } catch (error) {
      console.error('Błąd pobierania danych użytkownika:', error);
      return 'Nieznany autor';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.castleName}>{castle.castleName}</Text>
      <Text style={styles.heading}>Zdjęcia zamku:</Text>
      {castle.castleImages.map((image, index) => (
        <Image source={{ uri: image }} style={styles.image} key={index} />
      ))}
      <Text style={styles.castleDescription}>{castle.castleDescription}</Text>
      <Text style={styles.location}>Lokalizacja: {castle.castleLocation}</Text>
      <TouchableOpacity onPress={openGoogleMaps}>
        <Text style={styles.openMapsLink}>Otwórz w Mapach Google</Text>
      </TouchableOpacity>

      <View style={styles.commentsContainer}>
        <Text style={styles.heading}>Komentarze:</Text>
        {comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{userEmails[index]}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default DetailScreen;
