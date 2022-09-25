import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ShoppingListScreen } from './screens/ShoppingList';
import { ApolloProvider } from '@apollo/client'; 
import { client } from './apollo';

export default function App() {
  return (

    <ApolloProvider client={client}> 

      <View style={styles.container}>
        <ShoppingListScreen />
      </View>

    </ApolloProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
});
