import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView, StyleSheet, TextInput, Button, Alert, FlatList  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/DetailScreenStyles';
import { useAuth } from '../AuthContext';





const DetailScreen = ({ route }) => {
  const { castle } = route.params;
  const [comments, setComments] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();
  const { isAuthenticated, user } = useAuth();
  const userEmail = route.params?.userEmail || 'Brak danych';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://192.168.0.108:3000/comments/${castle._id}`);
        
        const data = await response.json();
        setComments(data);

        const userIds = data.map((comment) => comment.user);
        const usersResponse = await Promise.all(userIds.map((userId) => fetchUser(userId)));
        setUserEmails(usersResponse);
      } catch (error) {
        console.error('Błąd pobierania komentarzy:', error);
      }
    };

    fetchComments();
  }, [castle._id, comments]);

  

  const openGoogleMaps = () => {
    const { castleLocation } = castle;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${castleLocation}`;
    Linking.openURL(googleMapsUrl);
  };

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`http://192.168.0.108:3000/users/id/${userId}`);
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
  
  const addComment = async (navigation) => {
    try {
        console.log('jest email', userEmail);
        const userResponse = await fetch(`http://192.168.0.108:3000/users/email/${userEmail}`);

        if (!userResponse.ok) {
            throw new Error('Failed to fetch userId2');
        }

        const userData = await userResponse.json();
        const userId2 = userData._id;
        console.log('jest id', userId2);

        
        const response = await fetch(`http://192.168.0.108:3000/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newComment, castle: castle._id, user: userId2 }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    

    setComments([...comments, responseData]);
    setNewComment('');  
    
    Alert.alert('Komentarz dodany', 'Twój komentarz został dodany pomyślnie.');
  
    

  } catch (error) {
    console.error('Błąd dodawania komentarza:', error);
  }
};

  

  return (
    <View style={styles.screenBackground}>
    <ScrollView contentContainerStyle={styles.container}>
  <Text style={styles.castleName}>{castle.castleName}</Text>
  <Text style={styles.heading}>Zdjęcia zamku:</Text>
  <FlatList
  data={castle.castleImages}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => {
    if (item.trim() !== '') {
      return <View>
      <Image source={{ uri: item }} style={styles.image} />
      <Text style={styles.imageAuthor}>
        Autor zdjęcia: {castle.imageAuthor}
      </Text>
    </View>;
    }
    return null;
  }}
/>
      <Text style={styles.castleDescription}>{castle.castleDescription}</Text>
      <Text style={styles.location}>Lokalizacja: {castle.castleLocation}</Text>
      {isAuthenticated && (
      <TouchableOpacity onPress={openGoogleMaps}>
        <Text style={styles.openMapsLink}>Otwórz w Mapach Google</Text>
      </TouchableOpacity>
      )}
      <View style={styles.commentsContainer}>
        <Text style={styles.heading}>Komentarze:</Text>
        {comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{userEmails[index]}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
      </View>
      {isAuthenticated && ( // Warunek renderowania tylko dla zalogowanego użytkownika
        <View>
          <TextInput
            style={styles.newCommentInput}
            placeholder="Nowy komentarz"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={() => addComment(navigation)}>
    <Text style={styles.buttonText}>Dodaj komentarz</Text>
  </TouchableOpacity>
</View>
        </View>
      )}
    </ScrollView>
    </View>
  );
};

export default DetailScreen;
