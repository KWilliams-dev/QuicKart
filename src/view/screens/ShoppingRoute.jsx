import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const ShoppingRouteScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Shopping Route Stuff!</Text>
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