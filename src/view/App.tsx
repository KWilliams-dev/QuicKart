import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/client'; 
import { client } from './apollo';
import  Navigation from './navigation/index'
import { Provider } from 'react-redux';
import { Store } from './redux/store'

export default function App() {
  return (
    <ApolloProvider client={client}> 
      <View style={styles.appContainer}>
        <Provider store={Store}>
          <Navigation />
        </Provider>
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
