import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [castles, setCastles] = useState([]);

  useEffect(() => {
    const fetchCastles = async () => {
      try {
        const response = await fetch('http://192.168.0.109:3000/castles'); // Zmień URL na odpowiedni adres API
        const data = await response.json();
        setCastles(data);
      } catch (error) {
        console.error('Błąd pobierania zamków:', error);
      }
    };

    fetchCastles();
  }, []);

  const handleCastlePress = (castle) => {
    // Tutaj możesz dodać nawigację do ekranu szczegółów zamku
    // navigation.navigate('CastleDetails', { castle });
    console.log('Wybrano zamek:', castle.castleName);
  };

  const renderCastleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.castleItem}
      onPress={() => handleCastlePress(item)}
    >
      <Image
        source={{ uri: item.castleImages[0] }} // Zakładam, że obrazy zamka są dostępne w tablicy "castleImages"
        style={styles.castleImage}
      />
      <Text style={styles.castleName}>{item.castleName}</Text>
      <Text style={styles.castleDescription}>{item.castleDescription}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Zamki</Text>
      <FlatList
        data={castles}
        keyExtractor={(item) => item._id}
        renderItem={renderCastleItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  castleItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
  },
  castleImage: {
    width: '100%', // Możesz dostosować szerokość obrazu do swoich potrzeb
    height: 200, // Możesz dostosować wysokość obrazu do swoich potrzeb
  },
  castleName: {
    fontSize: 18,
  },
  castleDescription: {
    color: 'gray',
  },
});

export default HomeScreen;