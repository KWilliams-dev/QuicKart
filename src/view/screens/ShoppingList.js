import * as React from 'react';
import { View, StyleSheet, FlatList, Text as NativeText} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Text } from 'react-native-paper';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Banana',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Bread',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Eggs',
    },
  ];

export const ShoppingListScreen = () => {
    return (
    <View style={styles.container}>
        <Text style={styles.text} variant='displayMedium'>Shopping List</Text>
        <Searchbar style={styles.searchbar} placeholder="Search" />
        <View style={styles.flatList}>
            <FlatList data={DATA}
            renderItem={({item}) => {
                return(
            <NativeText style={styles.item}>{item.title}</NativeText>
                );
            }}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Text style={styles.bottomText} variant='titleLarge'>Total Cost:      </Text>
            <Text style={styles.bottomText} variant='titleLarge'>Grocery Count: {DATA.length}</Text>
        </View>
        <Button style={styles.bottomButton} buttonColor='blue' mode='contained'><Text style={styles.bottomText} variant='headlineMedium'>START SHOPPING</Text></Button>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3F0',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    text: {
        marginTop: 50,
    },
    button: {
        height: '100%'
    },
    searchbar: {
        marginTop: 30,
        width: 325
    },
    flatList: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '85%',
        height: '50%',
        borderRadius: 15
    },
    item: {
        paddingLeft: 25,
        paddingTop: 15,
        padding: 10,
        fontSize: 18,
        height: 44
    },
    bottomContainer: {
        height: '7%',
        borderRadius: 15,
        backgroundColor: '#D42B14',
        flexDirection: 'row',
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomText: {
        color: 'white',
        fontWeight: 'bold'
    },
    bottomButton: {
        marginTop: 30
    }
});