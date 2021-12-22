import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import CharacterList from './src/features/Characters/CharacterList/CharacterList';
import apolloClient from './src/apolloClient';
import CharacterDetails from './src/features/Characters/CharacterDetails';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='CharacterList'>
      <Stack.Screen
        name='CharacterList'
        component={CharacterList}
        options={{ headerTitle: 'Characters' }}
      />
      <Stack.Screen name='Character' component={CharacterDetails} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
