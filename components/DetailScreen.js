import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const DetailScreen = ({ route }) => {
  const { castle } = route.params;
  const [comments, setComments] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();
  const userEmail = route.params?.userEmail || 'Brak danych';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://192.168.0.105:3000/comments/${castle._id}`);
        console.log(userEmails);
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
      const response = await fetch(`http://192.168.0.105:3000/users/id/${userId}`);
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
        // Fetch userId2 based on the userEmail
        console.log('jest email', userEmail);
        const userResponse = await fetch(`http://192.168.0.105:3000/users/email/${userEmail}`);

        if (!userResponse.ok) {
            throw new Error('Failed to fetch userId2');
        }

        const userData = await userResponse.json();
        const userId2 = userData._id;
        console.log('jest id', userId2);

        // Now use userId2 to add the comment
        const response = await fetch(`http://192.168.0.105:3000/comments/`, {
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

    const responseData = await response.json(); // Read the response once

    console.log('Response body:', responseData);

    setComments([...comments, responseData]);
    setNewComment('');  
    
    Alert.alert('Komentarz dodany', 'Twój komentarz został dodany pomyślnie.');
    // Fetch comments again after adding a new one
    

  } catch (error) {
    console.error('Błąd dodawania komentarza:', error);
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
      <TextInput
        style={styles.newCommentInput}
        placeholder="Nowy komentarz"
        value={newComment}
        onChangeText={(text) => setNewComment(text)}
      />
      <Button title="Dodaj komentarz" onPress={() => addComment(navigation)} />
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
