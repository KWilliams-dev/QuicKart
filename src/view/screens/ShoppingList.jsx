import * as React from 'react';
import {useState, useEffect}  from 'react';
import { View, FlatList, Text as NativeText, Alert, ScrollView, SafeAreaView, SectionList} from 'react-native';
import { Button, Text } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { gql, useQuery} from '@apollo/client';
import { SplashScreen } from './SplashScreen';
import { styles } from '../styles/ShoppingList.styles';




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
    const [totalPrice, setPrice] = useState(0.00);
    const {loading, error, data} = useQuery(GET_ITEMS, { variables: { id: 123 }});

    useEffect(() =>{
        let subTotal =0.00
        selectedItems.forEach(item=>{
            subTotal += item.price;
           
        })
        subTotal =subTotal.toFixed(2);
    
    
        setPrice(subTotal)},[selectedItems])
    
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

    const deleteItem = (item) => {
        const items = selectedItems.filter((sitem) => sitem.id !== item.id );
        setSelectedItems(() => {
            return [...items]
        })
    };

    return (
    <View style={styles.container}>
        {loading ? <SplashScreen /> : 
        <>
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
                itemsContainerStyle={{ maxHeight: 200 }}
                items={inventory}
                
                textInputProps={
                    {
                      placeholder: "placeholder",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 12,
                      },
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
        renderItem={({ item }) => {
            return (
                <View style={styles.inline}>
                    <View style={styles.itemName}>
                        <NativeText style={styles.item}>
                            {item.name}
                        </NativeText>
                        </View>
                    <View style={styles.itemPrice}>
                        <NativeText style={styles.currency}>$<Text style={styles.priceText}> {item.price}</Text></NativeText>
                    </View>
                    <View style={styles.trshbttn}>
                        <NativeText style={styles.trashButton}><Button onPress={() => deleteItem(item)} icon="delete"/></NativeText>
                    </View>
                </View>
            );
        } }/>
        
</View>


    
        <View style={styles.bottomContainer}>
            <Text style={styles.bottomText} variant='titleMedium'>Total Cost:${totalPrice}  </Text>
            <Text style={styles.bottomText} variant='titleMedium'>Grocery Count: {selectedItems.length}</Text>
        </View>
            <Button onPress={() => navigation.navigate('ShoppingRoute')} style={styles.bottomButton} buttonColor='blue' mode='contained'><Text style={styles.bottomText} variant='headlineMedium'>START SHOPPING</Text></Button>
            </>}
     </View>
    );
}
