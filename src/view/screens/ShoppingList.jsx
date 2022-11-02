import * as React from 'react';
import {useState, useEffect}  from 'react';
import { View, FlatList, Text as NativeText, Alert, ScrollView, SafeAreaView, SectionList} from 'react-native';
import { Button, Text } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { gql, useQuery} from '@apollo/client';
import { SplashScreen } from './SplashScreen';
import { styles } from '../styles/ShoppingList.styles';
import {useDispatch, useSelector} from 'react-redux'
import { setGroceryList } from '../redux/groceryListAction'
import { setTotal } from '../redux/totalActions';

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
    
    const  [selectedItems, setSelectedItems] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [totalPrice, setPrice] = useState(0.00);
    const {loading, error, data} = useQuery(GET_ITEMS, { variables: { id: 123 }});

    const dispatch = useDispatch();

    const totalHandler = () => {
        dispatch(setTotal(totalPrice))
    }

    /* 
    *  Helper method to get the first closest item to the entrance. 
    *  We don't pass in originX and originY here because we know the
    *  entrance coordinates already. This method is on it's own to help
    *  with code readability even though it's only called once in calcRoute()
    */

    function getFirstItem(arr) {
        const listWithDistances = []
        
        let firstItem;

        arr.forEach(item => {
            let x2 = item.xVal
            let y2 = item.yVal
            let xDistance = Math.abs(x2 - 27)
            let yDistance = Math.abs(y2 - 29)
            let distance = xDistance + yDistance

            item = {
                ...item,
                 distance: distance
             }
 
             listWithDistances.push(item)
        })

        listWithDistances.sort((a,b) => a.distance - b.distance);

        firstItem = listWithDistances.shift();

        return firstItem
    }

    /* 
    *  Helper method to get the next closest item from the updated point of origin 
    *  Takes in arr which is the updated array list from calcRoute().
    *  The item that was considered the next item for the user to get previously is now
    *  the new point of origin item.xVal = originX | item.yVal = originY
    */

    function getNextItem(arr, originX, originY) {
        const listWithDistances = []
        
        let nextItem;

        arr.forEach(item => {
            let x2 = item.xVal
            let y2 = item.yVal
            let xDistance = Math.abs(x2 - originX)
            let yDistance = Math.abs(y2 - originY)
            let distance = xDistance + yDistance

            item = {
                ...item,
                 distance: distance
             }
 
             listWithDistances.push(item)
        })

        listWithDistances.sort((a,b) => a.distance - b.distance);

        nextItem = listWithDistances.shift();

        return nextItem;
    }

    /* 
    *  Bulk of the routing is done in this method with the help
    *  of the helper methods. We start off by distinquishing the first item,
    *  then move on to running a for loop for the length of the input list - 1
    *  because we already got the first item. We can't get the first item in the 
    *  for loop because it will call it multiple times and the logic for getting the
    *  first item only needs to be called once.
    */

    const calcRoute = () => {
        const routedList = [];

        let nextItem;

        let firstItem = getFirstItem(selectedItems);

        routedList.push(firstItem);

        let deprecatedSelectedItems = selectedItems.filter((sitem) => sitem.id !== firstItem.id );

        let originX = firstItem.xVal;
        let originY = firstItem.yVal;

        for (let i = 0; i < selectedItems.length - 1; i++) {
            
            nextItem = getNextItem(deprecatedSelectedItems, originX, originY)
            routedList.push(nextItem);
            deprecatedSelectedItems = deprecatedSelectedItems.filter((sitem) => sitem.id !== nextItem.id)
            originX = nextItem.xVal;
            originY = nextItem.yVal;

          }

        routedList.forEach(el => {
            console.log("Name: " + el.name);
        })
        
        dispatch(setGroceryList(routedList));
    }

    
    useEffect(() =>{
        let subTotal =0.00
        selectedItems.forEach(item=>{
            subTotal += item.price;
        })
        subTotal =subTotal.toFixed(2);
        setPrice(subTotal)
    },[selectedItems])
    
    useEffect(() => {
        if(error) {Alert.alert('Error fetching inventory', error.message)}
    }, [error])

    useEffect(() => {
        if(data) {setInventory(data.getInventory);}
    }, [data])

    // dispatch is used for calling setter methods specified in actions, that re-write data to the data store

    // When the user is done making their selection, we want to globally store that list using dispatch and use it elsewhere in the application.
    
    const groceryListHandler = () => {
        dispatch(setGroceryList(selectedItems))
    }

    const deleteItem = (item) => {
        const items = selectedItems.filter((sitem) => sitem.id !== item.id );
        setSelectedItems(() => {
            return [...items]
        })
    };

    return (
    <View style={styles.container}>
        {/*if there is a connection to the database then the splashscreen will load breifly,
        if not then it will load for ever. */}
        {loading ? <SplashScreen /> : 
        <>
        <NativeText style={styles.titleText}>Shopping List</NativeText>
        <SearchableDropdown
                selectedItems={selectedItems}
                onItemSelect={(item) => {
                    
                    // creates a new version of the item that contains a collected property.
                    item = {
                        ...item,
                        collected: false
                    }

                    const items = selectedItems;
                    
                    const isFound = items.some(sitem => {
                        if (sitem.id === item.id) {
                            return true; 
                        } else {
                            return false
                        }
                    });

                    if(isFound == true){
                        Alert.alert("Item has already been added");
                    } else {
                        items.push(item);
                    }
                      
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
                                    <NativeText style={styles.item}>{item.name}</NativeText>
                                </View>
                                <View style={styles.itemPrice}>
                                    <NativeText style={styles.currency}><Text style={styles.priceText}>${item.price}</Text></NativeText>
                                </View>
                                <View style={styles.trshbttn}>
                                    <NativeText style={styles.trashButton}><Button onPress={() => deleteItem(item)} icon="delete"/></NativeText>
                                </View>
                            </View>
                        );
                    } }/>

        </View>
        <View style={styles.bottomContainer}>
            <Text style={styles.bottomText} variant='titleLarge'>Total Cost:</Text><NativeText style={styles.price}>${totalPrice}</NativeText>
            <Text style={styles.bottomText} variant='titleLarge'>Grocery Count: {selectedItems.length}</Text>
        </View>
        <Button onPress={() => {
            groceryListHandler();
            totalHandler();
            calcRoute();
            navigation.navigate("ShoppingRoute");
            }}
            style={styles.bottomButton}
            buttonColor='blue'
            mode='contained'>
            
                <Text style={styles.bottomText} variant='headlineMedium'>START SHOPPING</Text>
        </Button>
     </>}
     </View>
    );
}
