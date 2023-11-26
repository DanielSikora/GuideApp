import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './Styles/HomeScreenStyles';


const HomeScreen = ({ navigation, route }) => {
  const [castles, setCastles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userEmail = route.params?.userEmail || 'Brak danych';
 

  useEffect(() => {
    const fetchCastles = async () => {
      try {
        const response = await fetch('http://192.168.0.110:3000/castles');
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

  const renderCastleItem = ({ item }) => {
    const limitedDescription = item.castleDescription.substring(0, 50);
  
    return (
      <TouchableWithoutFeedback onPress={() => handleCastlePress(item)}>
        <View style={styles.castleItem}>
          <Image source={{ uri: item.castleImages[0] }} style={styles.castleImage} />
          <Text style={styles.castleName}>{item.castleName}</Text>
          <Text style={styles.castleDescription}>{limitedDescription}...</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Wyszukaj zamek..."
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={handleRandomCastle}>
          <Text style={styles.randomCastleButton}>Losowy zamek</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterCastles()}
        keyExtractor={(item) => item._id}
        renderItem={renderCastleItem}
      />
    </View>
  );
};


export default HomeScreen;
