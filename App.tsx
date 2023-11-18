import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './components/HomeScreen';
import { Text, TouchableOpacity, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import DetailScreen from './components/DetailScreen';
import { AuthContext, AuthProvider } from './components/AuthContext';

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
                          style={{ marginRight: 10 }}
                        >
                          <Text>Wyloguj</Text>
                        </TouchableOpacity>
                      ) : null}
                      {!state.isAuthenticated ? (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('LoginScreen')}
                          style={{ marginRight: 10 }}
                        >
                          <Text>Zaloguj</Text>
                        </TouchableOpacity>
                      ) : null}
                      {!state.isAuthenticated ? (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('RegisterScreen')}
                        >
                          <Text>Zarejestruj</Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  )}
                </AuthContext.Consumer>
              ),
            })}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
