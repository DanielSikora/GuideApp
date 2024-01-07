import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView, TextInput, Alert, FlatList } from 'react-native';
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
        const response = await fetch(`http://192.168.0.112:3000/comments/${castle._id}`);
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
      const response = await fetch(`http://192.168.0.112:3000/users/id/${userId}`);
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

  const addComment = async () => {
    try {
      const userResponse = await fetch(`http://192.168.0.112:3000/users/email/${userEmail}`);

      if (!userResponse.ok) {
        throw new Error('Failed to fetch userId2');
      }

      const userData = await userResponse.json();
      const userId2 = userData._id;

      const response = await fetch(`http://192.168.0.112:3000/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newComment, castle: castle._id, user: userId2 }),
      });

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

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://192.168.0.112:3000/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Tutaj można dodać nagłówek autoryzacji, jeśli jest wymagany
        },
      });

      if (response.ok) {
        setComments(comments.filter(comment => comment._id !== commentId));
        Alert.alert('Sukces', 'Komentarz został usunięty');
      } else {
        Alert.alert('Błąd', 'Nie udało się usunąć komentarza');
      }
    } catch (error) {
      console.error('Błąd usuwania komentarza:', error);
      Alert.alert('Błąd', 'Wystąpił problem podczas usuwania komentarza');
    }
  };

  return (
    <View style={styles.screenBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text testID="castleName" style={styles.castleName}>{castle.castleName}</Text>
        <Text style={styles.heading}>Zdjęcia zamku:</Text>
        <FlatList
          data={castle.castleImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            if (item.trim() !== '') {
              return (
                <View>
                  <Image testID="image" source={{ uri: item }} style={styles.image} />
                  <Text testID="imageAuthor" style={styles.imageAuthor}>Autor zdjęcia: {castle.imageAuthor}</Text>
                </View>
              );
            }
            return null;
          }}
        />
        <Text testID="castleDescription" style={styles.castleDescription}>{castle.castleDescription}</Text>
        <Text testID="localization" style={styles.location}>Lokalizacja: {castle.castleLocation}</Text>
        {isAuthenticated && (
          <TouchableOpacity onPress={openGoogleMaps}>
            <Text testID="google" style={styles.openMapsLink}>Otwórz w Mapach Google</Text>
          </TouchableOpacity>
        )}
        <View testID="comments" style={styles.commentsContainer}>
          <Text style={styles.heading}>Komentarze:</Text>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <Text testID="comAuthor" style={styles.commentAuthor}>{userEmails[index]}</Text>
              <Text testID="comText" style={styles.commentText}>{comment.text}</Text>
              {isAuthenticated && userEmails[index] === userEmail && (
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteComment(comment._id)}>
                  <Text testID="deleteButton" style={styles.deleteButtonText} >Usuń komentarz</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        {isAuthenticated && (
          <View>
            <TextInput
              style={styles.newCommentInput}
              placeholder="Nowy komentarz"
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
              testID="newCom"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity testID="newComButton" style={styles.button} onPress={() => addComment(navigation)}>
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
