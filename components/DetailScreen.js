import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { castle } = route.params;

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
