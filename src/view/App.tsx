import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ShoppingListScreen } from './screens/ShoppingList';
import { ApolloProvider } from '@apollo/client'; 
import { client } from './apollo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <View style={styles.container}>
      <ApolloProvider client={client}> 
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
});
