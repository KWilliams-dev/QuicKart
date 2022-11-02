import * as React from 'react';
import {useState, useEffect}  from 'react';
import { View, StyleSheet, FlatList, Text as NativeText, Alert} from 'react-native';
import { Button, Text } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { gql, useQuery} from '@apollo/client';

const GET_ITEMS =  gql`

query GetInventory($id: Int!) {
    getInventory(id: $id) {
      id
      name
      aisle
      bay
      price
      xVal
      yVal
    }
  }

`



export const ShoppingListScreen = ({navigation}) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [inventory, setInventory] = useState([]);
  
    const {loading, error, data} = useQuery(GET_ITEMS, { variables: { id: 123 }});
    
    useEffect(() => {
        if(error) {
            Alert.alert('Error fetching inventory', error.message)
        }
    }, [error])

    useEffect(() => {
        if(data) {
            setInventory(data.getInventory);
        }
    }, [data])

    // if(loading) {

    // }

    return (
    <View style={styles.container}>
        <NativeText style={styles.titleText}>Shopping List</NativeText>

        <SearchableDropdown
                selectedItems={selectedItems}
                onItemSelect={(item) => {
                    const items = selectedItems;
                    items.push(item)
                    setSelectedItems(() => {
                        return [...items]
                    })
                }}
                containerStyle = { styles.dropdown }
                onRemoveItem = { (item, index) => {
                    const items = selectedItems.filter((sitem) => sitem.id !== item.id );
                    setSelectedItems(() => {
                        return [...items]
                    })
                }}

                itemStyle={{
                    padding: 10,
                    backgroundColor: '#F1F5F2',
                    borderColor: '#bbb',
                    marginTop: 10
                }}

                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={inventory}
                resetValue={false}

                textInputProps={
                    {
                      placeholder: "placeholder",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 12,
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 5,
                      },
                      //onTextChange: text => alert(text)
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                }
                >
        </SearchableDropdown>

        <View style={styles.flatList}>
            <FlatList data={selectedItems}
            renderItem={({item}) => { return(<NativeText style={styles.item}>{item.name}</NativeText>);
            }}
            extraData={selectedItems}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Text style={styles.bottomText} variant='titleLarge'>Total Cost:      </Text>
            <Text style={styles.bottomText} variant='titleLarge'>Grocery Count: {selectedItems.length}</Text>
        </View>
        <Button onPress={() => navigation.navigate('ShoppingRoute')} style={styles.bottomButton} buttonColor='blue' mode='contained'><Text style={styles.bottomText} variant='headlineMedium'>START SHOPPING</Text></Button>
     </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFFF',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop:25,
    },
    titleText: {
        marginTop: 10,
        fontSize: 46
    },
    button: {
        height: '100%'
    },
    flatList: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '85%',
        height: '50%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    item: {
        paddingLeft: 25,
        paddingTop: 15,
        padding: 10,
        fontSize: 20,
        height: 44,
        color: '#5A5A5A'
    },
    bottomContainer: {
        height: '7%',
        borderRadius: 15,
        backgroundColor: '#D42B14',
        flexDirection: 'row',
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    bottomText: {
        color: 'white',
        fontWeight: 'bold'
    },
    bottomButton: {
        marginTop: 30,
        backgroundColor: '#3F7CAC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    dropdown: {
        width: '85%',
        marginTop: 30,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,  
        elevation: 5
    }
});