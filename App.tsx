import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, createContext } from 'react';
import HomeScreen from './components/HomeScreen';
import { Text, TouchableOpacity, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import DetailScreen from './components/DetailScreen';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: 'Przewodnik',
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  {isAuthenticated ? (
                    <TouchableOpacity
                      onPress={() => {
                        // Po wylogowaniu
                        setIsAuthenticated(false);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <Text>Wyloguj</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('LoginScreen')}
                      style={{ marginRight: 10 }}
                    >
                      <Text>Zaloguj</Text>
                    </TouchableOpacity>
                  )}
                  {!isAuthenticated ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('RegisterScreen')}
                    >
                      <Text>Zarejestruj</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ),
            })}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
