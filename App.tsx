import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './components/Screens/HomeScreen';
import { Text, TouchableOpacity, View } from 'react-native';
import LoginScreen from './components/Screens/LoginScreen';
import RegisterScreen from './components/Screens/RegisterScreen';
import DetailScreen from './components/Screens/DetailScreen';
import { AuthContext, AuthProvider } from './components/AuthContext';
import styles from './components/Screens/Styles/AppStyles';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
  name="HomeScreen"
  component={HomeScreen}
  options={({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'darkgray', 
    },
    headerTitle: 'Przewodnik',
    headerRight: () => (
      <AuthContext.Consumer>
        {({ state, setIsAuthenticated }) => (
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            {state.isAuthenticated ? (
              <TouchableOpacity
                onPress={() => {
                  // Po wylogowaniu
                  setIsAuthenticated(false);
                }}
                style={[styles.authButton, { marginRight: 10 }]} // Dodane styles.authButton
              >
                <Text style={styles.authButtonText}>Wyloguj</Text>
              </TouchableOpacity>
            ) : null}
            {!state.isAuthenticated ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={[styles.authButton, { marginRight: 10 }]} // Dodane styles.authButton
              >
                <Text style={styles.authButtonText}>Zaloguj</Text>
              </TouchableOpacity>
            ) : null}
            {!state.isAuthenticated ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}
                style={styles.authButton} // Dodane styles.authButton
              >
                <Text style={styles.authButtonText}>Zarejestruj</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </AuthContext.Consumer>
    ),
  })}
/>
          <Stack.Screen  name="LoginScreen" component={LoginScreen} options={{ headerTitle: 'Logowanie', headerStyle: {backgroundColor: 'darkgray', 
              }, }}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerTitle: 'Rejestracja', headerStyle: {
                backgroundColor: 'darkgray', 
              }, }}/>
          <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerTitle: 'Szczegóły zamku', headerStyle: {
                backgroundColor: 'darkgray', 
              }, }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
