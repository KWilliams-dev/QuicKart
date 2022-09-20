import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ShoppingListScreen } from './screens/ShoppingList';

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListScreen />
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
