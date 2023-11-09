import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { castle } = route.params;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Pobieranie komentarzy na podstawie ID zamku
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://192.168.0.103:3000/comments/getByCastle/${castle._id}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Błąd pobierania komentarzy:', error);
      }
    };

    fetchComments();
  }, [castle.id]);

  const openGoogleMaps = () => {
    const { castleLocation } = castle;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${castleLocation}`;
    Linking.openURL(googleMapsUrl);
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

      {/* Wyświetlanie komentarzy */}
      <Text style={styles.heading}>Komentarze:</Text>
{Array.isArray(comments) && comments.map((comment, index) => (
  <Text key={index}>{comment.text}</Text>
))}

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
});

export default DetailScreen;
