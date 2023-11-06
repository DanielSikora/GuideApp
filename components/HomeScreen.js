import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [castles, setCastles] = useState([]);

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
    
    navigation.navigate('DetailScreen', { castle });
    console.log('Wybrano zamek:', castle.castleName);
  };

  const renderCastleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.castleItem}
      onPress={() => handleCastlePress(item)}
    >
      <Image
        source={{ uri: item.castleImages[0] }} 
        style={styles.castleImage}
      />
      <Text style={styles.castleName}>{item.castleName}</Text>
      <Text style={styles.castleDescription}>{item.castleDescription}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
    width: '100%', 
    height: 200, 
  },
  castleName: {
    fontSize: 18,
  },
  castleDescription: {
    color: 'gray',
  },
});

export default HomeScreen;