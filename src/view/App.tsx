import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/client'; 
import { client } from './apollo';
import  Navigation from './navigation/index'

export default function App() {
  return (
    <ApolloProvider client={client}> 
      <View style={styles.appContainer}>
        <Navigation />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
});
