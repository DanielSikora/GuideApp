import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native';
import styles from './Styles/HomeScreenStyles';

const HomeScreen = ({ navigation, route }) => {
  const [castles, setCastles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userEmail = route?.params?.userEmail || 'Brak danych';

  useEffect(() => {
    const fetchCastles = async () => {
      try {
        const response = await fetch('http://192.168.0.112:3000/castles');
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

  const renderCastleItem = ({ item, index }) => {
    const limitedDescription = item.castleDescription.substring(0, 50);

    return (
      <TouchableWithoutFeedback testID={`castleItem-${index}`} onPress={() => handleCastlePress(item)}>
        <View style={styles.castleItem}>
          <Image testID="image" source={{ uri: item.castleImages[0] }} style={styles.castleImage} />
          <Text testID="castleName" style={styles.castleName}>{item.castleName}</Text>
          <Text testID="description" style={styles.castleDescription}>{limitedDescription}...</Text>
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
          testID="searchInput"
          style={styles.searchInput}
          placeholder="Wyszukaj zamek..."
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity testID="randomCastleButton" onPress={handleRandomCastle}>
          <Text style={styles.randomCastleButton}>Losowy zamek</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        testID="castleList"
        data={filterCastles()}
        keyExtractor={(item) => item._id}
        renderItem={renderCastleItem}
      />
    </View>
  );
};

export default HomeScreen;
