import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import CardData from '../components/CardCarousel/CardData/index';

export const ShoppingRouteScreen = () => {
    return(
        <View style={ styles.container }>

            {/* delete isActive prop if card will control the opacity */}
            {/* query database to test card data props */}

            <CardData item={ "Item Name" } aisle={ "A" } bay={ "1" } isActive={ true }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 32
    }
})