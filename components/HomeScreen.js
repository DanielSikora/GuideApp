import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';

const HomeScreen = ({ navigation, route }) => {
  const [castles, setCastles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userEmail = route.params?.userEmail || 'Brak danych';
 

  useEffect(() => {
    const fetchCastles = async () => {
      try {
        const response = await fetch('http://192.168.0.105:3000/castles');
        const data = await response.json();
        setCastles(data);
      } catch (error) {
        console.error('Błąd pobierania zamków:', error);
      }
    };

    fetchCastles();
  }, []);

  const handleCastlePress = (castle) => {
    navigation.navigate('DetailScreen', { castle, userEmail });
    console.log('Wybrano zamek:', castle.castleName);
  };

  const renderCastleItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleCastlePress(item)}>
      <View style={styles.castleItem}>
        <Image source={{ uri: item.castleImages[0] }} style={styles.castleImage} />
        <Text style={styles.castleName}>{item.castleName}</Text>
        <Text style={styles.castleDescription}>{item.castleDescription}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const filterCastles = () => {
    return castles.filter((castle) =>
      castle.castleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleRandomCastle = () => {
    const randomIndex = Math.floor(Math.random() * castles.length);
    const randomCastle = castles[randomIndex];
    handleCastlePress(randomCastle);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Wyszukaj zamek..." 
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity onPress={handleRandomCastle}>
      <Text style={styles.randomCastleButton}>Losowy zamek</Text>
    </TouchableOpacity>
      <FlatList
        data={filterCastles()}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
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
    width: '100%',
    height: 200,
  },
  castleName: {
    fontSize: 18,
  },
  castleDescription: {
    color: 'gray',
  },
  castleItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    borderRadius: 10, // Add border radius for a rounded look
    overflow: 'hidden', // Ensure the border radius is respected
  },
  randomCastleButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default HomeScreen;
