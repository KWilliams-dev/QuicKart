import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export const Welcome = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Button title='Build Your Cart' onPress={() => navigation.navigate('ShoppingList')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 32
    }
})